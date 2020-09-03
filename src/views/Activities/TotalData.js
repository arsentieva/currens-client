import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Divider, Typography, Grid } from '@material-ui/core';
import CountUp from "react-countup";
import { CurrensContext } from "../../CurrensContext";

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(2)
    },
    totalkm: {
      fontSize: 102,
      fontStyle: 'italic',
      fontFamily: 'Raleway, Arial',
    },
    divier: {
        marginTop: theme.spacing(-7),
        marginBottom: theme.spacing(0.5),
    },
  }));

const TotalData = () => {

    const classes = useStyles();
    const { activities } = useContext(CurrensContext);
    const [totalkm, setTotalKm] = useState(0);
    const [avgDistance, setAvgDistance] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [runCount, setRunCount] = useState(0);

    const getRunTime = () => {
        const totalRunInSeconds = activities.map((run) => {
            const seconds = run.duration.replace(/["]/g, ""); //use Regex to remove extra "" characters that are returend by the backend
            return parseFloat(seconds);
          });

           let totalSeconds = 0;
           if (totalRunInSeconds.length>0){
             const reducer = (accumulator, currentValue) => accumulator + currentValue;
             totalSeconds = totalRunInSeconds.reduce(reducer);
           }
          const date = new Date(null);
          date.setSeconds(totalSeconds);
          return date.toISOString().substr(11, 8);
    };

    useEffect(() => {
        if (activities.length > 0){
        const nrRuns = activities.length;
        let kilometers = 0;
        for (let i = 0; i < nrRuns; i++) {
            kilometers += activities[i].distance;
        }
        const kms = kilometers / 1000;

        setRunCount(nrRuns);
        setTotalKm(kms);
        setAvgDistance(kms / nrRuns);
        setTotalTime(getRunTime());
    }

    }, [activities]);

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container justify="space-around" direction="column">
                    <Grid item xs={12} sm container>
                        <Grid item xs={5} />
                        <Grid item xs={2}>
                          <Typography className={classes.totalkm} color="secondary" align="center" gutterBottom><CountUp end={totalkm} decimals={2} duration={5} /></Typography>
                          <Typography className={classes.divier} color="textSecondary" gutterBottom align="center" variant="body1">Total Kilometers</Typography>
                        </Grid>
                        <Grid item xs={5} />
                    </Grid>
                    <Divider light style={{ margin: "15px" }} />
                    <Grid item xs={12} sm container>
                        <Grid item container xs spacing={2}>
                            <Grid item xs={4}>
                                    <Typography color="secondary" gutterBottom align="center" variant="h4"><CountUp end={runCount} duration={5} /></Typography>
                                    <Typography color="textSecondary" gutterBottom align="center" variant="caption"><div>Total Runs</div></Typography>
                            </Grid>
                            <Grid item xs={4}>
                                    <Typography color="secondary" gutterBottom align="center" variant="h4"><CountUp end={avgDistance} suffix="KM" decimals={2} duration={5} /></Typography>
                                    <Typography color="textSecondary" gutterBottom align="center" variant="caption"><div>Avg. Distance</div></Typography>
                            </Grid>
                            <Grid item xs={4}>
                                    <Typography color="secondary" gutterBottom align="center" variant="h4">{totalTime}</Typography>
                                    <Typography color="textSecondary" gutterBottom align="center" variant="caption"><div>Total Time</div></Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

};

export default TotalData;
