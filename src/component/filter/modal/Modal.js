import React from "react";
import "./Modal.css";
import ReactTransitionGroup from "react-addons-css-transition-group";
import { Scrollbars } from "react-custom-scrollbars";

const Modal = ({ isOpen, close }) => {
  return (
    <div>
      {isOpen ? (
        <ReactTransitionGroup
          transitionName={"Modal-anim"}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          <div className="Modal-overlay" onClick={close} />
          <div className="Modal">
            <p className="title" >영상 검열 결과</p>
            <div className="content">
            <Scrollbars
              className="Modal-scrollbars"
              style={{ height: 400 }}
              renderTrackHorizontal={props => (
                <div
                  {...props}
                  style={{ display: "none" }}
                  className="track-horizontal"
                />
              )}
            >
            <img src="ad_resize.jpg" alt="" />
            <img src="ad_resize.jpg" alt="" />
            <img src="ad_resize.jpg" alt="" />
            <img src="ad_resize.jpg" alt="" />
            <img src="ad_resize.jpg" alt="" />
            <img src="ad_resize.jpg" alt="" />
            <img src="ad_resize.jpg" alt="" />
            </Scrollbars>
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
export default Modal;
