import React, { useState, useRef, useEffect } from "react";
import ReactTransitionGroup from "react-addons-css-transition-group";
import Login from "../login/login";
import NodeMailer from "./nodemailer/Nodemailer";
import "./FeedbackModal.css";

const FeedbackModal = ({ isOpen, close, emailAddress }) => {
  return (
    <div>
      {isOpen ? (
        <ReactTransitionGroup
          transitionName={"Modal-anim"}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          <div className="FeedbackModal-overlay" onClick={close} />
          <div className="FeedbackModal">
            <p className="title">영상 검열 결과</p>
            <div className="content">
              {/* <Login /> */}
              <NodeMailer />
            </div>
            <div className="button-wrap">
              <button onClick={close}>확인</button>
            </div>
          </div>
        </ReactTransitionGroup>
      ) : (
        <ReactTransitionGroup
          transitionName={"Modal-anim"}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        />
      )}
    </div>
  );
};
export default FeedbackModal;
