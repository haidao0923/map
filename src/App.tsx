import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import config from "./config.json";

import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, Libraries } from '@react-google-maps/api';

import catIcon from "./images/cat.png";
import blackBearIcon from "./images/black_bear.png";
import baldEagleIcon from "./images/bald_eagle.png";
import batIcon from "./images/bat.png";
import coyoteIcon from "./images/coyote.png"
import whiteTailedDeerIcon from "./images/white_tailed_deer.png";
import mosquitoesIcon from "./images/mosquitoes.png";


import ReactSlider from 'react-slider';

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
const animalIcons = [blackBearIcon, baldEagleIcon, batIcon, coyoteIcon, whiteTailedDeerIcon, mosquitoesIcon];

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
        break;
    case 1:
        size = this.animals[1].population / 25;
        break;
    case 2:
        size = this.animals[2].population * 2;
        break;
    case 3:
        size = this.animals[3].population / 2000;
        break;
    case 4:
        size = this.animals[4].population / 20000;
        break;
    case 5:
        size = this.animals[5].population / 1.5;
    }
    if (size > 0 && size < 15) {
        size = 15;
    }
    return new google.maps.Size(size, size);
  }
}

const states: State[] = [
  new State("Alabama", 32.9, -86.7, [new Animal("Black Bear", 200), new Animal("Bald Eagle", 200), new Animal("Bat Species", 16),
      new Animal("Coyote", 52400), new Animal("White-tailed Deer", 1750000), new Animal("Mosquitoes Species", 60)]),
  new State("Alaska", 65.4, -151.7, [new Animal("Black Bear", 100000), new Animal("Bald Eagle", 30000), new Animal("Bat Species", 7),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 0), new Animal("Mosquitoes Species", 30)]),
  new State("Arizona", 34, -111.7, [new Animal("Black Bear", 3000), new Animal("Bald Eagle", 74), new Animal("Bat Species", 28),
      new Animal("Coyote", 200000), new Animal("White-tailed Deer", 55000), new Animal("Mosquitoes Species", 40)]),
  new State("Arkansas", 34.6, -92.4, [new Animal("Black Bear", 3000), new Animal("Bald Eagle", 1700), new Animal("Bat Species", 16),
      new Animal("Coyote", 106360), new Animal("White-tailed Deer", 900000), new Animal("Mosquitoes Species", 55)]),
  new State("California", 36.4, -119.7, [new Animal("Black Bear", 30000), new Animal("Bald Eagle", 1400), new Animal("Bat Species", 25),
      new Animal("Coyote", 250000), new Animal("White-tailed Deer", 0), new Animal("Mosquitoes Species", 50)]),
  new State("Colorado", 38.7, -105.5, [new Animal("Black Bear", 16000), new Animal("Bald Eagle", 1000), new Animal("Bat Species", 18),
      new Animal("Coyote", 78252), new Animal("White-tailed Deer", 427500), new Animal("Mosquitoes Species", 45)]),
  new State("Connecticut", 41.4, -72.7, [new Animal("Black Bear", 900), new Animal("Bald Eagle", 100), new Animal("Bat Species", 9),
      new Animal("Coyote", 3000), new Animal("White-tailed Deer", 101000), new Animal("Mosquitoes Species", 54)]),
  new State("Delaware", 38.2, -75.5, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 71), new Animal("Bat Species", 9),
      new Animal("Coyote", 50), new Animal("White-tailed Deer", 45000), new Animal("Mosquitoes Species", 57)]),
  new State("Florida", 27.2, -81.1, [new Animal("Black Bear", 4000), new Animal("Bald Eagle", 1500), new Animal("Bat Species", 13),
      new Animal("Coyote", 13000), new Animal("White-tailed Deer", 625800), new Animal("Mosquitoes Species", 80)]),
  new State("Georgia", 32.6, -83.3, [new Animal("Black Bear", 5000), new Animal("Bald Eagle", 200), new Animal("Bat Species", 16),
      new Animal("Coyote", 90000), new Animal("White-tailed Deer", 1270000), new Animal("Mosquitoes Species", 63)]),
  new State("Hawaii", 19.5, -155.6, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 0), new Animal("Bat Species", 1),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 0), new Animal("Mosquitoes Species", 8)]),
  new State("Idaho", 43.6, -114.3, [new Animal("Black Bear", 25000), new Animal("Bald Eagle", 650), new Animal("Bat Species", 14),
      new Animal("Coyote", 52000), new Animal("White-tailed Deer", 520000), new Animal("Mosquitoes Species", 50)]),
  new State("Illinois", 40.1, -89.4, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 3100), new Animal("Bat Species", 13),
      new Animal("Coyote", 30000), new Animal("White-tailed Deer", 660000), new Animal("Mosquitoes Species", 52)]),
  new State("Indiana", 40.0, -86.27, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 300), new Animal("Bat Species", 13),
      new Animal("Coyote", 12000), new Animal("White-tailed Deer", 680000), new Animal("Mosquitoes Species", 55)]),
  new State("Iowa", 41.9, -93.5, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 4000), new Animal("Bat Species", 9),
      new Animal("Coyote", 150000), new Animal("White-tailed Deer", 445000), new Animal("Mosquitoes Species", 57)]),
  new State("Kansas", 38.5, -98.2, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 1000), new Animal("Bat Species", 15),
      new Animal("Coyote", 150000), new Animal("White-tailed Deer", 646000), new Animal("Mosquitoes Species", 2)]),
  new State("Kentucky", 37.4, -84.55, [new Animal("Black Bear", 1000), new Animal("Bald Eagle", 187), new Animal("Bat Species", 16),
      new Animal("Coyote", 20200), new Animal("White-tailed Deer", 950000), new Animal("Mosquitoes Species", 60)]),
  new State("Louisiana", 30.45, -92.5, [new Animal("Black Bear", 850), new Animal("Bald Eagle", 358), new Animal("Bat Species", 12),
      new Animal("Coyote", 52370), new Animal("White-tailed Deer", 500000), new Animal("Mosquitoes Species", 68)]),
  new State("Maine", 45.0, -69.1, [new Animal("Black Bear", 35000), new Animal("Bald Eagle", 733), new Animal("Bat Species", 8),
      new Animal("Coyote", 15000), new Animal("White-tailed Deer", 290000), new Animal("Mosquitoes Species", 45)]),
  new State("Maryland", 38.8, -77.4, [new Animal("Black Bear", 2000), new Animal("Bald Eagle", 400), new Animal("Bat Species", 10),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 207000), new Animal("Mosquitoes Species", 50)]),
  new State("Massachusetts", 42.3, -71.9, [new Animal("Black Bear", 4500), new Animal("Bald Eagle", 76), new Animal("Bat Species", 9),
      new Animal("Coyote", 12000), new Animal("White-tailed Deer", 95000), new Animal("Mosquitoes Species", 51)]),
  new State("Michigan", 43.5, -84.9, [new Animal("Black Bear", 17000), new Animal("Bald Eagle", 800), new Animal("Bat Species", 9),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 1850000), new Animal("Mosquitoes Species", 55)]),
  new State("Minnesota", 47, -94.8, [new Animal("Black Bear", 13500), new Animal("Bald Eagle", 9800), new Animal("Bat Species", 8),
      new Animal("Coyote", 14490), new Animal("White-tailed Deer", 950000), new Animal("Mosquitoes Species", 50)]),
  new State("Mississippi", 32.8, -89.6, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 100), new Animal("Bat Species", 15),
      new Animal("Coyote", 32612), new Animal("White-tailed Deer", 1750000), new Animal("Mosquitoes Species", 50)]),
  new State("Missouri", 38.3, -92.7, [new Animal("Black Bear", 1000), new Animal("Bald Eagle", 502), new Animal("Bat Species", 14),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 1400000), new Animal("Mosquitoes Species", 50)]),
  new State("Montana", 47.0, -109.2, [new Animal("Black Bear", 15000), new Animal("Bald Eagle", 700), new Animal("Bat Species", 15),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 212814), new Animal("Mosquitoes Species", 50)]),
  new State("Nebraska", 41.3, -99.5, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 990), new Animal("Bat Species", 13),
      new Animal("Coyote", 77345), new Animal("White-tailed Deer", 300000), new Animal("Mosquitoes Species", 50)]),
  new State("Nevada", 39.6, -116.9, [new Animal("Black Bear", 500), new Animal("Bald Eagle", 125), new Animal("Bat Species", 23),
      new Animal("Coyote", 55000), new Animal("White-tailed Deer", 0), new Animal("Mosquitoes Species", 40)]),
  new State("New Hampshire", 43.4, -71.6, [new Animal("Black Bear", 4900), new Animal("Bald Eagle", 500), new Animal("Bat Species", 8),
      new Animal("Coyote", 4500), new Animal("White-tailed Deer", 100000), new Animal("Mosquitoes Species", 43)]),
  new State("New Jersey", 39.6, -74.5, [new Animal("Black Bear", 3000), new Animal("Bald Eagle", 220), new Animal("Bat Species", 9),
      new Animal("Coyote", 4000), new Animal("White-tailed Deer", 125000), new Animal("Mosquitoes Species", 60)]),
  new State("New Mexico", 34.0, -106.0, [new Animal("Black Bear", 5500), new Animal("Bald Eagle", 100), new Animal("Bat Species", 24),
      new Animal("Coyote", 125000), new Animal("White-tailed Deer", 0), new Animal("Mosquitoes Species", 57)]),
  new State("New York", 42.9, -75.6, [new Animal("Black Bear", 7000), new Animal("Bald Eagle", 426), new Animal("Bat Species", 9),
      new Animal("Coyote", 20000), new Animal("White-tailed Deer", 1200000), new Animal("Mosquitoes Species", 70)]),
  new State("North Carolina", 35.4, -78.6, [new Animal("Black Bear", 20000), new Animal("Bald Eagle", 80), new Animal("Bat Species", 17),
      new Animal("Coyote", 51905), new Animal("White-tailed Deer", 1000000), new Animal("Mosquitoes Species", 60)]),
  new State("North Dakota", 47.4, -100.4, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 160), new Animal("Bat Species", 11),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 135000), new Animal("Mosquitoes Species", 38)]),
  new State("Ohio", 40.3, -82.7, [new Animal("Black Bear", 75), new Animal("Bald Eagle", 707), new Animal("Bat Species", 11),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 725000), new Animal("Mosquitoes Species", 59)]),
  new State("Oklahoma", 35.4, -96.9, [new Animal("Black Bear", 2500), new Animal("Bald Eagle", 2000), new Animal("Bat Species", 24),
      new Animal("Coyote", 768), new Animal("White-tailed Deer", 750000), new Animal("Mosquitoes Species", 60)]),
  new State("Oregon", 43.9, -120.8, [new Animal("Black Bear", 27500), new Animal("Bald Eagle", 570), new Animal("Bat Species", 15),
      new Animal("Coyote", 83695), new Animal("White-tailed Deer", 0), new Animal("Mosquitoes Species", 50)]),
  new State("Pennsylvania", 40.9, -77.9, [new Animal("Black Bear", 16000), new Animal("Bald Eagle", 300), new Animal("Bat Species", 9),
      new Animal("Coyote", 100000), new Animal("White-tailed Deer", 1450000), new Animal("Mosquitoes Species", 60)]),
  new State("Rhode Island", 41.45, -71.3, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 3), new Animal("Bat Species", 8),
      new Animal("Coyote", 3642), new Animal("White-tailed Deer", 18000), new Animal("Mosquitoes Species", 46)]),
  new State("South Carolina", 33.7, -80.5, [new Animal("Black Bear", 1100), new Animal("Bald Eagle", 440), new Animal("Bat Species", 14),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 730000), new Animal("Mosquitoes Species", 61)]),
  new State("South Dakota", 44.44, -100.2, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 145), new Animal("Bat Species", 11),
      new Animal("Coyote", 70000), new Animal("White-tailed Deer", 425000), new Animal("Mosquitoes Species", 43)]),
  new State("Tennessee", 35.64, -86.1, [new Animal("Black Bear", 5750), new Animal("Bald Eagle", 175), new Animal("Bat Species", 16),
      new Animal("Coyote", 38202), new Animal("White-tailed Deer", 900000), new Animal("Mosquitoes Species", 9)]),
  new State("Texas", 30.9, -98.6, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 160), new Animal("Bat Species", 32),
      new Animal("Coyote", 859510), new Animal("White-tailed Deer", 5300000), new Animal("Mosquitoes Species", 85)]),
  new State("Utah", 39.1, -111.6, [new Animal("Black Bear", 4000), new Animal("Bald Eagle", 10), new Animal("Bat Species", 18),
      new Animal("Coyote", 0), new Animal("White-tailed Deer", 1000), new Animal("Mosquitoes Species", 50)]),
  new State("Vermont", 44.1, -72.7, [new Animal("Black Bear", 5250), new Animal("Bald Eagle", 68), new Animal("Bat Species", 9),
      new Animal("Coyote", 1000), new Animal("White-tailed Deer", 133000), new Animal("Mosquitoes Species", 45)]),
  new State("Virginia", 37.3, -78.5, [new Animal("Black Bear", 19000), new Animal("Bald Eagle", 1100), new Animal("Bat Species", 17),
      new Animal("Coyote", 50000), new Animal("White-tailed Deer", 925000), new Animal("Mosquitoes Species", 50)]),
  new State("Washington", 47.5, -120.2, [new Animal("Black Bear", 27500), new Animal("Bald Eagle", 900), new Animal("Bat Species", 15),
      new Animal("Coyote", 50000), new Animal("White-tailed Deer", 100000), new Animal("Mosquitoes Species", 40)]),
  new State("West Virginia", 38.5, -80.8, [new Animal("Black Bear", 13000), new Animal("Bald Eagle", 225), new Animal("Bat Species", 14),
      new Animal("Coyote", 11000), new Animal("White-tailed Deer", 550000), new Animal("Mosquitoes Species", 26)]),
  new State("Wisconsin", 44.2, -89.5, [new Animal("Black Bear", 24000), new Animal("Bald Eagle", 1500), new Animal("Bat Species", 8),
      new Animal("Coyote", 17000), new Animal("White-tailed Deer", 1600000), new Animal("Mosquitoes Species", 56)]),
  new State("Wyoming", 43.1, -107.4, [new Animal("Black Bear", 0), new Animal("Bald Eagle", 185), new Animal("Bat Species", 18),
      new Animal("Coyote", 86000), new Animal("White-tailed Deer", 72900), new Animal("Mosquitoes Species", 45)]),
]

