import React, {useState, useEffect} from 'react';
import {ParallaxProvider, Parallax} from 'react-scroll-parallax';
import gsap from "gsap";
import { Link, animateScroll as scroll } from "react-scroll";
import * as ScrollMagic from "scrollmagic";
import {ScrollMagicPluginGsap} from "scrollmagic-plugin-gsap";
import Svg from '../Svg/Svg';
import Fade from 'react-reveal/Fade';

/* eslint import/no-webpack-loader-syntax: off */
import gridWhite from '!!raw-loader!./grid-white.svg';
import gridPurple from '!!raw-loader!./grid-purple.svg';
import wave from '!!raw-loader!./wave.svg';
import wave2 from '!!raw-loader!./wave2.svg';
import angleDarkTop from '!!raw-loader!./angle-dark-top.svg';

import noisePattern from '!!raw-loader!./noise-pattern.svg';
import noisePattern2 from '!!raw-loader!./noise-pattern2.svg';
import optim from '!!raw-loader!./optim.svg';


import './timeline.css';

ScrollMagicPluginGsap(ScrollMagic, gsap);


const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


const Gradients = () => (
    <svg width="50" height="50" version="1.1" className="hidden">
        <defs>
            <linearGradient id="gradient-1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6ED0DD"/>
                <stop offset="100%" stopColor="#70E2B9"/>
            </linearGradient>
            <linearGradient id="gradient-2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#405D86"/>
                <stop offset="100%" stopColor="#384257"/>
            </linearGradient>
            <linearGradient id="gradient-3" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ED6088"/>
                <stop offset="100%" stopColor="#C86FA3"/>
            </linearGradient>
            <linearGradient id="gradient-4" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#F07F6B"/>
                <stop offset="100%" stopColor="#EFC15C"/>
            </linearGradient>
            <linearGradient id="gradient-5" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8D63B1"/>
                <stop offset="100%" stopColor="#8179CB"/>
            </linearGradient>
            <linearGradient id="gradient-6" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#EDD460"/>
                <stop offset="100%" stopColor="#EDBC39"/>
            </linearGradient>
        </defs>
    </svg>
);

const Years = [
    {title: '2013'},
    {title: '2014'},
    {title: '2016'},
    {title: '2018'},
    {title: '2020'},
];

const rndNumber = Math.floor(Math.random() * 70);


const SvgMotionLines = () => {
    const items = [];
    const size = getRandomInt(1, 10);

    for (var i = 0; i < 50; ++i) {
        items.push(<Parallax className={'svg-line-' + i} y={[-rndNumber, rndNumber]} x={[rndNumber, -rndNumber]}
                             tagOuter="div" classNameInner="tester">
            <svg viewBox={'0 0 5 5'} xmlns="http://www.w3.org/2000/svg" className={'line-' + i}>
                   <line x1="1" y1="3" x2="4" y2="3" stroke="#1dbf73"
                      stroke-linecap="round"/>
            </svg>
        </Parallax>);
    }

    return (
        <div className="lines-container" style={{
            position: "absolute",
            left: "50%",
            top: "-200px",
            zIndex: '-1',
            display: 'inline-block',
            width: "1200px",
            height: "600px"
        }}>
            {items}
        </div>
    )
};


const SvgMotionSquares = () => {
    const items = [];
    const size = getRandomInt(1, 10);


    for (var i = 0; i < 10; ++i) {
        items.push(<Parallax className={'svg-square-' + i} y={[-rndNumber, rndNumber]} x={[rndNumber, -rndNumber]}
                             tagOuter="div" classNameInner="tester">
            <svg viewBox={'0 0 10 10'} xmlns="http://www.w3.org/2000/svg" className={'square-' + i} width="400" height="400">
                <g noisePattern2>
                <path fill="#22DC88" d="M 5,0 L 3.061616997868383e-16,5 L -5,6.123233995736766e-16 L -9.184850993605148e-16,-5 Z"/>
                </g>
            </svg>
        </Parallax>)
    }


    return (
        <div className="squares-container" style={{
            position: "absolute",
            left: "50%",
            top: "-200px",
            zIndex: '0',
            display: 'inline-block',
            width: "1200px",
            height: "1000px"
        }}>
            <Svg svg={noisePattern2}/>
            {items}

        </div>
    )
};

