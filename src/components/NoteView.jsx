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

  const formatDateTime = (rawDate, rawTime) => {
    if (!rawDate) return rawTime || "";
    let day, month, year;
    const dateParts = rawDate.split(/[\/\-\.]/);
    if (dateParts.length === 3) {
      [day, month, year] = dateParts;
      if (!isNaN(month)) {
        month = new Date(0, month - 1).toLocaleString("default", { month: "long" });
      }
    } else {
      return rawDate + (rawTime ? `.${rawTime}` : "");
    }
    return `${day}.${month}.${year}${rawTime ? `.${rawTime}` : ""}`;
  };

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
      {/* Header */}
      <NoteHeader
        name={name}
        color={color}
        isMobile={isMobile}
        display={display}
        setDisplay={setDisplay}
      />

      {/* Notes + Input (flex column) */}
      <div className="note-body">
        <div className="note-view-container">
          {groupId === id && notes.length > 0 ? (
            notes.map((note, index) => (
              <div className="note-view" key={index}>
                <div className="note">
                  {note?.content}
                  <span className="time">
                    {formatDateTime(note?.date, note?.time)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="example-txt">Start Writing Notes Here!</p>
          )}
        </div>

        {/* Sticky input */}
        <Input id={id} handleNewNote={handleNewNote} />
      </div>
    </div>
  );
};

export default NoteView;
