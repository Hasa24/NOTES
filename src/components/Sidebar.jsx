import React from "react";
import "../styles/Sidebar.Module.css";

const Sidebar = ({
  setNoteBtnClick,
  noteGroups,
  setSelectedNote,
  selectedNote,
  isMobile,
  display,
  setDisplay,
}) => {
  const handleSelect = (note) => {
    if (isMobile) {
      setDisplay(true);
    }
    setSelectedNote(note);
  };

  return (
    <div
      className={`sidebar ${isMobile ? "mob-sidebar" : ""}`}
      style={{ display: isMobile && display ? "none" : "" }}
    >
      {/* Sidebar Title */}
      <div className="sidebar-heading">
        <p className="sidebar-title">Pocket Notes</p>
      </div>

      {/* Notes List */}
      <div className="sidebar-notes-list flex flex-col justify-start">
        {noteGroups && noteGroups.length > 0 ? (
          noteGroups.map((note, index) => {
            const notes = note.name.split(" ");
            const firstLetters = notes.map((word) => word.charAt(0));
            return (
              <div
                className={`sidebar-note-element flex flex-row justify-start ${
                  note.id === selectedNote.id ? "note-selected" : ""
                }`}
                key={index}
                onClick={() => handleSelect(note)}
              >
                <div
                  className="circle note-list-icon flex"
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: note.color,
                  }}
                >
                  {firstLetters[0]}
                  {firstLetters[firstLetters.length - 1]}
                </div>
                <p className="sidebar-note-title">{note.name}</p>
              </div>
            );
          })
        ) : (
          <p className="no-groups-text">No groups yet.</p>
        )}
      </div>

      {/* Fixed Plus Button at Bottom Right */}
      <div className="add-btn-container">
        <button
          className="create-notes-btn"
          onClick={() => setNoteBtnClick(true)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
