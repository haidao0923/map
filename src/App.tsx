import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import config from "./config.json";

import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, Libraries } from '@react-google-maps/api';

import catIcon from "./images/cat.png";
import blackBearIcon from "./images/black_bear.png";

const API_KEY = config["API_KEY"];

const libraries : Libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '90vh',
};
const center = {
  lat: 39.5, // default latitude
  lng: -96, // default longitude
};

const defaultIconSize = 15;
const animalIcons = [blackBearIcon, catIcon];

class Animal {
  name: string;
  population: number;

  constructor(name:string, population: number) {
    this.name = name;
    this.population = population;
  }
}

class State {
  name: string;
  lat: number;
  lng: number;
  animals: Animal[];

  constructor(name: string, lat: number, lng: number, animals: Animal[]) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.animals = animals;
  }

  getIconSize(index: number): google.maps.Size {
    let size = 15;
    switch (index) {
    case 0:
        size = this.animals[0].population / 500;
    }
    return new google.maps.Size(size, size);
  }
}

const states: State[] = [
  new State("Alabama", 32.9329041158889, -86.74599405802701, [new Animal("Black Bear", 200)]),
  new State("Alaska", 65.43439348836274, -151.7037371648322, [new Animal("Black Bear", 100000)]),
  new State("Arizona", 34, -111.71791783087505, [new Animal("Black Bear", 3000)]),
  new State("Arkansas", 34.6402626258708, -92.46987099869386, [new Animal("Black Bear", 3000)]),
  new State("California", 36.428181637032054, -119.73793711707465, [new Animal("Black Bear", 30000)]),
  new State("Colorado", 38.79502836057431, -105.565574106714, [new Animal("Black Bear", 16000)]),
  new State("Connecticut", 41.48208391724883, -72.76039837963357, [new Animal("Black Bear", 900)]),
  new State("Delaware", 38.279419572312804, -75.59487102397921, [new Animal("Black Bear", 0)]),
  new State("Florida", 27.29154567456515, -81.18691205012433, [new Animal("Black Bear", 4000)]),
  new State("Georgia", 32.637343588128005, -83.38417766589615, [new Animal("Black Bear", 5000)]),
  new State("Hawaii", 19.547077528581216, -155.65881826790638, [new Animal("Black Bear", 0)]),
  new State("Idaho", 43.61842431551806, -114.31069125748577, [new Animal("Black Bear", 25000)]),
  new State("Illinois", 40.11824580371417, -89.39369913661332, [new Animal("Black Bear", 0)]),
  new State("Indiana", 40.01735399899324, -86.27358196221736, [new Animal("Black Bear", 0)]),
  new State("Iowa", 41.941354518188916, -93.52455849426433, [new Animal("Black Bear", 0)]),
  new State("Kansas", 38.486106551340264, -98.18276163772073, [new Animal("Black Bear", 0)]),
  new State("Kentucky", 37.446781579968224, -84.55971473632816, [new Animal("Black Bear", 1000)]),
  new State("Louisiana", 30.456065264929062, -92.51381631100928, [new Animal("Black Bear", 850)]),
  new State("Maine", 45.04853597164424, -69.15688276976783, [new Animal("Black Bear", 35000)]),
  new State("Maryland", 38.88060346238936, -77.41860148506981, [new Animal("Black Bear", 2000)]),
  new State("Massachusetts", 42.31615576368685, -71.92543744564031, [new Animal("Black Bear", 4500)]),
  new State("Michigan", 43.49103280638285, -84.86733196812341, [new Animal("Black Bear", 17000)]),
  new State("Minnesota", 46.98610165347082, -94.75502723909653, [new Animal("Black Bear", 13500)]),
  new State("Mississippi", 32.84064697153142, -89.62441201468808, [new Animal("Black Bear", 0)]),
  new State("Missouri", 38.348380871486626, -92.68959756027104, [new Animal("Black Bear", 1000)]),
  new State("Montana", 47.046024889514186, -109.25698034121062, [new Animal("Black Bear", 15000)]),
  new State("Nebraska", 41.3172639599389, -99.54506631949927, [new Animal("Black Bear", 0)]),
  new State("Nevada", 39.64614001655161, -116.88149186116227, [new Animal("Black Bear", 500)]),
  new State("New Hampshire", 43.41127633666678, -71.61782025943225, [new Animal("Black Bear", 4900)]),
  new State("New Jersey", 39.57843110564712, -74.54018352840875, [new Animal("Black Bear", 3000)]),
  new State("New Mexico", 34.01254197871182, -106.04897254218379, [new Animal("Black Bear", 5500)]),
  new State("New York", 42.89834554648099, -75.61684368013694, [new Animal("Black Bear", 7000)]),
  new State("North Carolina", 35.40499478171519, -78.61611127967133, [new Animal("Black Bear", 20000)]),
  new State("North Dakota", 47.43388738430602, -100.4679178781234, [new Animal("Black Bear", 0)]),
  new State("Ohio", 40.28606655282944, -82.67006630676441, [new Animal("Black Bear", 75)]),
  new State("Oklahoma", 35.39603977709561, -96.95229289288854, [new Animal("Black Bear", 2500)]),
  new State("Oregon", 43.93572461347163, -120.79262465538007, [new Animal("Black Bear", 27500)]),
  new State("Pennsylvania", 40.88677719440607, -77.88002726438188, [new Animal("Black Bear", 16000)]),
  new State("Rhode Island", 41.45738756601491, -71.34316205746077, [new Animal("Black Bear", 0)]),
  new State("South Carolina", 33.70405592050206, -80.5277323653928, [new Animal("Black Bear", 1100)]),
  new State("South Dakota", 44.439901938409044, -100.2042460042308, [new Animal("Black Bear", 0)]),
  new State("Tennessee", 35.63748060045357, -86.06484171713775, [new Animal("Black Bear", 5750)]),
  new State("Texas", 30.871870080299136, -98.66616007319054, [new Animal("Black Bear", 0)]),
  new State("Utah", 39.10261700079595, -111.58608189392874, [new Animal("Black Bear", 4000)]),
  new State("Vermont", 44.10952194461634, -72.67250775500271, [new Animal("Black Bear", 5250)]),
  new State("Virginia", 37.32457048580553, -78.51723429295572, [new Animal("Black Bear", 19000)]),
  new State("Washington", 47.49330662463946, -120.22133558330367, [new Animal("Black Bear", 27500)]),
  new State("West Virginia", 38.50330374469548, -80.84633584567383, [new Animal("Black Bear", 13000)]),
  new State("Wisconsin", 44.18835234427443, -89.52553507355964, [new Animal("Black Bear", 24000)]),
  new State("Wyoming", 43.075151136132966, -107.45522253627774, [new Animal("Black Bear", 0)]),
]

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [hoverState, setHoverState] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(0);

  const handleDropdownChange = (e: any) => {
    setSelectedAnimal(Number(e.target.value));
  }

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className='App'>
      <img className='title-background' src={require("./images/title.png")}></img>
      <div className='title-container'>
        <p className='title'>AniMap</p>
        <div className='dropdown-container'>
            <p className='description'>Choose an animal</p>
            <select id="dropdown" value={selectedAnimal} onChange={handleDropdownChange}>
                <option value={0}>Black Bear</option>
                <option value={1}>Cat</option>
                <option value={2}>Option 3</option>
            </select>
        </div>
        <p className='description'>By: Hai Dao</p>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={center}
      >
        {states.map((state, index) => (
          <MarkerF
              position={{lat: state.lat, lng: state.lng}}
              onMouseOver={() => setHoverState(state.name)}
              onMouseOut={() => setHoverState("")}
              icon={{
                url:animalIcons[selectedAnimal],
                scaledSize: state.getIconSize(selectedAnimal)}}>
              {hoverState == state.name && (
                    <InfoWindowF>
                        <h4>{`${state.name}\n${state.animals[selectedAnimal].name}: ${state.animals[selectedAnimal].population}`}</h4>
                    </InfoWindowF>
                )}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
};

export default App;