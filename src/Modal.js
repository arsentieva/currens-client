import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import * as Yup from 'yup'; // schema builder for value parsing and validation
import { Formik, Form, Field } from 'formik'; // form builder package
import { Box, Button, InputLabel, FormGroup, TextField, MenuItem, Typography } from '@material-ui/core';
import { CurrensContext } from "./CurrensContext";
import { apiBaseUrl } from "./config";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const validationSchema = Yup.object().shape({
    age: Yup.number('Must be a valid age')
      .min(14)
      .max(99)
      .required('Age is required.'),
    gender: Yup.string()
       .required('Gender is required.'),
    weight: Yup.number("Must be a valid weight")
    .min(40)
    .max(500)
    .required("Weight is required.")
 });

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MyModal({ opened }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(opened);
  const { authToken } = useContext(CurrensContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitInfo = async (values) => {
    //   TODO post the values
    console.log(values);
    try {
        const res = await fetch(`${apiBaseUrl}/users/`, { // the final "/" is important because without it CORS is not happy
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        });
        if (!res.ok) {
          throw res;
        }
        await res.json();
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
    <Box mb={2}>
      <Typography color="textPrimary" variant="h2">Create Your Profile</Typography>
    </Box>
      <Box mb={3}>
         <Typography color="textSecondary" gutterBottom variant="body2">This will give you a place to store your workout</Typography>
         <Typography color="textSecondary" gutterBottom variant="body2">And get accurate workout statistics </Typography>
      </Box>

      <Formik
        initialValues={{ age: "", gender: "", weight: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => { handleSubmitInfo(values); }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <Form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
              <FormGroup>
                <Field name="age" type="number" as={TextField} label="Age"
                  error={Boolean(touched.age && errors.age)}
                  fullWidth
                  helperText={touched.age && errors.age}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                />
              </FormGroup>
            </Box>
            <Box marginBottom={2}>
              <FormGroup>
                <Field name="weight" type="number" as={TextField} label="Weight"
                  error={Boolean(touched.weight && errors.weight)}
                  fullWidth
                  helperText={touched.weight && errors.weight}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.weight}
                />
              </FormGroup>
            </Box>
            <Box marginBottom={3}>
              <FormGroup>
                <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
                <Field name="gender" as={TextField} select
                  error={Boolean(touched.gender && errors.gender)}
                  fullWidth
                  helperText={touched.gender && errors.gender}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gender}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                  <MenuItem value={0}>Other</MenuItem>
                </Field>
              </FormGroup>
            </Box>
            <Box my={2}>
               <Button color="primary" disabled={isSubmitting || errors.age || errors.weight || errors.gender} fullWidth size="large" type="submit" variant="contained">
                    Continue
               </Button>
            </Box>
        </Form>
        )}
      </Formik>
    </div>
  );

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
        disableBackdropClick disableEscapeKeyDown closeAfterTransition
      >
        {body}
      </Modal>
    </div>
  );
}
