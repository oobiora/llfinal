import React, { Component } from 'react';
import Player from './Player';


export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = props.location.state
    
    // console.log(this.state)  
  }
  

  render() {
    const video_url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    let obj = {}
    obj["items"] = this.state
    console.log(obj)
    let playlist = {items: [
      
      {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "https://lls3-bucket.s3.amazonaws.com/blk1/Toes%20Into%201%20Red%202%20Black_1.mp4?AWSAccessKeyId=AKIA4B6BMLY2YRFD2POM&Expires=1607902554&Signature=SSs27juF1khQL5s8Hm3s%2FMBuWMI%3D",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    }, 
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    },
    {
      name: "example name",
      description: "xyz",
      sources: [{
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: 'video/mp4'
      }],
      poster: 'http://media.w3.org/2010/05/sintel/poster.png'
    }
  
  
  
  ]}

  playlist = obj["items"]

    var bandOverlay = 'Loading...';
    const img = <img src='img/logo-white.png' />
    const videoJsOptions = {
      crossorigin: 'anonymous',
      autoplay: true,
      controls: true,
      fill: false,
      responsive: true,
      plugins: {
        videojs_playlist: {
          autoadvance: 0
        },
        playlistUI: {
          
        },
        overlays: {
          overlays: [{
            content: "<img src='img/logo-white.png'/>",
            class: "results-logo-overlay",
            start: 0,
            showBackground: false,
            align: "top-right"
          }, {
            content: bandOverlay,
            class: "band-overlay",
            start: 0,
            showBackground: true,
            align: "top-left"
          }]
        }
      }
    };

    return (
        
        <Player {...videoJsOptions} {...playlist} />
              
    );
  }
}