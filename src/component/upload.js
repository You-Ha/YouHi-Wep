import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./upload.css";

const Upload = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    // <div className ="box-wrapper">
      <div {...getRootProps()} className="upload-wrapper">
        <input {...getInputProps()} className="upload-box" />
        {isDragActive ? (
          <p>파일 여기다 두셈</p>
        ) : (
          <div className="upload-box">
            파일 여기로 끌고 오거나 클릭해서 파일 선택하셈
          </div>
        )}
      </div>
    // </div>
  );
  // return (
  //     <div className="filebox">
  //         <div className = "upload-title">동영상 업로드 하기</div>
  //         <label for="ex_file">업로드</label>
  //         <input type="file" id="ex_file"/>
  //     </div>
  // );
};

export default Upload;
