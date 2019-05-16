import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "./../Store/Actions/actions";

class SideNavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutError: "",
    };
  }

  componentWillMount() {
    this.tokenState()
 }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  showMessage = content => {
    this.setState({
      alert: "show",
      content: content.logoutError,
      logoutError: false
    });
    setTimeout(
      function() {
        this.setState({
          alert: "",
          content: ""
        });
      }.bind(this),
      3000
    );
  };

tokenState() {
if (!localStorage["token"]) {
  this.setState({token: sessionStorage["token"]})
} else if (!sessionStorage["token"]) {
  this.setState({token: localStorage["token"]})
} else if (!sessionStorage["token"] && !localStorage["token"]){
  this.setState({token: ""})
}
}

closeNavLeft() {
    document.getElementById("mySidenavLeft").style.width = "0";
    document.getElementById("mySidenavLeft").style.border = "none";
  }

logOut = (event) => {
  event.preventDefault();
  this.setState({
    isLoading: true
  });
    fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body:
        "token=" + this.state.token
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            logoutError: json.message,
            isLoading: false,
            token: "",
            favourites: []
          });
          localStorage.clear();
          sessionStorage.clear();
          this.closeNavLeft()
          window.location.reload()
        } else {
          this.setState({
            logoutError: json.message,
            isLoading: false
          });
          this.closeNavLeft()
        }
      });
  }

  renderButton() {
    let token = this.state.token;
    if(token == "") {
      return <Link to="/login">Log in</Link>
    } else if (!token) {
      return <Link to="/login">Log in</Link>
    }
    else { 
      return <Link to="/login" onClick={this.logOut}>Log out</Link>
    }
  }

  render() {
    const { logoutError } = this.state;
  
    if (this.state.isLoading) {
      return <div></div>;
    }
    return (
      <React.Fragment>
      {logoutError ? this.showMessage({ logoutError }) : null}
      <div id="error_message" className={this.state.alert}>
        {this.state.content}
      </div>
      
      <div id="mySidenavLeft" className="sidenav_left">
        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={this.closeNavLeft}
        >
          &times;
        </a>
        {this.renderButton()}
        <Link to="/signup">Sign Up</Link>
      </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getToken: () => dispatch(actionCreator.getToken())
  };
};

export default connect(null, mapDispatchToProps)(SideNavLeft);
