import React from "react";

import "./Text.css";

const Text = () => {
  return (
    <div className="text-wrapper">
      <div className="text-title">도움말 및 제안사항</div>
      <div className="text-box">
        <ul>
          <li>
            필터링에 소요되는 시간은 약 10분이며, 사용자의 인터넷 환경에 따라
            달라질 수 있습니다.
          </li>
          <li>업로드 파일의 형식은 .avi와 .mp4로 제한합니다.</li>
          <li>
            <div className="emphasis">연령제한 옵션</div>을 선택하면 필터링없이 연령제한이 적용된 컨텐츠로
            업로드됩니다.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Text;
