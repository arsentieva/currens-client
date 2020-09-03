/* eslint-disable */

import React, {useRef, useCallback, useContext, useState } from 'react';
import { Grid, Card, CardActionArea, CardContent,  CardHeader, Button, colors, Menu, MenuItem, IconButton } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import RunCompleteModal from "./RunCompleteModal";
import { CurrensContext } from "../../CurrensContext";
import mapStyle from '../../mapStyle';
import { GoogleMap, useLoadScript, Marker, Polyline } from '@react-google-maps/api';
import SettingsIcon from '@material-ui/icons/Settings';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import StopIcon from '@material-ui/icons/Stop';
import { withStyles } from '@material-ui/styles';
import SetGoalModal from "./SetGoalModal";
import Timer from "./Timer";

const useStyles = makeStyles((theme) => ({
  card : {
    marginTop: theme.spacing(0.75),
    padding: theme.spacing(0)
  },
  content : {
    padding: theme.spacing(0.25)
  },
  controls: {
    display: 'flex',
    justifyContent: "center",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  timer: {
   color: theme.palette.primary
  }
}));

const StyledCardHeader = withStyles ({
  root : {
    padding: "0px",
    alignItems: "center",
  },
  action: {
    marginTop: "3px",
    marginLeft: "0px",
    marginRight: "3px",
    marginBottom: "0px",
  },
  content : {
    textAlign: "center"
  },
  subheader: {
    marginLeft: "12px"
  }
})(CardHeader)

let lat = 47.599361;
let lng = -122.332111;
let watchID;

// TODO do i want to show the real location

export const RunMap = () => {
  const [goal, setGoal] = useState(false);
  const [path, setPath] = useState([{lat, lng}]);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [completeRun, setCompleteRun] = useState(false);
  const [activity, setActivity] = useState();
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const mapRef = useRef();

  const panTo = useCallback(({lat, lng, zoom = 16})=> {
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(zoom);
  }, []);


  const onPolylineLoad = polyline => {
    let distanceCalculated = google.maps.geometry.spherical.computeLength(polyline.getPath());
    window.localStorage.setItem("currens-distance", JSON.stringify(distanceCalculated));
  };

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
}
const containerStyle = {
  width: '100vw',
  height: '80vh'
};
const libraries = ['places', 'geometry'];

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  if (loadError) {
    return 'Error loading maps';
  }
  if (!isLoaded) {
    return 'Loading Maps';
  }

function showCoords(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
}

function geo_error(error) {
  switch (error.code) {
    case error.TIMEOUT:
      alert('Geolocation Timeout');
      break;
      case error.POSITION_UNAVAILABLE:
        alert('Geolocation Position unavailable');
        break;
        case error.PERMISSION_DENIED:
          alert('Geolocation Permission denied');
          break;
          default:
            alert('Geolocation returned an unknown error code: ' + error.code);
          }
        }

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCoords, geo_error);
}

let runRoute=[];

getCurrentPosition();

function storeCoords(position) {
      lat = position.coords.latitude,
      lng = position.coords.longitude

    let previousCoord = runRoute[runRoute.length-1];
    if(previousCoord !== undefined && (previousCoord.lat === lat && previousCoord.lng === lng))
    {
      return;
    }

    runRoute.push({lat, lng});
    window.localStorage.setItem("currens-run-route", JSON.stringify(runRoute));
}

  const handleStartRun = () => {
    setStartTime(getCurrentTimeFormatted());
    setStarted(true);
    watchID = navigator.geolocation.watchPosition(storeCoords, geo_error, {
      maximumAge: 1000,
      timeout: 30000,
      enableHighAccuracy: true
    });
    panTo({lat, lng});
  }

  const handleStopRun = () => {
    setStarted(false);
    if(watchID){
      navigator.geolocation.clearWatch(watchID);
    }
    watchID = null;
    let pathRun = JSON.parse(window.localStorage.getItem("currens-run-route"));
    window.localStorage.removeItem("currens-run-route");

    setPath(pathRun);
    setCompleteRun(true);

    setActivity({
      start_time: startTime,
      end_time: getCurrentTimeFormatted(),
      route: {
        path: pathRun }
    });
  }

  const getCurrentTimeFormatted = () => {
    // TODO fix the date to be local time and not ISO
    let currentTime = new Date().toISOString();
    return currentTime.slice(0, 10) + " " + currentTime.slice(11, 19);
  }

  const handleGearSelect = (event) =>
  {
    setAnchorEl(event.currentTarget);
  }

  const handleGearClose = () => {
    setAnchorEl(null);
  }

  const handleSetGoal = () => {
    setGoal(true);
    handleGearClose();
  }

  const image ="http://maps.google.com/mapfiles/kml/pal2/icon13.png";

  let mypaths =[];


  return (
    <div>
     { completeRun ? <RunCompleteModal activity={activity} /> : null }
      <Grid container>
        <Grid item  lg={1} sm={1} xl={1} xs={1} />
        <Grid lg={10} sm={10} xl={10} xs={10}>
          <Card className ={ classes.card }>
            <StyledCardHeader
              title="00 : 25" titleTypographyProps={{color:"secondary" , variant:"h2"}}
              subheader="Hours : Minutes" subheaderTypographyProps = {{color: "primary", variant:"caption"}}
              action = {
                <IconButton aria-label="settings">
                  <SettingsIcon onClick={handleGearSelect} />
                  <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleGearClose}>
                    <MenuItem onClick={handleSetGoal}>Set Goal</MenuItem>
                  </Menu>
                  <SetGoalModal opened={goal} />
                </IconButton>
              }>
            </StyledCardHeader>

            <CardActionArea>
            <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={3} options={options} onLoad={onMapLoad}
              onClick= { (event)=> {
              mypaths.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
              console.log(mypaths); }}>
                <Marker
                  position={{ lat, lng }}
                  icon={{
                    url: image,
                    scaledSize: new window.google.maps.Size(40, 40),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(20, 20),
                  }}
                />
                { path.length>=2 ?
                  <Polyline onLoad={onPolylineLoad} path={path} options={
                    { clickable: false,
                      draggable: false,
                      editable: false,
                      visible: true,
                      strokeColor: colors.orange["A700"],
                      strokeWeight: 12,
                      fillColor: "#393",
                      zIndex: 1
                    } }/>
                  : null
                }

            </GoogleMap>
            <CardContent className = {classes.content}>
            <div className={classes.controls} >
              <Fab variant="extended" className={classes.margin} size="small" color="secondary" aria-label="play/pause" disabled = {!started} onClick={handleStopRun}>
                <StopIcon className={classes.extendedIcon}/>
                Stop
              </Fab>
              <Fab variant="extended" className={classes.margin} size="small" color="primary" aria-label="play/pause" disabled = {started} onClick={handleStartRun}>
                <DirectionsRunIcon className={classes.extendedIcon}/>
                Start
              </Fab>
              { started ? <Button variant="container"> <Timer start={started} /></Button> : null }
            </div>
          </CardContent>
          </CardActionArea>
          </Card>
          <Grid item lg={1} sm={1} xl={1} xs={1} />
        </Grid>
      </Grid>
    </div>
  );
};
