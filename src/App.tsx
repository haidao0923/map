import React from 'react';
import logo from './logo.svg';
import './App.css';
import config from "./config.json";

import { GoogleMap, useLoadScript, MarkerF, Libraries } from '@react-google-maps/api';

const API_KEY = config["API_KEY"];

const libraries : Libraries = ['places'];
const mapContainerStyle = {
  width: '80vw',
  height: '80vh',
};
const center = {
  lat: 39.5, // default latitude
  lng: -96, // default longitude
};

const defaultIconSize = 15;

class State {
  name: string;
  lat: number;
  lng: number;

  constructor(name: string, lat: number, lng: number) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }
}

const states: State[] = [
  new State("Washington", 47.49330662463946, -120.22133558330367),
  new State("Oregon", 43.93572461347163, -120.79262465538007)
]

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4.5}
        center={center}
      >
        {states.map((state, index) => (
          <MarkerF position={{lat: state.lat, lng: state.lng}} icon={{url:require("./images/cat.png"), scaledSize: new google.maps.Size(defaultIconSize,defaultIconSize)}}/>
        ))}
      </GoogleMap>
    </div>
  );
};

export default App;