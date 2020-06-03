import React, { Component } from "react";
import nodemailer from "nodemailer";

class Nodemailer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myEmail: "jinipyung@gmail.com",
      name: "",
      email: "",
      message: "",
      emailStatus: "",
    };
  }

  onFilesAdded(evt) {
    const files = evt.target.files.item(0);
    const req = new XMLHttpRequest();

    req.upload.addEventListener("error", (event) => {
      console.log("error!");
    });

    const formData = new FormData();
    formData.append("myfile", files, files.name);

    req.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("success!");
      }
    })
    req.open(
      "POST",
      "http://ec2-13-209-93-181.ap-northeast-2.compute.amazonaws.com/YouHi-Wep/upload.php"
    );
    req.send(formData);
  }

  handleCHange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();

    const myEmail = "jinipyung@gmail.com";

    const transprot = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myEmail,
        pass: "mamba4life!",
      },
    });

    const message = {
      from: myEmail,
      to: "jinipyung@gmail.com",
      subject: `Message sent from ${this.state.name}`,
      text: this.state.message,
      // attachments: [
      //   {
      //     path: "./flow.png",
      //   },
      // ],
    };

    transprot.sendMail(message, function (err) {
      if (err) {
        console.log("Failed to send email.\n");
        return;
      }

      console.log("Email sent.\n");
    });
  };
  render() {
    const { name, email, message, emailStatus } = this.state;
    return (
      <div className="formBlock" onSubmit={this.submitForm}>
        {emailStatus ? emailStatus : null}
        <form>
          <label>
            <input
              type="text"
              value={name}
              onChange={this.handleCHange("name")}
              placeholder="Name"
            />
          </label>
          <label>
            <input
              type="text"
              value={email}
              onChange={this.handleCHange("email")}
              placeholder="Email"
            />
          </label>
          <label>
            <textarea
              type="text"
              value={message}
              onChange={this.handleCHange("message")}
              placeholder="Message"
            ></textarea>
          </label>
          <label>
            <input
              type="file"
              multiple
              onChange={this.onFilesAdded}
            />
          </label>
          <label>
            <input type="submit" className="submitBtn" value="Submit" />
          </label>
        </form>
      </div>
    );
  }
}

export default Nodemailer;
