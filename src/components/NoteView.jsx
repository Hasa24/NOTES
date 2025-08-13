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
    // Try to parse "DD/MM/YYYY" or similar
    let day, month, year;
    const dateParts = rawDate.split(/[\/\-\.]/); // split by / - or .
    if (dateParts.length === 3) {
      [day, month, year] = dateParts;
      // Convert month number to name if it's numeric
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
      className="note-view-container"
      style={{ display: isMobile && !display ? "none" : "" }}
    >
      <NoteHeader
        name={name}
        color={color}
        isMobile={isMobile}
        display={display}
        setDisplay={setDisplay}
      />

      {groupId === id && notes.length > 0 ? (
        notes.map((note, index) => (
          <div className="note-view" key={index}>
            <div className="note">{note?.content}</div>
            <div className="time-container">
              {formatDateTime(note?.date, note?.time)}
            </div>
          </div>
        ))
      ) : (
        <p className="example-txt">Start Writing Notes Here!</p>
      )}

      <Input id={id} handleNewNote={handleNewNote} />
    </div>
  );
};

export default NoteView;
