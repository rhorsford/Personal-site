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
import NavBar from "./NavBar/NavBar";

const App = () => {

    return (
        <div className="App">
        <Router>
            <Switch>
                <Route key={"main"} exact path="/">
                    <SplashScreen key="splash"/>
                    <NavBar key="nav" nav="#mainNav" nav2="#mainNavMobile" start="#about" end="#contact" page="main" />
                    <AboutUs key="about"/>
                    <Projects key="projects"/>
                    <Experience key="exp"/>

                    <Contact key="contact"/>
                    <Social key="social"/>
                </Route>
                <Route key={"timeline"} path="/timeline">
                    <NavBar key="nav" nav="#mainNav" nav2="#mainNavMobile" start={null} end={null} page="timeline"/>
                    <Timeline key="timeline"/>
                </Route>
            </Switch>
        </Router>


      </div>
    );

}

export default App;
