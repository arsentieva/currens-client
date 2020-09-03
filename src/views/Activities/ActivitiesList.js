import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { CurrensContext } from "../../CurrensContext";
import ActivityComponent from "./ActivityComponent";
import TotalData from './TotalData';

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
  }));

const ActivitiesList = () => {
    const { loadActivities, activities, getActivity } = useContext(CurrensContext);
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        loadActivities();
    }, []);

    const handleClick = (id) => {
        getActivity(id);
         navigate('/app/activity', { replace: true });
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2} justify="space-around">
            <Grid item lg={11} sm={11} xl={11} xs={11}><TotalData /></Grid>
            { activities.map((activity) => (
                 <Grid item lg={4} sm={4} xl={4} xs={4} key={activity.id} onClick={() => handleClick(activity.id)}>
                  <ActivityComponent activity={activity} />
                 </Grid>
            ))}
            </Grid>
        </div>
      );
};

export default ActivitiesList;
