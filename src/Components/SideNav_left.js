import React from "react";
import Login from "../Containers/Login";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import SignUp from "../Containers/SignUp";

class SideNavLeft extends React.Component {
    closeNavLeft() {
        document.getElementById("mySidenavLeft").style.width = "0";
        document.getElementById("mySidenavLeft").style.border = "none";
      }

  render() {
    return (
      <div id="mySidenavLeft" className="sidenav_left">
        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNavLeft}>&times;</a>
        <Link to={Login}>Log in</Link>
        <Link to={SignUp}>Sign Up</Link>
      </div>
    );
  }
}
export default SideNavLeft;