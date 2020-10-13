import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { CurrensContext } from "../../CurrensContext";
import { apiBaseUrl } from "../../config";
import FacebookIcon from 'src/icons/Facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Facebook = () => {
  const [facebookState, setFacebookState] = useState({
    isLoggedIn: false,
    userID: "",
    name: "",
    email:"",
    picture: "",
  })

  const { login, loadUserProfile } = useContext(CurrensContext);

  const navigate = useNavigate();

  const responseFacebook = response => {
    console.log('resp', response);
    setFacebookState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  const componentClicked = () => {
    if(facebookState.isLoggedIn) {
      console.log(facebookState);
      handleLogin();
    }
  };

  const handleLogin = async () => {
    let email = `${facebookState.name}@facebook.com`
    console.log(email);
    try{
      const res = await fetch(`${apiBaseUrl}/user/${email}`);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      console.log(data)
      // login(token);
      // loadUserProfile(age, gender, weight);
      // navigate('/app/run', { replace: true });
    } catch (error) {
      if (error.status === 401) {
        console.log("Incorrect email or password.");
      }
    }
    // try{
    //   const res = await fetch(`${apiBaseUrl}/auth/login`, {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   if (!res.ok) {
    //     throw res;
    //   }
    //   const { token, gender, weight, age } = await res.json();
    //   login(token);
    //   loadUserProfile(age, gender, weight);
    //   navigate('/app/run', { replace: true });
    // } catch (error) {
    //   if (error.status === 401) {
    //     console.log("Incorrect email or password.");
    //   }
    // }
 }

return (
        <FacebookLogin appId={process.env.REACT_APP_FACEBOOK_APP_ID}
         autoLoad={true} fields="name,email,picture"
        callback={responseFacebook}
        render = {renderProps => (<Button color="primary" fullWidth startIcon={<FacebookIcon />} onClick={componentClicked} size="large" variant="contained">
        Login with Facebook
      </Button> )} />
      );

 };


 export default Facebook;
