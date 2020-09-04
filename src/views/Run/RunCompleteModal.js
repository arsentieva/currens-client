import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import StepperWithIcons from "./StepperWithIcons";

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
      width: 700,
      height: 400,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
  }));


  export default function RunCompleteModal ( {activity} ) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(true);


    const handleClose = () => {
        setOpen(false);
      };

      const body = (
        <div style={modalStyle} className={classes.paper}>
          <StepperWithIcons activity={activity}/>
        </div>
      );

      return (
        <Modal open={open} onClose={handleClose} >
          {body}
        </Modal>
      );

  };
