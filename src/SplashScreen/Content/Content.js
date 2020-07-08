import React, {useState} from 'react';
import './Content.css';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Bounce from 'react-reveal/Bounce';

const Content = (props) => {


    // setup the game loop

    const createRows = () => {
        const num = 50;
        let rows = [];
        for (var i = 0; i < num; i++) {
            rows.push(<div key={"bubble-"+i} className="bubble"></div>)
        }
        return rows
    };

   const fadeIn = {
       animationDuration: '1000ms',
       animationDelay: '0ms',
       animationIterationCount: '1',
       opacity: '1'
   };


    return (
        <Container maxWidth="sm" className="header-flex-container">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="header-flex-box"
            >
                <Bounce left cascade>
                    <Grid item xs={12}>
                        <h1>Hello, I'm Richard Horsford.</h1>
                        <p>I'm a Front-end Developer scroll to find out more<br/> or click below for a quick game of Asteroids</p>

                        <Button onClick={props.playAsteroids}>Play Asteroids</Button>
                    </Grid>
                </Bounce>

                <div className="scroll-downs">
                    <div className="mousey">
                        <div className="scroller"></div>
                    </div>
                </div>
            </Grid>
            <div className="bubble-wrap">
                {createRows()}
            </div>
        </Container>
    );


}

export default Content;
