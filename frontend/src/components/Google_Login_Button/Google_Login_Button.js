import React from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { useEffect } from "react";
import './Google_Login_Button.css'
import logo from './google_logo1.png';

const Google_Login_Button = ({ onLoginSuccess }) => {
  const clientId =
    "122818906913-ee61bq5ms9hbr57qlhb6nvgo3v7rfpip.apps.googleusercontent.com";

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: { clientId },
      });
    });
  }, []);

  const responseGoogle =async (response) => {
    console.log(response);
    const { code } = response;
    await axios
      .post("http://localhost:4000/api/create-tokens", { code })
      .then((response) => {
        console.log(response.data);
        onLoginSuccess();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const responseError = (err) => {
    console.log(err);
  };


  return (
    <div className="google-login-button">
      <img className="logo" src={logo} alt="Google Logo" />
      <h1 className="google-login-button__title">Added Event For Me <br/>Using Google Calender</h1>
      
      <div className="google-login-button__container">
        <GoogleLogin
          
          clientId={clientId}
          // buttonText="Sign in & Authorize Calendar"
          onSuccess={responseGoogle}
          onFailure={responseError}
          cookiePolicy={"single_host_origin"}
          //This is important
          responseType="code"
          accessType="offline"
          scope="openid email profile https://www.googleapis.com/auth/calendar"
      
        />
      </div>
    </div>
  );
};

export default Google_Login_Button;