const SvgMotionBg = () => (
    <div style={{
        position: "absolute",
        left: "0",
        top: "0",
        zIndex: '20',
        display: 'inline-block',
        width: "100%",
        height: "600px"
    }}>
        <Parallax className="svg-shape-1" y={[-rndNumber, rndNumber]} tagOuter="div" classNameInner="tester">
            <svg version="1.1" viewBox="0 0 15 15" className="pol-1" x="0px" y="0px">
                <path
                    d="M 5,0 L 3.5355339059327378,3.5355339059327373 L 3.061616997868383e-16,5 L -3.5355339059327373,3.5355339059327378 L -5,6.123233995736766e-16 L -3.5355339059327386,-3.5355339059327373 L -9.184850993605148e-16,-5 L 3.535533905932737,-3.5355339059327386 Z"/>
            </svg>
        </Parallax>
        <Parallax className="svg-shape-2" y={[-rndNumber, rndNumber]} tagOuter="div">
            <Svg svg={noisePattern2}/>
            <svg version="1.1" viewBox="0 0 20 20" className="pol-2" x="0px" y="0px"
                 style={{enableBackground: "new 0 0 20 20;"}}>
                <g fill="url(#noise-pattern2)">
                    <path
                        d="M 5,0 L 2.5000000000000004,4.330127018922193 L -2.499999999999999,4.330127018922194 L -5,6.123233995736766e-16 L -2.500000000000002,-4.330127018922193 L 2.4999999999999964,-4.330127018922195 Z"/>
                </g>
            </svg>
        </Parallax>
        <Parallax className="svg-shape-3" y={[-rndNumber, rndNumber]} x={[rndNumber, -rndNumber]} tagOuter="div">
            <svg version="1.1" viewBox="0 0 30 30" className="pol-3" x="0px" y="0px">
                <g fill="url(#noise-pattern)">
                    <path
                        d="M 5,0 L 2.5000000000000004,4.330127018922193 L -2.499999999999999,4.330127018922194 L -5,6.123233995736766e-16 L -2.500000000000002,-4.330127018922193 L 2.4999999999999964,-4.330127018922195 Z"/>
                </g>
            </svg>
        </Parallax>
        <Parallax className="svg-shape-4" y={[-rndNumber, rndNumber]} tagOuter="div">
            <svg version="1.1" viewBox="0 0 18 18" className="pol-4" x="0px" y="0px">
                <g fill="url(#noise-pattern)">
                    <path
                        d="M 5,0 L 1.5450849718747373,4.755282581475767 L -4.045084971874736,2.9389262614623664 L -4.045084971874737,-2.938926261462365 L 1.5450849718747361,-4.755282581475768 Z"/>
                </g>
            </svg>
        </Parallax>
        <Parallax className="svg-shape-5" y={[-rndNumber, rndNumber]} x={[-rndNumber, rndNumber]} tagOuter="div">
            <svg version="1.1" viewBox="0 0 30 30" className="pol-5" x="0px" y="0px">
                <path
                    d="M 5,0 L 1.5450849718747373,4.755282581475767 L -4.045084971874736,2.9389262614623664 L -4.045084971874737,-2.938926261462365 L 1.5450849718747361,-4.755282581475768 Z"/>
            </svg>
        </Parallax>
        <Parallax className="svg-shape-6" y={[-rndNumber, rndNumber]} tagOuter="div">
            <svg version="1.1" viewBox="0 0 11 11" className="pol-6" x="0px" y="0px">
                <path
                    d="M 5,0 L 1.5450849718747373,4.755282581475767 L -4.045084971874736,2.9389262614623664 L -4.045084971874737,-2.938926261462365 L 1.5450849718747361,-4.755282581475768 Z"/>
            </svg>
        </Parallax>
        <Parallax className="svg-shape-7" y={[-rndNumber, rndNumber]} x={[rndNumber, -rndNumber]} tagOuter="div">
            <svg version="1.1" viewBox="0 0 16 16" className="pol-7" x="0px" y="0px">
                <path fill='url(#diamond-sunset)'
                      d="M 5,0 L 1.5450849718747373,4.755282581475767 L -4.045084971874736,2.9389262614623664 L -4.045084971874737,-2.938926261462365 L 1.5450849718747361,-4.755282581475768 Z"/>
            </svg>
        </Parallax>
        <Parallax className="svg-shape-8" y={[-rndNumber, rndNumber]} tagOuter="div">
            <svg version="1.1" viewBox="0 0 22 22" className="pol-8" x="0px" y="0px">
                <defs>
                    <pattern id="basicPattern" x="10" y="10" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx='10' cy='10' r='10' fill='#64bee3'/>
                    </pattern>
                </defs>

                <path fill='url(#basicPattern)'
                      d="M 5,0 L 3.5355339059327378,3.5355339059327373 L 3.061616997868383e-16,5 L -3.5355339059327373,3.5355339059327378 L -5,6.123233995736766e-16 L -3.5355339059327386,-3.5355339059327373 L -9.184850993605148e-16,-5 L 3.535533905932737,-3.5355339059327386 Z"/>
            </svg>
        </Parallax>
        <Parallax className="svg-shape-9" y={[-rndNumber, rndNumber]} x={[-rndNumber, rndNumber]} tagOuter="div">
            <svg version="1.1" viewBox="0 0 11 11" className="pol-9" x="0px" y="0px">
                <defs>
                    <pattern id="basicPattern" x="10" y="10" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx='10' cy='10' r='10' fill='#64bee3'/>
                    </pattern>
                </defs>

                <path
                    d="M 5,0 L 3.5355339059327378,3.5355339059327373 L 3.061616997868383e-16,5 L -3.5355339059327373,3.5355339059327378 L -5,6.123233995736766e-16 L -3.5355339059327386,-3.5355339059327373 L -9.184850993605148e-16,-5 L 3.535533905932737,-3.5355339059327386 Z"/>
            </svg>
        </Parallax>
        <Parallax className="svg-shape-10" y={[-rndNumber, rndNumber]} tagOuter="div">
            <svg version="1.1" viewBox="0 0 28 28" className="pol-10" x="0px" y="0px">
                <g fill="url(#noise-pattern2)">
                    <path
                        d="M 5,0 L 3.5355339059327378,3.5355339059327373 L 3.061616997868383e-16,5 L -3.5355339059327373,3.5355339059327378 L -5,6.123233995736766e-16 L -3.5355339059327386,-3.5355339059327373 L -9.184850993605148e-16,-5 L 3.535533905932737,-3.5355339059327386 Z"/>
                </g>
            </svg>
        </Parallax>
    </div>


);


