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
        </Scrollbars>
      </div>
    </div>
  );
};

export default Voice;
