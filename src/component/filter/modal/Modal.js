import React from "react";
import "./Modal.css";
import ReactTransitionGroup from "react-addons-css-transition-group";
import { Scrollbars } from "react-custom-scrollbars";
import ReactPlayer from "react-player";

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
            <p className="title">영상 검열 결과</p>
            <div className="content">
              <Scrollbars
                className="Modal-scrollbars"
                style={{ height: 600 }}
                renderTrackHorizontal={(props) => (
                  <div
                    {...props}
                    style={{ display: "none" }}
                    className="track-horizontal"
                  />
                )}
              >
                <div className = "video-wrapper">
                  <div>
                    <ReactPlayer
                      className="video-con"
                      // ref={player_ref}
                      url="https://www.youtube.com/watch?v=uuGtrxDsrws"
                      playing
                      width="1000px"
                      height="600px"
                    />
                    {/* <Player/> */}
                  </div>
                  <div className="space-between"></div>
                  <div className = "img-text">
                    <img className ="img-con" src="ad_resize.jpg" alt=""/>                  
                    <div className = "text-con">Test <br/>
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@ <br/>
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@ <br/>
                    </div>
                  </div>
                </div>
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
