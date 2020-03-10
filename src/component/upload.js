// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import "./upload.css";
// //"http://ec2-13-58-52-57.us-east-2.compute.amazonaws.com/upload.php"

// // var holder = document.getElementById("holder");
// // var progress = document.getElementById("uploadprogress");

// // holder.ondragover = function() {
// //   this.className = "hover";
// //   return false;
// // };
// // holder.ondragend = function() {
// //   this.className = "";
// //   return false;
// // };
// // holder.ondrop = function(e) {
// //   this.className = "";
// //   e.preventDefault();
// //   readfiles(e.dataTransfer.files);
// // };

// // function readfiles(files) {
// //   // 파일 미리보기
// //   previewfile(files[0]);

// //   var formData = new FormData();
// //   formData.append("upload", files[0]);

// //   var xhr = new XMLHttpRequest();
// //   xhr.open("POST", "./devnull.php");
// //   xhr.onload = function() {
// //     progress.value = 100;
// //   };

// //   xhr.upload.onprogress = function(event) {
// //     if (event.lengthComputable) {
// //       var complete = ((event.loaded / event.total) * 100) | 0;
// //       progress.value = progress.innerHTML = complete;
// //     }
// //   };

// //   xhr.send(formData);
// // }

// // function previewfile(file) {
// //   var reader = new FileReader();
// //   reader.onload = function(event) {
// //     var image = new Image();
// //     image.src = event.target.result;
// //     image.width = 250; // a fake resize
// //     holder.appendChild(image);
// //   };

// //   reader.readAsDataURL(file);
// // }

// function sendRequest(file) {
//   return new Promise((resolve, reject) => {
//    const req = new XMLHttpRequest();
 
//    req.upload.addEventListener("progress", event => {
//     if (event.lengthComputable) {
//      const copy = { ...this.state.uploadProgress };
//      copy[file.name] = {
//       state: "pending",
//       percentage: (event.loaded / event.total) * 100
//      };
//      this.setState({ uploadProgress: copy });
//     }
//    });
    
//    req.upload.addEventListener("load", event => {
//     const copy = { ...this.state.uploadProgress };
//     copy[file.name] = { state: "done", percentage: 100 };
//     this.setState({ uploadProgress: copy });
//     resolve(req.response);
//    });
    
//    req.upload.addEventListener("error", event => {
//     const copy = { ...this.state.uploadProgress };
//     copy[file.name] = { state: "error", percentage: 0 };
//     this.setState({ uploadProgress: copy });
//     reject(req.response);
//    });
 
//    const formData = new FormData();
//    formData.append("file", file, file.name);
 
//    req.open("POST", "http://ec2-13-58-52-57.us-east-2.compute.amazonaws.com/upload.php");
//    req.send(formData);
//   });
//  }

// const Upload = () => {
//   const onDrop = useCallback(acceptedFiles => {
//     // Do something with the files
//     //readfiles(acceptedFiles);
//     sendRequest(acceptedFiles);
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className="box-wrapper">
//       <div id="upload-title">영상 업로드</div>
//       <div id="container" {...getRootProps()} className="upload-wrapper">
//         <input {...getInputProps()} className="upload-box" />
//         {isDragActive ? (
//           <p>파일을 드래그 해주세요.</p>
//         ) : (
//           <div id="upload-box"></div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Upload;


import React, { Component } from "react";
import Dropzone from "./dropzone/Dropzone";
import "./upload.css";
import Progress from "./progress/Progress";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("upload", file, file.name);

      req.open("POST", "http://ec2-13-58-52-57.us-east-2.compute.amazonaws.com/upload.php");
      req.send(formData);
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;