import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./upload.css";

const Upload = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="box-wrapper">
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
      <div className="text-wrapper">
        <div>주의 사항을 입력하3 </div>
        <div>쓸내용 있으면 입력하3</div>
        <div>아 잠마렵다</div>
      </div>
    </div>
  );
};

export default Upload;
