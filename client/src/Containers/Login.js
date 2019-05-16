import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { connect } from "react-redux";
import * as actionCreator from "./../Store/Actions/actions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      rememberMe: false,
      loginError: "",
      alert: "",
      content: "",
      token: "",
    };
  }

  componentDidMount() {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const token = rememberMe
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");
    this.setState({
      isLoading: false,
      token,
      rememberMe
    });
    this.props.getToken(this.state.token);
  }

  tokenStorage = () => {
    const { token, rememberMe } = this.state;

    if (rememberMe == true) {
      localStorage.setItem("rememberMe", rememberMe);
      localStorage.setItem("token", token);
      sessionStorage.clear();
    } else {
      localStorage.clear();
      sessionStorage.setItem("rememberMe", rememberMe);
      sessionStorage.setItem("token", token);
    }
  };

  showMessage = content => {
    this.setState({
      alert: "show",
      content: content.loginError,
      loginError: false
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

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ [input.name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });

    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body:
        "username=" + this.state.username + "&password=" + this.state.password
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            loginError: json.message,
            isLoading: false,
            username: "",
            password: "",
            token: json.token,
          });
          {
            this.tokenStorage();
            setTimeout(() => {
              this.props.history.push("/home")
            }, 3000);
          }
        } else {
          this.setState({
            loginError: json.message,
            isLoading: false
          });
        }
      });
  };

  render() {
    const { loginError } = this.state;

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <React.Fragment>
        <Navbar/>

        <div>
          {loginError ? this.showMessage({ loginError }) : null}
          <div id="error_message" className={this.state.alert}>
            {this.state.content}
          </div>

          <div className="signup_container login">
            <span>Login</span>
            <div className="login_wrapper">
              <form className="signup_form login" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  autoFocus
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <label>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="signup_checkbox login"
                    placeholder="Remember me"
                    checked={this.state.rememberMe}
                    onChange={this.handleChange}
                  />
                  Remember me
                </label>
                <input
                  type="submit"
                  className="signup_submitbutton login"
                  value="Log in"
                  disabled={!this.validateForm()}
                />
              </form>

            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getToken: token => dispatch(actionCreator.getToken(token)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
