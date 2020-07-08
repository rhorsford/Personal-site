import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Zoom from 'react-reveal/Zoom'; // Importing Zoom effect;
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import './Projects.css';



// Add both three icon sets


const Projects = (props) => {
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
    });
    const classes = useStyles();

return (
    <section id="projects">
        <Zoom>
        <Container fixed>
            <Grid container>
                <Grid item xs={12}>
                        <h1>Projects</h1>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={3} className="card">


                </Grid>
            </Grid>
        </Container>
        </Zoom>
    </section>
);

};

export default Projects;