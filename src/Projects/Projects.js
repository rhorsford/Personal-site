import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Zoom from 'react-reveal/Zoom'; // Importing Zoom effect;
import {Link} from "react-router-dom";
import './Projects.css';
import asteroids from './images/asteroids.png';
import opta from './images/opta.png';
import password from './images/passwordManager.png';
import Astroids from "../SplashScreen/game/Asteroids";


// Add both three icon sets


const Projects = (props) => {
    const [playAsteroid, setAsteroids] = useState(false);

    const playAsteroids = () => {
        console.log("true button pressed");
        setAsteroids(true);
    };

    const Projects = [
        {img: asteroids, head: 'Javascript Asteroids Game', content: 'Javascript', url: '#', urlContent: 'Play', funct: playAsteroids},
        {img: opta, head: 'Opta Sport', content: 'HTML5 /SCSS Javascript', url: '/timeline', urlContent: 'View'},
        {img: password, head: 'Password Manager', content: 'Mongo Express React Node SCSS', url: '/timeline', urlContent: 'View Rep'},
    ];

    const hover = (e) => {
        const target = e.target;
        console.log(target);

    };



    return (
        <section id="projects">
            {playAsteroid === true ?
                <Astroids playAsteroids={setAsteroids}/> :
                <Zoom>
                    <Container fixed>
                        <Grid container>
                            <Grid item xs={12}>
                                <h1>Projects</h1>
                            </Grid>
                        </Grid>
                        <Grid container>
                            {Projects.map((project) => {
                                return (
                                    <Grid item xs={12} md={6} lg={4} className="card" onMouseOver={(e) => hover(e)}>
                                        <div className="flip">
                                            <div className="front">
                                                <img src={project.img}/>
                                            </div>
                                            <div className="card-container">
                                                <div>
                                                    <h4>{project.head}</h4>
                                                    <p>{project.content}</p>
                                                    <Link to={project.url} className="btn" onClick={project.funct}>{project.urlContent}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                )
                            })
                            }
                        </Grid>
                    </Container>

                </Zoom>
            }
        </section>
    );

};

export default Projects;