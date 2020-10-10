import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
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
        navigate('/app/run');
    }
  }; 

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