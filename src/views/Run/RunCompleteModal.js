import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Paper, Typography, Divider } from '@material-ui/core';
import { CurrensContext } from "../../CurrensContext";
import { apiBaseUrl } from "../../config";
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
      width: 400,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),

    },
  }));


  export default function RunCompleteModal ( {activity} ) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(true);
    const { authToken } = useContext( CurrensContext);
    const [distance] = useState(JSON.parse(window.localStorage.getItem("currens-distance")));


    const handleClose = () => {
        setOpen(false);
      };

      const handleSubmitRun = async () => {
        //   TODO post the values
        window.localStorage.removeItem("currens-distance");
        console.log(distance);
        activity.title = "Feel Free Run";
        activity.type = "Run";
        activity.distance = distance;


        console.log(activity);
        try {
            const res = await fetch(`${apiBaseUrl}/activities/`, { // the final "/" is important because without it CORS is not happy
              method: "POST",
              body: JSON.stringify(activity),
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

            <StepperWithIcons />
         
        </div>
      );

      return (
            <Modal open={open} onClose={handleClose} >
                {body}
            </Modal>
      );

  };
