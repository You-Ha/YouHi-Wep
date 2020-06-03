import React, {useState} from "react";
import Introduction from "./component/introduction/Introduction";
import Upload from "./component/upload/Upload";
import Filter from './component/filter/Filter';
import Footer from './component/footer/footer';
import Loginmodal from "./component/filter/exception/exception";
import Feedback from "./component/feedback/Feedback";
import "./App.css";

function Home() {
  const [showResult, setShowResult] = useState([false, null]);

  return (
    <div className="App">
      <div className="Total">
        <Introduction />
        <Upload func={setShowResult} />
        <Filter showResult={showResult} />
      </div>
      {/* {Loginmodal()} */}
      {/* <Feedback /> */}
      <Footer />
    </div>
  );
}

export default Home;
