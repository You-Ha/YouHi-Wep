import React, { Component } from "react";
import FilterElement from "./filter_elementor/FilterElementor";
import Modal from "react-modal";
import "./Filter.css";
// import NewWindow from "react-new-window";

Modal.setAppElement("#root");

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    return (
      <div className="Filter-container">
        <FilterElement />
        <div className="filter-wrapper">
          <div className="Filter-filter-box">
            <div className="inner-filter-wrapper">
              <button
                className="Filter-box Filter-video-filter"
                onClick={this.openModal}
              />
            </div>
            <div className="inner-filter-wrapper">
              <button className="Filter-box Filter-voice-filter" />
            </div>
          </div>
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
