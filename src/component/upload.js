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
      <div id="upload-title">영상 업로드</div>
      <div {...getRootProps()} className="upload-wrapper">
        <input {...getInputProps()} className="upload-box" />
        {isDragActive ? (
          <p>파일을 드래그 해주세요.</p>
        ) : (
          <div id="upload-box"></div>
        )}
      </div>
    </div>
  );
};

export default Upload;
