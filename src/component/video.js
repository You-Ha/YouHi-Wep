import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./video.css";

const Video = () => {
  return (
    <div>
      <div id="videoFilter_title">영상 필터</div>
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
          </p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
          <p>9</p>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Video;
