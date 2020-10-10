/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Facebook from "./FacebookLogin";
import * as Yup from 'yup'; // schema builder for value parsing and validation
import { Formik, Form } from 'formik'; // form builder package
import { Box, Button, Container, Grid, Link, TextField, Typography, makeStyles } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { CurrensContext } from "../../CurrensContext";
import { apiBaseUrl } from "../../config";
import './styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const validationSchema = Yup.object().shape({
   email: Yup.string()
     .email('Must be a valid email')
     .max(255)
     .required('Email is required'),
   password: Yup.string()
     .min(3, "Must be at least 3 characters")
     .max(255)
     .required('Password is required')
});

const LoginView = () => {
  const { authToken, login, loadUserProfile} = useContext(CurrensContext);
  const [error, setError] = useState(undefined);
 
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
     navigate('/app/run');
   }
  })

 
 const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try{
      const res = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw res;
      }
      const { token, gender, weight, age } = await res.json();
      login(token);
      loadUserProfile(age, gender, weight);
      navigate('/app/run', { replace: true });
    } catch (error) {
      if (error.status === 401) {
        setError("Incorrect email or password.");
        resetForm();
        setSubmitting(false);
      }
    }
 }

  return (
    <Page className={classes.root} title="Login">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="sm">
          <Formik
            initialValues={{ email: 'demo@user.com', password: 'password' }}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
               handleLogin(values, {setSubmitting, resetForm});
             }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <Form onSubmit={handleSubmit}>
                <Box mb={3}>
                <Typography color="textPrimary" variant="h2"> Sign in </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2"> Sign in on the internal platform </Typography>
                </Box>
                <Box mt={3} mb={1}>
                   { error !== undefined ? <Alert severity="error" onClose={() => { setError(undefined); }}>{ error }</Alert> : null }
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Facebook />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button fullWidth startIcon={<GoogleIcon />} onClick={handleSubmit} size="large" variant="contained">
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={3} mb={1}>
                  <Typography align="center" color="textSecondary" variant="body1"> or login with email address</Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?
                  {' '}
                  <Link component={RouterLink} to="/register" variant="h6">Sign up</Link>
                </Typography>
                 {/* <pre> { JSON.stringify(errors, null, 4) }</pre>
                 <pre> { JSON.stringify(values, null, 4) }</pre> */}
              </Form>
            )}
          </Formik>
        </Container>
        <div className="runner"></div>
     
      </Box>
    </Page>
  );
};

export default LoginView;
