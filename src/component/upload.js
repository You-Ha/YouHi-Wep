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
          <p>파일을 드래그 해주세요.</p>
        ) : (
          <div className="upload-box">
            파일을 여기로 끌고 오거나 클릭해서 파일 선택하세요.
          </div>
        )}
      </div>
      <div className="text-wrapper">
        <div>주의 사항을 입력하세요. </div>
      </div>
    </div>
  );
};

export default Upload;
