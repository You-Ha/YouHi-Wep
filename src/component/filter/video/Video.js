import React, { Component } from "react";
import VideoModal from "./VideoModal";
import "./VideoModal.css";
import "./Video.css";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      isModalOpen: false,
      labelArray: [],
      adultCnt: 0,
      bloodCnt: 0,
      knifeCnt: 0,
      smokeCnt: 0,
      result: {}
    };
  }

  go = async () => {
    var res,
      data,
      result = { labelArray: [], cntArray: [] };
    res = await fetch("./static/0/adult_result.txt");
    data = await res.text();
    result = data.length ? this.collectLabelData(result, data, "adult") : this.addZero(result);

    res = await fetch("./static/0/blood_result.txt");
    data = await res.text();
    result = data.length ? this.collectLabelData(result, data, "blood") : this.addZero(result);

    res = await fetch("./static/0/knife_result.txt");
    data = await res.text();
    result = data.length ? this.collectLabelData(result, data, "knife") : this.addZero(result);

    res = await fetch("./static/0/smoke_result.txt");
    data = await res.text();
    result = data.length ? this.collectLabelData(result, data, "smoke") : this.addZero(result);

    this.setState(
      {
        // labelArray: result.copy,
        // adultCnt: adultCnt,
        // bloodCnt: bloodCnt,
        // knifeCnt: knifeCnt,
        // smokeCnt: smokeCnt,
        result: result,
        check: true,
      },
      () => {
        // console.log(this.state.labelArray);
        // console.log(this.state.adultCnt);
        // console.log(this.state.bloodCnt);
        // console.log(this.state.knifeCnt);
        // console.log(this.state.smokeCnt);
        console.log(this.state.result.labelArray);
        console.log(this.state.result.cntArray);
      }
    );
  };

  addZero = (result) => {
    var resultCopy = result;
    resultCopy.cntArray.push(0);
    return resultCopy;
  }

  collectLabelData = (result, data, label) => {
    var resultCopy = result;
    const dataArray = data.split("\n");
    var i = 0;
    for (; i < dataArray.length; i++) {
      resultCopy.labelArray[parseInt(dataArray[i])] = label;
    }
    resultCopy.cntArray.push(dataArray.length);
    return resultCopy;
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  renderVideoModal = () => {
    if (this.state.check) {
      return (
        <VideoModal
          isOpen={this.state.isModalOpen}
          close={this.closeModal}
          // labelArray={this.state.labelArray}
          result={this.state.result}
        />
      );
    }
  };

  render() {
    return (
      <div className="Video">
        <button
          className="Filter-box Filter-video-filter"
          disabled={!this.props.successfulFiltered}
          onClick={() => {
            this.openModal();
            this.go();
          }}
        ></button>
        {this.renderVideoModal()}
      </div>
    );
  }
}

export default Video;
