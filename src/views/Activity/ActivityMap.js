/* eslint-disable */
import React, { useRef, useCallback, useContext, useState} from 'react';
import { GoogleMap, useLoadScript, Marker, Polyline } from '@react-google-maps/api';
import { Grid, colors } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import MyModal from "../../Modal";
import { CurrensContext } from "../../CurrensContext";

import mapStyle from '../../mapStyle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    top: theme.spacing(10),
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 550
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  cover: {
    width: 160,
    height: 160,
    padding: 0,
    paddingRight: 2
  }
}));

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
}

const libraries = ['places', 'geometry'];

let lat = 47.599361;
let lng = -122.332111;

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

getCurrentPosition();

let elevatorData = undefined;

export const ActivityMap = () => {

  const { activity } = useContext( CurrensContext);
  const mapRef = useRef();
  const [status, setStatus]=useState()

  let firstRun = [{lat, lng}];
  let path = [ ...firstRun ];

  if (activity !== null) {
    firstRun = activity.route;
    path = [ ... firstRun];
  }

   const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    mapRef.current.panTo({lat: firstRun[0].lat, lng: firstRun[0].lng });
  }, []);

  const onPolylineLoad = polyline => {
    animateRun(polyline);
    let distance = google.maps.geometry.spherical.computeLength(polyline.getPath());
     const elevator = new google.maps.ElevationService();
    elevator.getElevationAlongPath({
      path: path,
      samples: 256, }, printElevData),

      // TODO expose the distance to the user
    console.log(distance);
  };

  function printElevData(elevation, status) {
    if (status !== "OK") {
      // Show the error code inside the chartDiv.

      console.log(  "Cannot show elevation: request failed because ", status)
      return;
    }

    elevatorData= [...elevation];
    console.log(elevatorData); //TODO display this info using a google line chart
  }

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

  const sleep = (milliseconds) => {
    return new Promise(resolve=> setTimeout(resolve, milliseconds))
  }

  // function to change the offset of the symbol at fixed intervals.
    const animateRun = async (polyline)=> {
      const icons = polyline.get("icons");
      for( let i=0; i<1000; i++){
        icons[0].offset = i /10 + "%";
        polyline.set("icons", icons);
        await sleep(20)
      }
    }


  const mypaths = []
  return (
    <div>
      <MyModal opened={status} />
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item lg={8} sm={8} xl={8} xs={12}
          alignContent="flex-end"
          justify="center"
          direction="column"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: firstRun[0].lat, lng: firstRun[0].lng }}
            zoom={15}
            options={options}
            onLoad={onMapLoad}
            onClick={ (event)=> {
                mypaths.push({lat: event.latLng.lat(), lng: event.latLng.lng()});
                console.log(mypaths); }} >
             <Polyline onLoad={onPolylineLoad} path={path} options={
              { clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                strokeColor: colors.orange["A700"],
                strokeWeight: 12,
                fillColor: "#393",
                icons: [
                  {
                    icon: {
                      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                      scale: 5,
                      strokeColor: colors.teal[500]},
                    offset: "100%"
                  }
                ],
                zIndex: 1
              } }/>
          </GoogleMap>
        </Grid>
      </Grid>
    </div>
  );
};
