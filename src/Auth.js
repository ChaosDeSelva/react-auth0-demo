import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";

const LOGIN_SCCUESS_PAGE = '/user';
const LOGIN_FAILURE_PAGE = '/';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "abc",
    clientID:"def",
    redirectUri: "http://localhost:3000/cb",
    audience: "ghi",
    responseType: "token id_token",
    scope: "openid profile"
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuth() {
    this.auth0.parseHash((err, outcome) => {
      if (outcome && outcome.accessToken && outcome.idToken) {
        let expiresAt = JSON.stringify((outcome.expiresIn) * 1000 + new Date().getTime());
        localStorage.setItem('access_token', outcome.accessToken);
        localStorage.setItem('id_token', outcome.idToken);
        localStorage.setItem('expires_at', expiresAt);
        window.location.hash = "";
        window.location.pathname = LOGIN_SCCUESS_PAGE;
      } else if (err) {
        window.location.pathname = LOGIN_FAILURE_PAGE;
      }
    })
  }

  isAuth() {
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    window.location.pathname = LOGIN_FAILURE_PAGE;
  }

  getProfile() {
    if (localStorage.getItem('id_token')) {
      return jwtDecode(localStorage.getItem('id_token'));
    }
    return {};
  }
}
