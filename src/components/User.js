import React, {Component} from "react";

export default class User extends Component {
  render() {
    return (
      <div>
        <p>
          User: {this.props.name}
        </p>

        <div>
          <button onClick={this.props.auth.logout}>Logout</button>
        </div>
      </div>
    )
  }
}
