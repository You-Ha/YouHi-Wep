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
import UploadElementor from "./upload_elementor/UploadElementor";
import Dropzone from "./dropzone/Dropzone";
import "./Upload.css";
import Progress from "./progress/Progress";
import Text from "./text/Text";

var signedURL;
var account;
const io = require("socket.io-client");
const ioClient = io.connect("http://13.209.93.181:4567");

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileName: "",
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      successfullFiltered: false,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.orderFilter = this.orderFilter.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState((prevState) => ({
      files: prevState.files.concat(files),
    }));
    
    ioClient.emit("ready", `${files[0].name}`);
    // this.setState({ fileName: `${files[0].name}`});
    // console.log(this.state.fileName);
    ioClient.on("number", function(data) {
      account = data;
    });
    ioClient.on("upload", function (data) {
        console.log(data);
        // 여기서 filter button이 활성화되어야 한다.
    });
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file) => {
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

  // uploadFileToS3(file) {
  //   const AWS = require("aws-sdk");
  //   const BUCKET_NAME = "s3-uploadtest3";
  //   const s3 = new AWS.S3({
  //     region: "ap-northeast-2"
  //   });
  //   const params = {
  //     Bucket: BUCKET_NAME,
  //     ContentType: file.type,
  //     Key: file.name,
  //     Body: file,
  //     ACL: "public-read"
  //   };
  //   // copy = this.state.uploadProgress;
  //   return new Promise((resolve, reject) => {
  //     s3.upload(params, function(err, data) {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log("1");
  //       console.log(`File uploaded successfully.`);
  //     }).on("httpUploadProgress", function(event) {
  //       console.log(
  //         "Uploaded :: " + parseInt((event.loaded * 100) / event.total) + "%"
  //       );

  //       console.log(event.loaded);
  //       console.log(event.total);
  //       if (event.loaded === event.total) {
  //         const copy = { ...this.state.uploadProgress };
  //         // const copy = Object.assign({}, this.state.uploadProgress);
  //         // const copy = JSON.parse(JSON.stringify(this.state.uploadProgress));
  //         copy[file.name] = {
  //           state: "done",
  //           percentage: 100
  //         };
  //         this.setState({ uploadProgress: copy });
  //         console.log("complete");
  //         resolve();
  //       } else if (event.loaded < event.total) {
  //         const copy = { ...this.state.uploadProgress };
  //         // const copy = Object.assign({}, this.state.uploadProgress);
  //         // const copy = JSON.parse(JSON.stringify(this.state.uploadProgress));
  //         copy[file.name] = {
  //           state: "pending",
  //           percentage: (event.loaded / event.total) * 100
  //         };
  //         this.setState({ uploadProgress: copy });
  //         console.log("progress");
  //       }
  //       console.log(1);
  //     });
  //   });
  // }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      // const formData = new FormData();
      // formData.append("file", file, file.name);

      // req.open(
      //   "POST",
      //   "https://0pwsx3hkw2.execute-api.ap-northeast-2.amazonaws.com/prod/fileupload"
      // );
      // req.send(formData);

      // **socket connection-1**
      // const io = require("socket.io-client"),
      //   ioClient = io.connect("http://3.17.20.240:1234");
      // ioClient.emit("msg", "x");

      // **socket connection-1**
      //   const io = require("socket.io-client"),
      //   ioClient = io.connect("http://54.180.103.231:1234");
      //   ioClient.emit("msg", "sibar");
      //   ioClient.on('msg', function(data) {
      //     console.log(data);
      //   });

      // **aws s3 upload**
      // this.uploadFile(file);

      ////////////////////////////////////////////////////////////////////////////////

      var xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          // console.log(this.responseText);
          signedURL = JSON.parse(this.responseText);
          console.log(signedURL.signed_url);
          console.log(signedURL.requestId);
          var data = new FormData();
          data.append("file", file, `${account.value}`);

          // req.addEventListener("readystatechange", function() {
          //   if (this.readyState === 4) {
          //     console.log(this.response.body);
          //   }
          // });
          req.open(
            "PUT",
            // "https://g1ngfl8yke.execute-api.ap-northeast-2.amazonaws.com/prod/"
            signedURL.signed_url
          );
          // req.setRequestHeader('ID', 'inpyeong');
          // req.setRequestHeader("content-type", "application/xml")
          req.send(file);
        }
      });
      xhr.open(
        "GET",
        `https://j2s6y0lok9.execute-api.ap-northeast-2.amazonaws.com/prod/%7Bproxy+7D?name=${account.value}`
      );
      xhr.send();
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
            src={require("../../img/check_circle.png")}
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  }

  orderFilter() {
    // 검열을 시작하라는 메시지를 소켓 서버에게 보낸다.
    // console.log(this.state.fileName);
    console.log(`${account.value}`);
    ioClient.emit("filter", `${account.value}`);
    ioClient.on("result", function(data) {
      console.log(data);
    });
    // 검열이 끝나면 소켓 서버로부터 수신받는 코드, 검열 확인 박스를 활성화 시켜야함.
    // ioClient.on("??", function(data) {
    //   this.props.func();
    // });
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <div className="Actions">
          <button
            className="Upload-button Upload-upload-button"
            onClick={() =>
              this.setState({ files: [], successfullUploaded: false })
            }
          >
            Clear
          </button>
          <button className="Upload-button Upload-filter-button" onClick={this.orderFilter}>필터</button>
        </div>
      );
    } else {
      return (
        <div className="Actions">
          <button
            className="Upload-button Upload-upload-button"
            disabled={this.state.files.length < 0 || this.state.uploading}
            onClick={this.uploadFiles}
          >
            업로드
          </button>
          <button
            className="Upload-button Upload-filter-button"
            disabled={this.state.successfullFiltered}
          >
            필터
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Upload-wrapper">
        <UploadElementor />
        <div className="Content">
          <Dropzone
            onFilesAdded={this.onFilesAdded}
            disabled={this.state.uploading || this.state.successfullUploaded}
          />
          <div className="Upload-text-buttons-container">
            <Text />
            <div className="Files">
              {this.state.files.map((file) => {
                return (
                  <div key={file.name} className="Row">
                    <span className="Filename">{file.name}</span>
                    {this.renderProgress(file)}
                  </div>
                );
              })}
            </div>
            {this.renderActions()}
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
