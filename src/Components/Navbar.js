import React from "react";
import SideNavRight from "./SideNav_right";
import SideNavLeft from "./SideNav_left";

class Navbar extends React.Component {
openNav() {
        document.getElementById("mySidenav").style.width = "40%";
}

openNavLeft() {
  document.getElementById("mySidenavLeft").style.width = "40%";
  document.getElementById("mySidenavLeft").style.borderStyle = "solid";
  document.getElementById("mySidenavLeft").style.borderWidth = "1px";
  document.getElementById("mySidenavLeft").style.borderColor = "#344d57";
}

  render() {
    return (
      <div className="navbar">
        <div className="far fa-user-circle" onClick={this.openNavLeft}/>
        <span className="hamburgermenu" onClick={this.openNav}>&#9776;</span>
        <SideNavRight/>
        <SideNavLeft/>
      </div>
    );
  }
}
export default Navbar;