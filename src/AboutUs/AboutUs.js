import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styled, {keyframes} from 'styled-components';
// import {bounce, fadeIn, fadeInLeft, fadeInRight} from 'react-animations';
import Zoom from 'react-reveal/Zoom'; // Importing Zoom effect;
import Fade from 'react-reveal/Fade';

import './AboutUs.css';
import Chart from "./chart/Chart";

// Add both three icon sets


const AboutUs = (props) => {

    // const bounceAnimation = keyframes`${bounce}`;
    // const fadeInAnimation = keyframes`${fadeIn}`;
    // const fadeInLeftAnimation = keyframes`${fadeInLeft}`;
    // const fadeInRightAnimation = keyframes`${bounce}`;
    //
    // const BouncyDiv = styled.div`
    //     animation: 2s ${bounceAnimation};
    // `;
    //
    // const FadeDiv = styled.div` {
    //     animation: delay 2s;
    //     animation: 2s ${fadeInAnimation};
    // `;


var index = 0;
const keyPoints = [
    {key: 'Fast', icon: 'fa fa-bolt', content: 'Quick turn around and fast response times.'},
    {key: 'Responsive', icon: 'fa fa-mobile', content: 'Responsive design scalable from desktop to mobile.'},
    {key: 'Intuitive', icon: 'far fa-lightbulb', content: 'Easy to use and understand UI.'},
    {key: 'Dynamic', icon: 'fas fa-rocket', content: 'Bringing Websites to live not just static brochure sites.'},
];

const custElement = (par) => {
    return React.createElement(`${par}Icon`, null, '')
};


return (
    <section id="about">
        <Zoom>
        <Container fixed>
            <Grid container>
                <Grid item xs={12}>
                        <h1>About Me</h1>
                </Grid>
            </Grid>
            <Grid container>
                {keyPoints.map((keypoint) => {
                        index++;
                        return (
                            <Grid key={index} item xl={3} md={3} sm={6} xs={12}>
                                <div className="icon">

                                    <div className="hexagon">
                                        <i className={keypoint.icon} aria-hidden="true"></i>
                                    </div>
                                    <h3>{keypoint.key}</h3>
                                    <p>{keypoint.content}</p>
                                </div>
                            </Grid>
                        )
                    }
                )}
            </Grid>
            <Grid container>
                <Grid item xl={6} md={6} sm={12} xs={12} className="about-content">
                    <Fade left>
                        <h3>Who Am I</h3>
                        <p>I'm a Front-End Developer for Orangebus in Newcastle UK.
                            I have serious passion for working with new and upcoming technology.
                        </p>
                        <p>My goals, are the create sites/web applications that are fast,responsive, intuitive and levels of dynamic.</p>

                    </Fade>
                </Grid>
                <Grid item xl={6} md={6} sm={12} xs={12}>
                    <Fade right>
                        <Chart/>
                    </Fade>
                </Grid>

            </Grid>
        </Container>
        </Zoom>
    </section>
);

};

export default AboutUs;