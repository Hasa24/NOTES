import React, { useEffect, useState } from "react";
import "../styles/Home.Module.css";
import homeImg from "../assets/home.png";
import lockImg from "../assets/lock.png";

const Home = ({ noteBtnClick, isMobile }) => {
  const [noteGroups, setNoteGroups] = useState(
    JSON.parse(localStorage.getItem("noteGroups"))
  );

  useEffect(() => {
    setNoteGroups(JSON.parse(localStorage.getItem("noteGroups")));
  }, [noteBtnClick]);

  return (
    <div
      className={`home ${
        noteGroups && isMobile && noteGroups.length > 0 ? "none" : "flex"
      }`}
    >
      <img src={homeImg} alt="Pocket Notes" width="400px" className="home-img" />
      <p className="home-title">Pocket Notes</p>
      <p className="home-des">
        Send and receive messages without keeping your phone online. Use Pocket
        Notes on up to 4 linked devices and 1 mobile phone
      </p>

      <div className="bottom-txt-wrapper">
        <p className="bottom-txt">
          <img
            src={lockImg}
            alt="lock"
            width="14"
            height="14"
            style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
          />
          end-to-end encrypted
        </p>
      </div>
    </div>
  );
};

export default Home;
