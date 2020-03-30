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
      modalIsOpen: false
    };

    this.showFilterResult = this.showFilterResult.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  showFilterResult() {
    var wFeature =
      "width=500, height=500, location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes";
    var w = window.open("/filter", "_blank", wFeature);
    w.document.write(`<title>Filter</title>`);
    w.document.write(
      `<img src="static/media/background_img.3ccc4efd.png" width="300px"> 안녕`
    );
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
