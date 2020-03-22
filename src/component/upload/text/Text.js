import React from "react";

import "./Text.css";

const Text = () => {
  return (
    <div className="text-wrapper">
      <div className="text-title">도움말 및 제안사항</div>
      <div className="text-box">
        <ul>
          <li>
            필터된 내용이 존재하고, 이를 포함한 동영상의 업로드를 원한다면 해당
            동영상에 연령 제한을 적용해야 합니다.
          </li>
          <li>
            필터링에 소요되는 시간은 약 10분이며, 사용자의 인터넷 환경에 따라 달라질 수 있습니다.
          </li>
          <li>
            업로드 파일의 형식은 .avi와 .mp4로 제한합니다.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Text;