class BirdConservativeRegion {
    id: number;
    // Population from 1967-2014
    goldenEaglePopulations: number[];
    constructor(id: number, goldenEaglePopulations: number[]) {
        this.id = id;
        this.goldenEaglePopulations = goldenEaglePopulations;
    }

    getCoordinate() {
        switch(this.id) {
        case 5:
            return {lat: 20, lng: 30}
        case 9:
            return {lat: 20, lng: 30}
        default:
            return {lat: 20, lng: 30}
        }
    }
}


const birdConservativeRegions = [
    new BirdConservativeRegion(5, []),
    new BirdConservativeRegion(6, []),

]

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [hoverState, setHoverState] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(0);
  const [isSoaring, setIsSoaring] = useState(false);
  const [selectedYear, setSelectedYear] = useState(1967);

  const timeline = [{
    title: 1960
  }, {title: 1961}, {title: 1962}]

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
            {!isSoaring ? <>
                <p className='description'>Choose an animal</p>
                <select id="dropdown" value={selectedAnimal} onChange={handleDropdownChange}>
                    <option value={0}>Black Bear</option>
                    <option value={1}>Bald Eagle</option>
                    <option value={2}>Bat Species</option>
                    <option value={3}>Coyote</option>
                    <option value={4}>White-tailed Deer</option>
                    <option value={5}>Mosquitoes Species</option>
                    <option value={6}>Bat</option>
                </select>
                <button onClick={() => setIsSoaring(!isSoaring)}className='soaring-button'>{isSoaring ? "Return to normal" : `Click to Soar through time`}</button>

            </> : <>
                <h2 className='soar-prompt'>View the population of Golden Eagle through time</h2>
                <p className='description'>{`Current Year: ${selectedYear}`}</p>
                <input type="range" min="1967" max="2014" value={selectedYear} className="slider" onChange={(e) => setSelectedYear(Number(e.target.value))}/>
                <button onClick={() => setIsSoaring(!isSoaring)}className='soaring-button'>{isSoaring ? "Return to normal" : `Click to Soar through time`}</button>

            </>}
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
                        <h4>{`${state.name}`}<br></br><br></br>{`${state.animals[selectedAnimal].name}: ${state.animals[selectedAnimal].population}`}</h4>
                    </InfoWindowF>
                )}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
};

export default App;