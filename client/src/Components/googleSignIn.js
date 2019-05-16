import React from "react";

const GOOGLE_BUTTON_ID = 'google-sign-in-button';

class GoogleSignIn extends React.Component {
  componentDidMount() {
    // window.gapi.signin2.render(
    //   GOOGLE_BUTTON_ID,
    //   {
    //     width: 300,
    //     height: 44,
    //     // onsuccess: googlePopUp()
    //   },
    // );
  }
  onSuccess(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log("Name: " + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
  }
  render() {
    return (
      // <div id={GOOGLE_BUTTON_ID} onClick={() => googlePopUp()}/>
      <button onClick={() => googlePopUp()}>Google</button>
    );
  }
}

const googlePopUp = () => {
let code = window.location.search;
window.location.replace("http://localhost:8080/api/auth/google");
if (code != "") {
  return() => {
            fetch("/api/auth/google/" + code)
            .then(response => response.json())
            .then(result => {
               console.log(result)
            })
            .catch(e => console.log(e));
        }
}
}

export default GoogleSignIn;