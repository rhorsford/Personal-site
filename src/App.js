import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SplashScreen from "./SplashScreen/SplashScreen";
import AboutUs from "./AboutUs/AboutUs";
import Experience from "./Experience/Experience";
import Contact from "./Contact/Contact";
import Social from "./SocialMedia/Social";
import Timeline from "./Timeline/Timeline";
import './App.css';
import Projects from "./Projects/Projects";

const App = () => {

    return (
        <div className="App">
        <Router>
            <Switch>
                <Route key={"main"} exact path="/">
                    <SplashScreen key="splash"/>
                    <AboutUs key="about"/>
                    <Experience key="exp"/>
                    <Projects key="projects"/>
                    <Contact key="contact"/>
                    <Social key="social"/>
                </Route>
                <Route key={"timeline"} path="/timeline">
                    <Timeline key="timeline"/>
                </Route>
            </Switch>
        </Router>


      </div>
    );

}

export default App;
