import React, {useState, useEffect, useRef} from 'react';
import './Asteroids.css';
import AsteroidsGameEngine from './AstroidsGameEngine'

const Asteroids = (props) => {
    const containerRef = useRef(null);

    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);


    const updateWidthAndHeight = () => {
        var isFullScreen = document.fullScreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen;

        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        if (isFullScreen === true) {
            console.log('full screen')
        }else {
            console.log('not full screen');
            props.playAsteroids(false);
            console.log(props.playAsteroids);
        }
    };

    useEffect(() => {
        AsteroidsGameEngine(props.playAsteroids)
        // check();
    }, [props.playAsteroids]);


    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });




    // setup the game loop


    return (
        <div>
            <canvas ref={containerRef} id="game" width="1920" height="1080"></canvas>
        </div>
    );


}

export default Asteroids;
