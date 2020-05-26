import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Scrollbars } from "react-custom-scrollbars";
import Duration from "./Duration";
import "./Player.css";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "./static/0/0.mp4",
      pip: false,
      playing: false,
      controls: false,
      light: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,

      ended: false,
      checkedIdx: null,
      elapsed: 0,
      // sortedLabelArray: this.props.labelArray,
      result: this.props.result,
    };
  }

  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
    });
  };

  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };

  handleSeek = (e) => {
    console.log("onSeek", e);
  };

  handleProgress = (state) => {
    console.log("onProgress", state);
    var condition = false;
    const data = this.state.result.labelArray;
    const checkedIdx = this.state.checkedIdx;
    const compareValue = Math.floor(state.playedSeconds);
    if (this.state.playing && data[compareValue] !== undefined) {
      document.getElementById(compareValue).style.fontWeight = "900";
      condition = true;
    }
    if (checkedIdx !== null && compareValue > checkedIdx + 2) {
      document.getElementById(checkedIdx).style.fontWeight = "300";
    }
    if (condition) {
      this.setState({ checkedIdx: compareValue });
    }

    if (this.state.ended) {
      document.getElementById(checkedIdx).style.fontWeight = "300";
    }

    if (!this.state.seeking) {
      this.setState({ state: state, played: state.played });
    }
  };

  handlePlay = () => {
    console.log("onPlay");
    this.setState({ playing: true, ended: false });
  };

  handleEnded = () => {
    this.setState({ idx: 0, ended: true });
  };

  handleDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  ref = (player) => {
    this.player = player;
  };

  printLabelArrayData = () => {
    const data = this.state.result.labelArray;
    return data.map((element, index) => {
      const date1 = new Date(index * 1000);
      const mm1 = date1.getUTCMinutes();
      const ss1 = ("0" + date1.getUTCSeconds()).slice(-2);

      const date2 = new Date(index * 1000);
      const mm2 = date2.getUTCMinutes();
      const ss2 = ("0" + date2.getUTCSeconds()).slice(-2);

      console.log(`${mm1}:${ss1}`);
      const diff = Math.floor(this.state.duration - index);
      if (element) {
        if (diff < 3) {
          return (
            <div id={index} className="Player-scrollbars-element">
              {index}~{index + diff} : {element}
            </div>
          );
        } else {
          return (
            <div id={index} className="Player-scrollbars-element">
              {index}~{index + 3} : {element}
            </div>
          );
        }
      } else {
        return null;
      }
    });
  };

  render() {
    const {
      url,
      playing,
      volume,
      muted,
      played,
      loaded,
      duration,
    } = this.state;

    return (
      <div className="Player">
        <section className="section">
          <div className="player-wrapper">
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              width="100%"
              height="100%"
              url={url}
              playing={playing}
              controls={true}
              volume={volume}
              muted={muted}
              onPause={this.handlePause}
              onSeek={this.handleSeek}
              onPlay={this.handlePlay}
              onEnded={this.handleEnded}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </div>
        </section>
        <div className="Player-info-wrapper">
          <div className="Player-info-label">
            <br />
            <br />
            <Scrollbars
              className="Player-scrollbars"
              style={{ height: 300 }}
              renderTrackHorizontal={(props) => (
                <div
                  {...props}
                  style={{ display: "none" }}
                  className="track-horizontal"
                />
              )}
            >
              {this.printLabelArrayData()}
            </Scrollbars>
          </div>
          <table className="Player-info-video">
            <tbody>
              <tr>
                <th>playing</th>
                <td>{playing ? "true" : "false"}</td>
              </tr>
              <tr>
                <th>volume</th>
                <td>{volume.toFixed(3)}</td>
              </tr>
              <tr>
                <th>played</th>
                <td>{played.toFixed(3)}</td>
              </tr>
              <tr>
                <th>loaded</th>
                <td>{loaded.toFixed(3)}</td>
              </tr>
              <tr>
                <th>duration</th>
                <td>
                  <Duration seconds={duration} />
                </td>
              </tr>
              <tr>
                <th>elapsed</th>
                <td>
                  <Duration seconds={duration * played} />
                </td>
              </tr>
              <tr>
                <th>remaining</th>
                <td>
                  <Duration seconds={duration * (1 - played)} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Player;
