import React, {useEffect, useState, useRef, useCallback} from "react";
import {Link, animateScroll as scroll} from "react-scroll"
import {Link as Links} from "react-router-dom";
import "./NavBar.css";


const NavBar = (props) => {

    const [didMount, setDidMount] = useState(false);
    const [myValues, setMyValues] = useState(props.page);


    const navMotion = (nav, nav2, startpoint, endpoint) => {

        let element = document.querySelector(nav);
        let secElement = document.querySelector(nav2);
        let elementStart = document.querySelector(startpoint);
        let elementEnd = document.querySelector(endpoint);

        if(props.page == "timeline" && elementStart === null && elementEnd === null ) {

            if (window.matchMedia("(max-width: 680px)").matches) {
                secElement.classList.add("scrollNavMobileTimeline");

            }

        } else if(props.page == "main" && elementStart !== null && elementEnd !== null )  {


            let positionStart = elementStart.getBoundingClientRect();
            let positionEnd = elementEnd.getBoundingClientRect();


            if (positionStart.top < 42) {
                element.classList.add("scrollNav");
                if (window.matchMedia("(max-width: 680px)").matches) {
                    secElement.classList.add("scrollNavMobile");

                    if (props.page === "main" && secElement.classList.contains("scrollNavMobileTimeline")) {
                        secElement.classList.remove("scrollNavMobileTimeline");
                    }
                }
            } else {
                element.classList.remove("scrollNav");
                if (window.matchMedia("(max-width: 680px)").matches) {
                    secElement.classList.remove("scrollNavMobile");

                    if (props.page === "main" && secElement.classList.contains("scrollNavMobileTimeline")) {
                        secElement.classList.remove("scrollNavMobileTimeline");
                    }
                }
            }

            if (positionEnd.top < 1) {
                element.classList.remove("scrollNav");
                if (window.matchMedia("(max-width: 680px)").matches) {
                    secElement.classList.remove("scrollNavMobile");
                }
            }
        }
    };

    const pageCheck = () => {
        let Element = document.querySelector("#mainNavMobile");

        if (props.page === "main" && Element.classList.contains("scrollNavMobileTimeline")) {
            Element.classList.remove("scrollNavMobileTimeline");
        }
    };

    const mobileNav = () => {
        console.log("tester");
        var element = document.querySelector(".nav-item, .nav-item-timeline");
        element.classList.toggle("open");
    };

    const componentIsMounted = useRef(true);
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, []);


    useEffect(() => {
        if (componentIsMounted.current === true) {
            pageCheck();
            window.addEventListener('scroll', () => navMotion(props.nav, props.nav2, props.start, props.end));
        }
    },[componentIsMounted.current]);

    const FixedNav = [
        {link: 'about', linkName: 'About', urlContent: 'Play'},
        {link: 'projects', linkName: 'Projects', urlContent: 'View'},
        {link: 'experience', linkName: 'Experience', urlContent: 'View Rep'},
        {link: 'contact', linkName: 'Contact', urlContent: 'View Rep'},
    ];

    return (
        <React.Fragment>
            {props.page === 'timeline' ? null :
            <nav id="mainNav" className="Desktop">
                {FixedNav.map((nav) => {
                    return <Link to={nav.link} key={nav.link + '-'} className="btn" spy={true} smooth={true} offset={-0}
                                 duration={500}>{nav.linkName}</Link>
                })}

            </nav>}
            <nav id="mainNavMobile" className="Mobile">
                <Link className="mobile-nav" to="#" onClick={() => mobileNav()}><i className="fas fa-bars"></i></Link>

            </nav>
            <div className={props.page === 'timeline' ? "nav-item-timeline" : "nav-item"}>
                <ul className="menu-list">
                    {FixedNav.map((nav) => {
                        return <li>  {props.page === 'timeline' ? <Links to={"/#" + nav.link} key={nav.link + '-'} className="btn-mobile-timeline" onClick={() => mobileNav()}>{nav.linkName}</Links> :
                            <Link to={nav.link} key={nav.link + '-'} className="btn-mobile" onClick={() => mobileNav()} spy={true}
                                         smooth={true} offset={-0}
                                         duration={500}>{nav.linkName}</Link>}
                        </li>
                    })}

                </ul>
            </div>
        </React.Fragment>
    )
};

export default NavBar;