const TimeTitle = (props) => {
    const offset = getRandomInt(20, 50);
    const isSlower = getRandomInt(0, 1) ? true : false;
    let index = 0;
    let year = Years[props.number].title.toString().split('');
    console.log(Years[props.number].title, "ddd");


    return (
        <header className="timeline">

            <h2>
                {year.map((yearItem, i) => {
                    return (
                        <Parallax key={i} className="letters-tag"
                                  x={[0, 100 * (i - 2)]}
                                  slowerScrollRate={isSlower} tagOuter="span">
                            {yearItem}
                        </Parallax>
                    )
                })}
            </h2>
        </header>
    )
};

const Back = () => (
    <a href="/" rel="noopener" className="back">
        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i><span>Home</span>
    </a>
);


const Time = () => {
    return (
        <div>
            <section id="year2013" className="time-span">
                <div className="container">

                    <TimeTitle number={0}/>

                    <div id="2013" className="timeline">
                        <Parallax className="custom-class" y={[-20, 30]} tagOuter="div">
                            <div className="row">
                                <Fade bottom>
                                    <div className="left">
                                        <h2>United Labs</h2>
                                        <h3>Front-End Developer</h3>
                                        <p className="date">Feb 2013 - Mars 2014</p>
                                        <p>In this role I worked on commercial websites for restaurants. This involved
                                            doing design work in Photoshop then converting these approved designs into
                                            HTML5 responsive websites.</p>
                                        <div className="skills">
                                            <h4>Technologies Used</h4>
                                            <p>skills: html4/5, css, jquery</p>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </Parallax>
                        <div className="row">
                            <div className="right">
                                <div className="icon" id="icon-1">
                                    {/*<div className="hexagon"></div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="year2014" className="time-span waves">
                <Svg svg={wave} className="wave-1"/>
                <Svg svg={wave} className="wave-2"/>
                <div className="container">
                    <TimeTitle number={1}/>

                    <div id="2014" className="timeline">
                        <Parallax className="custom-class" y={[-20, 30]} tagOuter="div">
                            <div className="row">
                                <Fade bottom>
                                    <div className="right">
                                        <h2>AQL</h2>
                                        <h3>Front-End Developer</h3>
                                        <p className="date">April 2014 - March 2016</p>
                                        <p>In this role I worked on many web projects from initial prototyping / design
                                            through to front-end development in HTML 5 semantic coding style,
                                            Jquery/Javascript along with SASS/CSS3. This was then combined into an MVC
                                            Framework such as Symfony 2 and twig templating engine. Also had coverage on
                                            Unit testing with Selenium.
                                        </p>
                                        <div className="skills">
                                            <h4>Technologies Used</h4>
                                            <p>html5, sass/css3, jquery/javascript, Synfony, Bootstrap, Foundation</p>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </Parallax>
                        <div className="row">
                            <div className="left">
                                <div className="icon">
                                    {/*<div className="hexagon"></div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="year2016" className="time-span">
                <SvgMotionLines/>
                <div className="container">

                    <TimeTitle number={2}/>
                    <div id="2016" className="timeline">
                        <Parallax className="custom-class" y={[-20, 30]} tagOuter="div">
                            <div className="row">
                                <Fade bottom>
                                    <div className="left">
                                        <h2>Enjoy Digital</h2>
                                        <h3>Front-End Developer</h3>
                                        <p className="date">April 2016 - March 2018</p>
                                        <p>At this role I worked at a very well-known agency in Leeds City centre.
                                            This was an agile environment and a lot of the project were broken into
                                            sprints. I was part of a full development team of 15 with designers,
                                            front-end and Back-end developers. We used a custom built framework similar
                                            to bootstrap, using HTML 5 standards with SASS/LESS and Jquery/Javascript.
                                            These get combined with razor into a .net CMS framework such as Umbraco or
                                            Sitecore.</p>
                                        <div className="skills">
                                            <h4>Technologies Used</h4>
                                            <p>html5, sass/less, jquery/javascript, Umbraco/Sitecore, Grunt, Gulp</p>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </Parallax>
                        <div className="row">
                            <div className="right">
                                <div className="icon">
                                    {/*<div className="hexagon"></div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="year2018" className="time-span">
<SvgMotionSquares/>
                <Svg svg={optim} className="svg-edge"/>
                <div className="container">

                    <TimeTitle number={3}/>
                    <div id="2018" className="timeline">
                        <Parallax className="custom-class" y={[-20, 30]} tagOuter="div">
                            <div className="row">
                                <Fade bottom>
                                    <div className="right">
                                        <h2>Orangebus - HMRC Shipley</h2>
                                        <h3>Developer</h3>
                                        <p className="date">March 2018 to Dec 2019</p>
                                        <p>In the following role I worked in a digital service department, working on
                                            services that use our various API platforms. I was part of an Agile scrum
                                            team of 10 with 2 back-end developers, project manager, business Analysts,
                                            UX/UR and Technical Architect. I worked closely with user research and UX in
                                            order to design robust and accessibility friendly systems. I made use of
                                            Javascript/Jquery, HTML 5, Sass and Gulp where applicable. I had a lot of
                                            exposure to back-end languages such as Scala due to the cross-over work
                                            between front-end and back-end, often writing basic controllers and models
                                            which later where adapted. Since this was also a TDD (Test Driven
                                            Development) environment, I would be responsible to write tests for the
                                            views, controllers and models. Tools such as Service Manager, Docker were
                                            used to start up local environments. </p>
                                        <div className="skills">
                                            <h4>Technologies Used</h4>
                                            <p>html5, sass/less, jquery/javascript, MongoDb, Scala, Gulp</p>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </Parallax>
                        <div className="row">
                            <div className="left">
                                <div className="icon">
                                    {/*<div className="hexagon"></div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="year2020" className="time-span">

                <Svg svg={optim} className="svg-edge-2"/>
                <div className="container">

                    <TimeTitle number={4}/>
                    <div id="2020" className="timeline">
                        <Parallax className="custom-class" y={[-20, 30]} tagOuter="div">
                            <div className="row">
                                <Fade bottom>
                                    <div className="left">
                                        <h2>Orangebus</h2>
                                        <h3>Remote Developer</h3>
                                        <p className="date">Jan 2020 to Current</p>
                                        <p>In my current role, I work as part of the service team, working in an agile
                                            format, I take on service desk tickets ranging in issues. And dealing with
                                            clients such as BBC, Barnet and SGN. I also follow a strict CAB process in
                                            order to make sure a ticket is resolved and gone through the accepted test
                                            environments. I have looked at Drupal tickets, React based and issues with
                                            Drupal core and dependencies. I have also done Sales force training and
                                            worked on salesforce project, adding emails and setting up some automation
                                            in salesforce, on a previous project.</p>

                                        <div className="skills">
                                            <h4>Technologies Used</h4>
                                            <p>html5, sass, jquery/javascript, React Js/Redux, Drupal, Webpack, Gulp</p>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </Parallax>
                        <div className="row">
                            <div className="right">
                                <div className="icon">
                                    {/*<div className="hexagon"></div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
};

const Navi = () => {
    const navi = [];

    for (var j = 0; j < Years.length; j++){
        const title = Years[j].title;
        navi.push(<li><Link key={Years[j].title-''} to={title} spy={true} smooth={true} offset={-70} duration={500}><span>{title}</span></Link></li>);
    }

    return (
        <nav className="app-nav">
                <ul>
                    {navi}
                </ul>
        </nav>
    )
}

const Line = () => (
    <div className="line">
        <Time/>
    </div>
);

const Timelines = () => {
    useEffect(() => {
        window.scrollTo(0,0);
    });

    return (
        <ParallaxProvider>
            <main>
                <Navi/>
                <Gradients/>
                <SvgMotionBg/>
                <Line/>
                <Back/>
            </main>
        </ParallaxProvider>
    )
};


export default Timelines


