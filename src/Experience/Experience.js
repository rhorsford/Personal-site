import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Zoom from 'react-reveal/Zoom'; // Importing Zoom effect;

import './Experience.css';
import {Link} from "react-router-dom";


const Experience = (props) => {

return (
    <section id="experience">
        <Zoom>
        <Container fixed>
            <Grid container>
                <Grid item xs={12}>
                        <h1>Experience</h1>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <p>Here is a history timeline of the places I worked and experience I picked up.</p>
                    <Link to="/timeline" className="btn">View My Experience <i className="fas fa-arrow-right"></i></Link>
                </Grid>
            </Grid>
        </Container>
        </Zoom>
    </section>
);

};

export default Experience;