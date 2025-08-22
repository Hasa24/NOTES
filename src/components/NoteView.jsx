import React from "react";
import "../styles/NoteView.Module.css";
import "../styles/NoteHeader.Module.css";
import "../styles/Input.Module.css";

import NoteHeader from "./NoteHeader";
import Input from "./Input";

const NoteView = ({ name, color, id, isMobile, display, setDisplay }) => {
  const [notes, setNotes] = React.useState([]);
  const [groupId, setGroupId] = React.useState("");

  React.useEffect(() => {
    const noteGroups = JSON.parse(localStorage.getItem("noteGroups")) || [];
    const groupIndex = noteGroups.findIndex((group) => group.id === id);

    if (groupIndex === -1) {
      console.error(`Group with ID ${id} not found`);
      return;
    }

    const group = noteGroups[groupIndex];
    setGroupId(group.id);
    setNotes(group.notes || []);
  }, [id]);

  // Format date
  const formatDate = (rawDate) => {
    if (!rawDate) return "";
    const dateParts = rawDate.split(/[-\/\.]/);
    let year, month, day;

    if (dateParts[0].length === 4) {
      [year, month, day] = dateParts; // YYYY-MM-DD
    } else {
      [day, month, year] = dateParts; // DD/MM/YYYY
    }

    year = parseInt(year, 10);
    month = parseInt(month, 10) - 1; // JS months 0-11
    day = parseInt(day, 10);

    const dateObj = new Date(year, month, day);
    return dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (rawTime) => {
    if (!rawTime) return "";
    const timeParts = rawTime.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    const dateObj = new Date(1970, 0, 1, hours, minutes);
    return dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Add new note
  const handleNewNote = (value) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, value];
      const noteGroups = JSON.parse(localStorage.getItem("noteGroups")) || [];
      const groupIndex = noteGroups.findIndex((group) => group.id === id);
      if (groupIndex !== -1) {
        noteGroups[groupIndex].notes = updatedNotes;
        localStorage.setItem("noteGroups", JSON.stringify(noteGroups));
      }
      return updatedNotes;
    });
  };

  return (
    <div
      className="note-view-wrapper"
      style={{ display: isMobile && !display ? "none" : "" }}
    >
      <NoteHeader
        name={name}
        color={color}
        isMobile={isMobile}
        display={display}
        setDisplay={setDisplay}
      />

      <div className="note-body">
        <div className="note-view-container">
          {groupId === id && notes.length > 0 ? (
            notes.map((note, index) => (
              <div className="note-view" key={index}>
                <div className="note">
                  <div className="note-content">{note?.content}</div>

                  {/* Unified date + time row */}
                  <div className="note-time">
                    {formatDate(note?.date)}{" "}
                    <span className="dot">•</span>{" "}
                    {formatTime(note?.time)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="example-txt">Start Writing Notes Here!</p>
          )}
        </div>

        <Input id={id} handleNewNote={handleNewNote} />
      </div>
    </div>
  );
};

export default NoteView;
