import React, {Component} from "react";

export default class Main extends Component {
  render() {
    return (
      <div>
        <div>
          <a href="/user">User Dashboard</a>
        </div>
        <p>
          Main Test
        </p>

        { !this.props.auth.isAuth() &&
          <div>
            <button onClick={this.props.auth.login}>{this.props.name} Login</button>
          </div>
        }
      </div>
    )
  }
}
