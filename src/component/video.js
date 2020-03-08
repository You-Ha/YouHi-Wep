import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./video.css";

const Video = () => {
  return (
    <div>
      <div id="videoFilter-title">영상 필터</div>
      <div className="video-filter">
        <Scrollbars
          style={{ height: 450 }}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: "none" }}
              className="track-horizontal"
            />
          )}
        >
          <p>
            <div className="filteredVideo-order">1</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
            <span>안녕?</span>
          </p>
          <p>
            <div className="filteredVideo-order">2</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
          </p>
          <p>
            <div className="filteredVideo-order">3</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
          </p>
          <p>
            <div className="filteredVideo-order">4</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
          </p>
          <p>
            <div className="filteredVideo-order">5</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
          </p>
          <p>
            <div className="filteredVideo-order">6</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
          </p>
          <p>
            <div className="filteredVideo-order">7</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
          </p>
          <p>
            <div className="filteredVideo-order">8</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
          </p>
          <p>
            <div className="filteredVideo-order">9</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
          </p>
          <p>
            <div className="filteredVideo-order">10</div>
            <img
              className="filteredVideo"
              src={require("../img/upload.png")}
              alt=""
            />
          </p>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Video;
