import React from "react";
import "./Modal.css";
import ReactTransitionGroup from "react-addons-css-transition-group";
import { Scrollbars } from "react-custom-scrollbars";

const Modal = ({ isOpen, close, imgArray, swearArray }) => {
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
                className="Modal-left-scrollbars"
                style={{ width: "45%", height: "93.7%" }}
                renderTrackHorizontal={(props) => (
                  <div
                    {...props}
                    style={{ display: "none" }}
                    className="track-horizontal"
                  />
                )}
                renderThumbVertical={({ style, ...props }) => (
                      <div 
                        {...props}
                        style={{ ...style, backgroundColor: "#fff", borderRadius: "inherit", cursor: "pointer" }}
                      />
                    )
                }
              >
                {printImgArrayData(imgArray)}
              </Scrollbars>
              <div className="Modal-vertical-line" />
              <div className="Modal-right">
                <Scrollbars
                  className="Modal-right-scrollbars"
                  style={{ width: "100%", height: "80%" }}
                  renderTrackHorizontal={(props) => (
                    <div
                      {...props}
                      style={{ display: "none" }}
                      className="track-horizontal"
                    />
                  )}
                >
                  {printSwearArrayData(swearArray)}
                </Scrollbars>
                <audio controls src="./static/0/0.wav">
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
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
export default Modal;

const printImgArrayData = (imgArray) => {
  const data = imgArray;
  return data.map((element, index) => {
    const id = `img_${index}`;
    const src = `./static/0/img/${element}`;
    if (element) {
      return (
        <div id={id} className="Modal-scrollbars-left-element">
          <img src={src} alt="" />
        </div>
      );
    } else {
      return null;
    }
  });
};

const printSwearArrayData = (swearArray) => {
  const data = swearArray;
  return data.map((element, index) => {
    const id = `swear_${index}`;
    if (element) {
      return (
        <div id={id} className="Modal-scrollbars-right-element">
          욕설 '{element[0]}' 이 {element[1]} ~ {element[2]} 에서 검열되었습니다. 
        </div>
      );
    } else {
      return null;
    }
  });
}


