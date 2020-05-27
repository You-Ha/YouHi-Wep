import React, { useState, useRef, useEffect } from "react";
import ReactTransitionGroup from "react-addons-css-transition-group";
import Player from "./react_player/Player";
import "./VideoModal.css";

const VideoModal = ({ isOpen, close, result }) => {
  var ref = new Array(4);
  const allTabRef = useRef(null);
  const adultTabRef = useRef(null);
  const bloodTabRef = useRef(null);
  const knifeTabRef = useRef(null);
  const smokeTabRef = useRef(null);

  const setRef = (paramRef) => {
    ref[0] = paramRef[0];
    ref[1] = paramRef[1];
    ref[2] = paramRef[2];
    ref[3] = paramRef[3];
  }

  useEffect(() => {
    allTabRef.current.addEventListener('click', (event) => {
      ref[0].click();
      ref[1].click();
      ref[2].click();
      ref[3].click();
    })
    adultTabRef.current.addEventListener('click', () => {
      console.log("hi");
      ref[0].click();
    })
    bloodTabRef.current.addEventListener('click', () => {
      ref[1].click();
    })
    knifeTabRef.current.addEventListener('click', () => {
      ref[2].click();
    })
    smokeTabRef.current.addEventListener('click', () => {
      ref[3].click();
    })
  },[ref]);

  return (
    <div>
      {isOpen ? (
        <ReactTransitionGroup
          transitionName={"Modal-anim"}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          <div className="VideoModal-overlay" onClick={close} />
          <div className="VideoModal">
            <p className="title">영상 검열 결과</p>
            <div className="content">
              <div className="VideoModal-parallel-video-tabs">
                <div className="VideoModal-tab" ref={allTabRef}>
                  {getLabelsCnt(result.cntArray)}
                  <div className="VideoModal-tab-subtitle">전체 결과</div>
                </div>
                <div className="VideoModal-tab" ref={adultTabRef}>
                  {result.cntArray[0]}
                  <div className="VideoModal-tab-subtitle">Adult</div>
                </div>
                <div className="VideoModal-tab" ref={bloodTabRef}>
                  {result.cntArray[1]}
                  <div className="VideoModal-tab-subtitle">Blood</div>
                </div>
                <div className="VideoModal-tab" ref={knifeTabRef}>
                  {result.cntArray[2]}
                  <div className="VideoModal-tab-subtitle">Knife</div>
                </div>
                <div className="VideoModal-tab" ref={smokeTabRef}>
                  {result.cntArray[3]}
                  <div className="VideoModal-tab-subtitle">Smoke</div>
                </div>
              </div>
              <div className="VideoModal-video-wrapper">
                <Player result={result} func={setRef} />
              </div>
            </div>
            <div className="button-wrap">
              <button onClick={close}>Confirm</button>
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
export default VideoModal;

const getLabelsCnt = (array) => {
  var i = 0;
  var sum = 0;
  for (; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};


