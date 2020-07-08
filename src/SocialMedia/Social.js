import React from 'react';
import './Social.css'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import RubberBand from 'react-reveal/RubberBand';




const Social = () => {

    var index = 0;
    const socialMedia = [
        {icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/richard-horsford-8358b079/?msgConversationId=6121383131288264705&msgOverlay=true', title: 'LinkedIn'},
        {icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/richard.horsford', title: 'Facebook'},
        {icon: 'fab fa-instagram', url: 'https://www.instagram.com/richardhorsford/', title: 'Instagram'},
        {icon: 'fas fa-envelope', url: 'mailto:richard.horsford@gmail.com', title: 'Email'},
    ];

    return(
        <footer id="SocialMedia">
            <Container fixed>
                <Grid container>
                    <Grid item xs={12}>
                        {socialMedia.map((social) => {
                            index++;
                            return (
                                <RubberBand key={"social-icon-"+index}>
                                    <div className="social_m_icons">
                                    <a href={social.url} title={social.title} target="_blank">
                                        <i className={social.icon}></i>
                                    </a>
                                    </div>
                                </RubberBand>
                            )})
                        }
                        <div className="footnote">
                            RICHARD HORSFORD <span className="highlight">©2020</span>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    )
};


export default Social;