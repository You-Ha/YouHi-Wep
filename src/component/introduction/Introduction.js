import React, { Component } from "react";
import "./Introduction.css";

class test extends Component {
  render() {
    return (
      <div className="Introduction">
        <div className="first-container">
          <div className="first-container-flex-items-text">
            <div className="text-header">YouHi</div>
            <div className="text-descrip">
              Video upload filtering application <br />
              designed to provide safe video for minors.
            </div>
          </div>
        </div>
        <div className="tag1">
          <div className="tag2">
            <div className="tag3">
              <div className="tag4">
                <div className="tag5">
                  <div className="elementor-container">
                    <div className="elementor-heading-title">YouHi is</div>
                    <div className="elementor-heading-bar"></div>
                  </div>
                  <div className="elementor-text-editor">
                    유하이는 영상분류 신경망 모델을 이용한 정확한 필터링을
                    제공함으로써
                    <br /> 업로더의 동영상에서 청소년에게 부적합한 내용을 모두
                    걸러냅니다.
                    <br />
                    필터링의 기준은 YouTube 가이드라인의 연령 제한 콘텐츠에
                    명시되어 있는
                    <br />
                    연령 제한 적용 고려 사항이며 자세한 내용은{" "}
                    <a
                      href="https://support.google.com/youtube/answer/2802167?hl=ko"
                      rel="noopener noreferrer "
                      target="_blank"
                    >
                      여기
                    </a>
                    를 참고하세요.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default test;
