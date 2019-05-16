import React from "react";
import { Link, BrowserRouter as Router } from 'react-router-dom'

class Footer extends React.Component{
    render() {
    return (
      <div className="footer">
      <div className="footer_buttons_container">
      <div className="fas fa-chevron-left backbutton" onClick={() => {window.history.back()}}></div>
        <Link to="/home"><div className="fa fa-home homebutton"></div></Link>
        </div>
      </div>
    );
  }
  }
export default Footer;