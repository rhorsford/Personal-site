import React, { useState } from 'react';
import './SplashScreen.css';
import Astroids from "./game/Asteroids";
import Content from "./Content/Content";

const SplashScreen = (props) => {

    const [playAsteroid, setAsteroids] = useState(false);

    const playAsteroids = () => {
        console.log("true button pressed");
        setAsteroids(true);
    };
    return (
        <header id="header">
            {playAsteroid === true ?
                <Astroids playAsteroids={setAsteroids} />
                :
                <Content playAsteroids={playAsteroids}/>
            }
        </header>

    );

};

export default SplashScreen;