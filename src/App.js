import React, { useEffect, useState } from "react";
import NoteView from "./components/NoteView";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home"; // 👈 import Home
import "./styles/App.css";
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";

function App() {
  const [noteBtnClick, setNoteBtnClick] = useState(false);
  const [noteGroups, setNoteGroups] = useState(
    localStorage.getItem("noteGroups")
      ? JSON.parse(localStorage.getItem("noteGroups"))
      : []
  );
  const [newNoteGroup, setNewNoteGroup] = useState({
    id: "",
    name: "",
    notes: [],
    color: "",
  });
  const [selectedNote, setSelectedNote] = useState(null); // 👈 make it null initially
  const [isMobile, setIsMobile] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      <div className="App">
        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar
            display={display}
            setDisplay={setDisplay}
            setNoteBtnClick={setNoteBtnClick}
            noteGroups={noteGroups}
            setSelectedNote={setSelectedNote}
            selectedNote={selectedNote}
            isMobile={isMobile}
          />
        </div>

        {/* Main View */}
        <div className="main-view">
          {selectedNote ? (
            <Notes
              display={display}
              setDisplay={setDisplay}
              selectedNote={selectedNote}
              isMobile={isMobile}
              noteBtnClick={noteBtnClick}
            />
          ) : (
            <Home noteBtnClick={noteBtnClick} isMobile={isMobile} />
          )}
        </div>
      </div>

      {/* New Note Group Modal */}
      <CreateNote
        noteBtnClick={noteBtnClick}
        setNoteBtnClick={setNoteBtnClick}
        noteGroups={noteGroups}
        setNewNoteGroup={setNewNoteGroup}
        setNoteGroups={setNoteGroups}
      />
    </React.Fragment>
  );
}

export default App;
