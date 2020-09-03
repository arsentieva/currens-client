import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import * as Yup from 'yup'; // schema builder for value parsing and validation
import { Formik, Form, Field } from 'formik'; // form builder package
import { Box, Button, InputLabel, FormGroup, TextField, MenuItem, Typography } from '@material-ui/core';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
  }));

  export default function SetGoalModal({opened}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(opened);
 
    useEffect(() => {
        setOpen(opened);
    }, [opened]);

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            <div style={modalStyle} className={classes.paper}>
                <Box mb={2}>
                    <Typography color="textPrimary" variant="h2">Set Goal</Typography>
                </Box>
            </div>
        </Modal>
      </div>
    );
  }
