import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

const centerS : LatLngExpression = [10.77, 107];

function App() {
  return (
    <MapContainer center={centerS} zoom={10}>
        <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
    </MapContainer>
  );
}

export default App;
