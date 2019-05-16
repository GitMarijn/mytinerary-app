import React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

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
        <Link to="/home" className="sidenav_link" onClick={this.closeNav}>Home</Link>
        <Link to="/cities" className="sidenav_link" onClick={this.closeNav}>Cities</Link>
        <Link to="/favourites" className="sidenav_link" onClick={this.closeNav}>Favourites</Link>
      </div>
    );
  }
}
export default SideNavRight;