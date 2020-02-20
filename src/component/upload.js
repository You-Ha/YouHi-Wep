import React from "react";
import "./upload.css";

const Upload=()=> {
    return (
        <div className="filebox">
            <div className = "upload-title">동영상 업로드 하기</div>
            <label for="ex_file">업로드</label>
            <input type="file" id="ex_file"/>
        </div>
    );
};

export default Upload;