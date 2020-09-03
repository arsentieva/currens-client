import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      maxWidth: 520,
      marginLeft: theme.spacing(2.5)
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
      color: "secondary"
    },
  }));

const ActivityComponent = ({ activity }) => {

    const classes = useStyles();
    const date = activity.date.replace(/["]/g, "");

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                     <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src="/static/images/running.png" />
                     </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1" color="secondary">{activity.title}</Typography>
                          <Typography variant="body2" color="textSecondary">{activity.calories} Calories</Typography>
                          <Typography variant="body2" color="textSecondary">{activity.pace} Pace</Typography>
                          <Typography variant="body2" color="textSecondary">{activity.distance / 1000} km</Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                         <Typography variant="caption" color="primary">
                           <Moment format="D MMM YY" withTitle>{date}</Moment>
                         </Typography>
                      </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
      );
};

export default ActivityComponent;
