import React, { useContext, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Box, Button, Container, Link, TextField, Typography, makeStyles } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import Page from 'src/components/Page';
import { CurrensContext } from "../../CurrensContext";
import { apiBaseUrl } from "../../config";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const validateSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  name: Yup.string().min(2, "Too Short!").max(255).required('First name is required'),
  lastname: Yup.string().min(2, "Too Short").max(255).required('Last name is required'),
  password: Yup.string().max(255).required('password is required'),

});

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState(undefined);
  const { login, authToken, loadUserProfile } = useContext(CurrensContext);

  useEffect(() => {
    if (authToken) {
     navigate('/app/run');
   }
  });

  const handleSignup = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`${apiBaseUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw res;
      }
      const { token } = await res.json();
      login(token);
      loadUserProfile(false);
    } catch (err) {
      console.log(err);
      if (err.status === 409){
        setError("Email already registered!");
        resetForm();
        setSubmitting(false);
      }
    }
 };

  return (
    <Page className={classes.root} title="Register">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="sm">
          <Formik
            initialValues={{ email: '', name: '', lastname: '', password: '' }}
            validationSchema={validateSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => { handleSignup(values, { setSubmitting, resetForm }); }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <Form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2"> Create new account </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2"> Use your email to create new account </Typography>
                </Box>
                { error !== undefined ? <Alert severity="error" onClose={() => { setError(undefined); }}>{ error }</Alert> : null }
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="First name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastname && errors.lastname)}
                  fullWidth
                  helperText={touched.lastname && errors.lastname}
                  label="Last name"
                  margin="normal"
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  variant="outlined"
                />
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
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?
                  {' '}
                  <Link component={RouterLink} to="/login" variant="h6"> Sign in </Link>
                </Typography>
                 {/* <pre> { JSON.stringify(errors, null, 4) }</pre>
                 <pre> { JSON.stringify(values, null, 4) }</pre> */}
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
