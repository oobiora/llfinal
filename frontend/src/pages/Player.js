import React, { Component } from 'react';
import videojs from 'video.js';
import videojs_playlist from 'videojs-playlist'
import playlistUI from 'videojs-playlist-ui'
import overlays from 'videojs-overlay'
import '../../node_modules/video.js/dist/video-js.css';
import '../../node_modules/videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css'
import '../../node_modules/videojs-overlay/dist/videojs-overlay.css'
import '../../node_modules/videojs-font/css/videojs-icons.css'
export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      isEnd: false
    };
  }

  componentDidMount() {
    videojs.registerPlugin('videojs_playlist',videojs_playlist);
    videojs.registerPlugin('playlistUI',playlistUI);
    videojs.registerPlugin('overlays',overlays);
    window.videojs = videojs;
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    this.player.videojs_playlist(this.props.items)
    this.player.playlistUI()
    console.log(this.player.playlist)
    console.log(this.player.videojs_playlist)
    console.log(this.props)

    // this.player.on('on', () => {
    //   this.setState({ isEnd: false });
    // });

    // this.player.on('ended', () => {
    //   this.setState({ isEnd: true });
    //   this.player.exitFullscreen();
    // });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div className="data-vjs-player" style={{backgroundColor: "black"}}>
        <video
          ref={node => (this.videoNode = node)}
          className="video-js"
          crossOrigin="anonymous"
          // style={{float: 'left', width: '70%'}}
        />
        <ol className='vjs-playlist preview-player-dimensions vjs-fluid' ></ol>
      </div>
    );
  }
}