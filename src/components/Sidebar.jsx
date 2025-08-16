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
      style={{
        display: isMobile && display ? "none" : "flex", // fix duplicate display issue
      }}
    >
      {/* Sidebar Header */}
      <div className="sidebar-heading">
        <p className="sidebar-title">Pocket Notes</p>
      </div>

      {/* Notes List */}
      <div className="sidebar-notes-list">
        {noteGroups && noteGroups.length > 0 ? (
          noteGroups.map((note, index) => {
            const notes = note.name.trim().split(/\s+/);
            const initials = notes
              .map((word) => word.charAt(0).toUpperCase())
              .join("");

            return (
              <div
                className={`sidebar-note-element ${
                  note.id === selectedNote?.id ? "note-selected" : ""
                }`}
                key={index}
                onClick={() => handleSelect(note)}
              >
                <div
                  className="circle note-list-icon"
                  style={{ backgroundColor: note.color }}
                >
                  {initials}
                </div>
                <p className="sidebar-note-title">{note.name}</p>
              </div>
            );
          })
        ) : (
          <p className="no-groups-text">No groups yet.</p>
        )}
      </div>

      {/* Plus Button */}
      <div className="sidebar-footer">
        <button className="add-btn" onClick={() => setNoteBtnClick(true)}>
          +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
