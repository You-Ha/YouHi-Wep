import React from "react";
import Video from "./video/Video";
import Voice from "./voice/Voice";
import FilterElement from "./filter_elementor/FilterElementor";

const Filter = () => {
  return (
    <div className="Filter-wrapper">
      <FilterElement />
      <div className="Filter-filter-box">
        <img
          alt="video-filter-box"
          src={require("../../img/Video_filter_box.png")}
        />
        <img
          alt="voice-filter-box"
          src={require("../../img/Voice_filter_box.png")}
        />
      </div>
      {/* <Video />
      <Voice /> */}
    </div>
  );
};

export default Filter;
