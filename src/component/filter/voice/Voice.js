import React, { Component } from "react";
import VoiceModal from "./Modal";
import "./Voice.css";

class Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      check: false,
      imgArray: [],
      swearArray: [],
    };
  }

  go = async () => {
    var res,
      data,
      swearArrayCopy = [],
      imgArrayCopy = [];
    res = await fetch("./static/0/img/img_result.txt");
    data = await res.text();
    imgArrayCopy = data.length ? this.returnimgArray(data) : imgArrayCopy;

    res = await fetch("./static/0/sound_filter_result.txt");
    data = await res.text();
    swearArrayCopy = data.length ? this.returnSwearArray(data) : swearArrayCopy;

    // res = await fetch("./static/0/knife_result.txt");
    // data = await res.text();
    // copy = data.length ? this.collectLabelData(copy, data, "knife") : copy;

    this.setState({ imgArray: imgArrayCopy, swearArray: swearArrayCopy, check: true }, () => {
      console.log("imgArray", this.state.imgArray);
      console.log("swearArray", this.state.swearArray);
    });
  };

  returnimgArray = (data) => {
    const dataArray = data.split("\n");
    return dataArray;
  }

  returnSwearArray = (data) => {
    const dataArray = data.split("\n");
    var copy = [];
    var i = 0;
    for (; i < dataArray.length; i++) {
      const dataArrayElement = dataArray[i].split("/");
      copy.push([[dataArrayElement[0].trim()], [dataArrayElement[1].trim()], [dataArrayElement[2].trim()]])
    }
    return copy;
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  renderVoiceModal = () => {
    if (this.state.check) {
      return (
        <VoiceModal
          isOpen={this.state.isModalOpen}
          close={this.closeModal}
          imgArray={this.state.imgArray}
          swearArray={this.state.swearArray}
        />
      );
    }
  }

  render() {
    return (
      <div className="Voice">
        <button
          className="Filter-box Filter-voice-filter"
          disabled={!this.props.successfulFiltered}
          onClick={() => {
            this.openModal();
            this.go();
          }}
        ></button>
        {this.renderVoiceModal()}
      </div>
    );
  }
}

export default Voice;
