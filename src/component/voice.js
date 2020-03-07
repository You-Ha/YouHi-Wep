import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./voice.css";

const Voice = () => {
  return (
    <div>
      <div id="voiceFilter-title">음성 필터</div>
      <div className="voice-filter">
        <Scrollbars
          style={{ height: 356 }}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: "none" }}
              className="track-horizontal"
            />
          )}
        >
          <p>0</p>
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

export default Voice;
