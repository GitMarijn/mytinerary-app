import React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Cities from "./../Containers/Cities"

class SideNavRight extends React.Component {
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>
          &times;
        </a>
        <Link to={Cities}>Cities</Link>
      </div>
    );
  }
}
export default SideNavRight;