import React from "react";
import Navbar from "./component/navbar";
import Upload from "./component/upload";
import Text from "./component/text";
import Video from "./component/video";
import Voice from "./component/voice";

function App() {
//   fetch ("https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=${language}")
//   .then ()

  // const fs = require("fs");
  // const request = require("request");

  // const clientId = "kzs32rf8eb";
  // const clientSecret = "jPe08G68kklqMOHBzjEl1QUMCh6eoTooUWNs5DZH";
  // sibal
  // // language => ?�어 코드 ( Kor, Jpn, Eng, Chn )
  // function stt(language, filePath) {
  //   const url = `https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=${language}`;
  //   const requestConfig = {
  //     url: url,
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/octet-stream",
  //       "X-NCP-APIGW-API-KEY-ID": clientId,
  //       "X-NCP-APIGW-API-KEY": clientSecret
  //     },
  //     body: fs.createReadStream(filePath)
  //   };

  //   request(requestConfig, (err, response, body) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }

  //     console.log(response.statusCode);
  //     console.log(body);
  //   });
  // }

  // stt("Kor", "./theaudio.wav");

  return (
    <div>
      <Navbar/>
      <Upload/>
      <Text/>
      <Video/>
      <Voice/>
    </div>
  )

}

export default App;
