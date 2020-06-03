import React, { Component } from "react";
import UploadElementor from "./upload_elementor/UploadElementor";
import Dropzone from "./dropzone/Dropzone";
import "./Upload.css";
import Progress from "./progress/Progress";
import Text from "./text/Text";
import io from "socket.io-client"

var signedURL;
var account;

// const io = require("socket.io-client");
// const ioClient = io.connect("http://13.209.93.181:4567");
const ioClient = io.connect("http://localhost:4567");

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileName: "",
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      filterButtonDisable: true,

      testState: false,
      account: null,
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
    ioClient.on("number", function (data) {
      this.setState({ account: data });
    }.bind(this));
    ioClient.emit("complete", `hi`); //lambda event
    ioClient.on("upload", function (data) {
      console.log(data);
      this.setState({ filterButtonDisable: false });
    }.bind(this));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file) => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({
        successfullUploaded: true,
        uploading: false,
      });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      const clientID = this.state.account.value;

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

      const xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          signedURL = JSON.parse(this.responseText);
          console.log(signedURL.signed_url);
          const data = new FormData();
          data.append("file", file, `${clientID}.mp4`);

          req.open("PUT", signedURL.signed_url);
          req.send(file);
        }
      });
      xhr.open(
        "GET",
        `https://j2s6y0lok9.execute-api.ap-northeast-2.amazonaws.com/prod/%7Bproxy+7D?name=${clientID}.mp4`
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
    // 로딩 에니메이션 출력
    this.setState({ testState: !this.state.testState });

    const clientID = this.state.account.value;
    // 검열을 시작하라는 이벤트를 등록한다.
    ioClient.emit("filter", `${clientID}`);

    ioClient.on("result", function (data) {
      console.log(data);
      this.setState({ testState: !this.state.testState }, () => {
        this.props.func([true, this.state.account.value]);
      })
    }.bind(this));
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
              this.setState({
                files: [],
                successfullUploaded: false,
                filterButtonDisable: true,
              })
            }
          >
            Clear
          </button>
          <button
            className="Upload-button Upload-filter-button"
            onClick={this.orderFilter}
            disabled={this.state.filterButtonDisable}
          >
            필터
          </button>
        </div>
      );
    } else {
      return (
        <div className="Actions">
          <button
            className="Upload-button Upload-upload-button"
            disabled={this.state.files.length === 0 || this.state.uploading}
            onClick={this.uploadFiles}
          >
            업로드
          </button>
          <button
            className="Upload-button Upload-filter-button"
            disabled={true}
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
            filesLength={this.state.files.length}
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
            <div className="wrap">
              {this.renderActions()}
              <span
                className={`test-icon-container loading-spinner ${
                  this.state.testState ? "" : "hide"
                }`}
              >
                <div className="test-icon loading-spinner-icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
