import React from "react";
import emailjs from "emailjs-com";
import "./login.css";

export default function Login() {
  function sendEmail(e) {
    e.preventDefault();
    console.log(e.target);
    emailjs
      .sendForm(
        "sungsoo",
        "template_Q0qHMblF",
        e.target,
        "user_nns6wf4RlzAWsOeqnBEbr"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  return (
    <form className="login-style" method="post" onSubmit={sendEmail}>
      {" "}
      <input type="hidden" name="contact_number" />
      <div className="login-name">
        <label>Name </label> <input type="text" name="user_name" />
      </div>
      <div className="login-Email">
        <label>Email </label> <input type="email" name="user_email" />
      </div>
      <div className="fileAttachment">
        <label>Attach file:</label>
        <input type="file" name="user_file" />
      </div>
      <div className="login-message">
        <label>Message </label> <textarea name="message" />
      </div>
      <input className="login-send" size="30" type="submit" value="Submit" />{" "}
    </form>
  );
}
