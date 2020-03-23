import React from "react";
import Video from "./video/Video";
import Voice from "./voice/Voice";
import FilterElement from "./filter_elementor/FilterElementor";
import "./Filter.css";

const Filter = () => {
  return (
    <div className="Filter-container">
      <FilterElement />
<<<<<<< HEAD
=======
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
      <div className="Filter-feedback-button-wrapper">
        <button className="Filter-feedback-button">이의신청 및 문의하기</button>
      </div>
>>>>>>> filter_box_text
      {/* <Video />
      <Voice /> */}
    </div>
  );
};

export default Filter;
