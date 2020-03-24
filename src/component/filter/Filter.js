import React, { Component } from "react";
import FilterElement from "./filter_elementor/FilterElementor";
import "./Filter.css";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.showFilterResult = this.showFilterResult.bind(this);
  }

  render() {
    return (
      <div className="Filter-container">
        <FilterElement />
        <div className="Filter-filter-box">
          {/* <img
          alt="video-filter-box"
          src={require("../../img/Video_filter_box.png")}
        />
        <img
          alt="voice-filter-box"
          src={require("../../img/Voice_filter_box.png")}
        /> */}
          <button className="Filter-box Filter-video-filter" />
          <button className="Filter-box Filter-voice-filter" />
        </div>
        <div className="Filter-feedback-button-wrapper">
          <button className="Filter-feedback-button">
            이의신청 및 문의하기
          </button>
        </div>
      </div>
    );
  }
}

export default Filter;
