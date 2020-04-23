import React, { Component } from "react";
import Modal from "../modal/Modal";
import "./Voice.css";

class Voice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div className="Voice">
        <button
          className="Filter-box Filter-voice-filter"
          onClick={this.openModal}
        ></button>
        <Modal isOpen={this.state.isModalOpen} close={this.closeModal} />
      </div>
    );
  }
}

export default Voice;
