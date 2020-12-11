import React, { Component } from 'react';
import * as typeformEmbed from '@typeform/embed';

import Login from './Login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom'

import { Zoom } from "react-awesome-reveal";


class Landing extends Component {

    componentDidMount() {
        const embedElement = document.getElementById('contact-typeform') // NOTE: `.target-dom-node` is the target DOM element from your website or web app

        typeformEmbed.makeWidget(
            embedElement,
            'https://form.typeform.com/to/ZJO9ALEM', // NOTE: Replace with your typeform URL
            {
                hideHeaders: true,
                hideFooter: true,
                opacity: 0,
                height: 300,
                onSubmit: function () {
                    console.log('Form successfully submitted')
                }
            }
        )
    }

    render() {

        return (

            <div className="Landing">
                <header id="home">
                <nav className="navbar navbar-default text-light navbar-fixed navbar-transparent white bootsnav">
                    <div className="container">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu"> <i className="fa fa-bars"></i> </button>
                        <a className="navbar-brand" href="index.html">
                        <img src="img/logo-white.png" className="logo logo-display" alt="Logo" />
                                <img src="img/logo-black.png" className="logo logo-scrolled" alt="Logo" />
                            </a>
                        </div>

                    <div class="collapse navbar-collapse" id="navbar-menu">
                        <ul class="nav navbar-nav navbar-right" data-in="#" data-out="#">
                        <li><Link to="/quiz">START TRIAL</Link></li>
                        <li><Link to='/signup'>SIGNUP</Link></li>
                        <li><Link to='/login'>LOGIN</Link></li>
                        </ul>
                    </div>
                    </div>
                </nav>
                </header>

            <div className="utf-banner-area-block heading-only video-bg-live text-normal text-center solid-transparent text-light bg-fixed" style={{backgroundImage: "url(img/landing-preview.png)"}}>
                <div className="utf-box-table shadow dark">
                <div className="player" data-property="{videoURL:'https://www.youtube.com/watch?v=3Kspz1_T-io',containment:'.video-bg-live', showControls:false, autoPlay:true, zoom:0, loop:true, mute:true, startAt:57, stopAt: 75, opacity:1, quality:'default'}"></div>
                    <div className="utf-box-cell">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="content">
                                <img id="utf-banner-logo-img" className="mb-40" src="img/logo-full-white.png" />
                                <h3>Pilates Reformer Workout Tailored <span>Just To You</span></h3>
                                <br />
                                <p>Answer just 3 questions and let us handle the rest.</p>
                                <Link to='/quiz' id="landing-cta-button" className="btn btn-theme effect btn-md">TRY THE QUIZ</Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

                <div className="utf-steps-area bg-theme-green text-center default-padding bottom-less mb-60">
                <div className="container">
                    <div className="row">
                    <div className="utf-site-heading text-center">
                        <div className="col-md-8 col-md-offset-2">
                        <h2 style={{color:"#fff"}}>How it <span>Works</span></h2>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="utf-steps-items">
                        <div className="col-md-4 col-sm-6 equal-height">
                        <Zoom triggerOnce delay={300}>
                            <div id="landing-step-1-img" className="item mb-20">
                                <img src="img/step1.png" />
                            </div>
                        </Zoom>
                        <h4 className="steps-steps-h4">Step 1</h4>
                        <p className="steps-steps-p">Take the short quiz</p>
                        </div>
                        <div className="col-md-4 col-sm-6 equal-height">
                        <Zoom triggerOnce delay={600}>
                            <div id="landing-step-2-img" className="landing-step-2-img item mb-20">
                                <img src="img/step2.png" />
                            </div>
                        </Zoom>
                        <h4 className="steps-steps-h4">Step 2</h4>
                        <p className="steps-steps-p">Wait a few seconds</p>
                        </div>
                        <div className="col-md-4 col-sm-6 equal-height">
                        <Zoom triggerOnce delay={900}>
                            <div id="landing-step-3-img" className="item mb-20">
                                <img src="img/step3.png" />
                            </div>
                        </Zoom>
                        <h4 className="steps-steps-h4">Step 3</h4>
                        <p className="steps-steps-p">Enjoy your workout</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="utf-contact-area text-center">
                <div className="container">
                    <div className="row">
                    <div className="utf-site-heading text-center">
                        <div className="col-md-8 col-md-offset-2">
                            <h2>Join the <span>mailing list</span></h2>
                            <div id="contact-typeform"></div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <footer className="text-center bg-theme-green text-light">
                <div className="container">
                    <div className="row">
                    <div className="col-md-8 copyright text-left">
                        <p>Copyright © 2020 All Rights Reserved.</p>
                    </div>
                    <div className="col-md-4 utf-footer-social text-right">
                        <ul><li className="facebook"><a href="https://www.facebook.com/lighterliving" target="_blank"><i className="fab fa-facebook-f"></i></a></li></ul>
                    </div>
                    </div>
                </div>
                </footer>
                </div>
        );
    }
}

export default Landing;
