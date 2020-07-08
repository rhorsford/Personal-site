import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Form from "./form/Forms"
import Fade from 'react-reveal/Fade';

import "./Contact.css";

const Contact = () => {

    return (
        <section id="contact">
            <Container fixed>
                <Fade bottom>
                    <Grid container>
                        <Grid item={true} xs={12}>
                            <h1>Contact</h1>
                        </Grid>
                        <Grid item={true} className="centerForm" xs={12}>
                            <Form />
                        </Grid>
                    </Grid>
                </Fade>
            </Container>
        </section>
    )
};

export default Contact;

