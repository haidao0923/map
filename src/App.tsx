import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import config from "./config.json";

import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, Libraries } from '@react-google-maps/api';

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
  new State("Oregon", 43.93572461347163, -120.79262465538007),
  new State("California", 36.428181637032054, -119.73793711707465),
  new State("Nevada", 39.64614001655161, -116.88149186116227),
  new State("Idaho", 43.61842431551806, -114.31069125748577),
  new State("Utah", 39.10261700079595, -111.58608189392874),
  new State("Arizona", 34, -111.71791783087505),
  new State("Montana", 47.046024889514186, -109.25698034121062),
  new State("Wyoming", 43.075151136132966, -107.45522253627774),
  new State("Colorado", 38.79502836057431, -105.565574106714),
  new State("New Mexico", 34.01254197871182, -106.04897254218379),
  new State("North Dakota", 47.43388738430602, -100.4679178781234),
  new State("South Dakota", 44.439901938409044, -100.2042460042308),
  new State("Nebraska", 41.3172639599389, -99.54506631949927),
  new State("Kansas", 38.486106551340264, -98.18276163772073),
  new State("Oklahoma", 35.39603977709561, -96.95229289288854),
  new State("Texas", 30.871870080299136, -98.66616007319054),
  new State("Minnesota", 46.98610165347082, -94.75502723909653),
  new State("Iowa", 41.941354518188916, -93.52455849426433),
  new State("Missouri", 38.348380871486626, -92.68959756027104),
  new State("Arkansas", 34.6402626258708, -92.46987099869386),
  new State("Louisiana", 30.456065264929062, -92.51381631100928),
  new State("Wisconsin", 44.18835234427443, -89.52553507355964),
  new State("Illinois", 40.11824580371417, -89.39369913661332),
  new State("Michigan", 43.49103280638285, -84.86733196812341),
  new State("Indiana", 40.01735399899324, -86.27358196221736),
  new State("Kentucky", 37.446781579968224, -84.55971473632816),
  new State("Ohio", 40.28606655282944, -82.67006630676441),
  new State("Pennsylvania", 40.88677719440607, -77.88002726438188),
  new State("New Jersey", 39.57843110564712, -74.54018352840875),
  new State("Delaware", 38.279419572312804, -75.59487102397921),
  new State("Maryland", 38.88060346238936, -77.41860148506981),
  new State("West Virginia", 38.50330374469548, -80.84633584567383),
  new State("Virginia", 37.32457048580553, -78.51723429295572),
  new State("Maine", 45.04853597164424, -69.15688276976783),
  new State("Vermont", 44.10952194461634, -72.67250775500271),
  new State("New Hampshire", 43.41127633666678, -71.61782025943225),
  new State("New York", 42.89834554648099, -75.61684368013694),
  new State("Massachusetts", 42.31615576368685, -71.92543744564031),
  new State("Connecticut", 41.48208391724883, -72.76039837963357),
  new State("Rhode Island", 41.45738756601491, -71.34316205746077),
  new State("Tennessee", 35.63748060045357, -86.06484171713775),
  new State("North Carolina", 35.40499478171519, -78.61611127967133),
  new State("Mississippi", 32.84064697153142, -89.62441201468808),
  new State("Alabama", 32.9329041158889, -86.74599405802701),
  new State("Georgia", 32.637343588128005, -83.38417766589615),
  new State("South Carolina", 33.70405592050206, -80.5277323653928),
  new State("Florida", 27.29154567456515, -81.18691205012433),

]

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [hoverState, setHoverState] = useState("");

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
          <MarkerF
              position={{lat: state.lat, lng: state.lng}}
              onMouseOver={() => setHoverState(state.name)}
              onMouseOut={() => setHoverState("")}
              icon={{url:require("./images/cat.png"), scaledSize: new google.maps.Size(defaultIconSize,defaultIconSize)}}>
              {hoverState == state.name && (
                    <InfoWindowF>
                        <h4>{state.name}</h4>
                    </InfoWindowF>
                )}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
};

export default App;