import React, { Component } from 'react';
import Main from './components/Main';
import User from './components/User';
import NotFound from './components/NotFound';
import Callback from './components/Callback';
import './App.css';

class App extends Component {
  render() {

    let mainComponent = "";
    switch(this.props.location) {
      case "":
        mainComponent = <Main {...this.props}/>;
        break;
      case "user":
        mainComponent = this.props.auth.isAuth() ? <User {...this.props}/> : <NotFound {...this.props}/>;
        break;
      case "cb":
        mainComponent = <Callback {...this.props}/>;
        break;
      default:
        mainComponent = <NotFound {...this.props}/>;
    }

    return (
      <div className="App">
        {mainComponent}
      </div>
    );
  }
}

export default App;
