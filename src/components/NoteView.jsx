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
    if (groupIndex === -1) return;

    const group = noteGroups[groupIndex];
    setGroupId(group.id);
    setNotes(group.notes || []);
  }, [id]);

  // Robust formatter: works with both old (date/time) and new (timestamp) notes
  const formatNoteDateTime = (note) => {
    if (!note) return "";

    if (note.timestamp) {
      const d = new Date(note.timestamp);
      if (!isNaN(d)) {
        return d.toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      }
    }

    if (note.date && note.time) return `${note.date} • ${note.time}`;
    if (note.date) return note.date;
    if (note.time) return note.time;
    return "";
  };

  const handleNewNote = (value) => {
    setNotes((prev) => {
      const updated = [...prev, value];
      const noteGroups = JSON.parse(localStorage.getItem("noteGroups")) || [];
      const groupIndex = noteGroups.findIndex((g) => g.id === id);
      if (groupIndex !== -1) {
        noteGroups[groupIndex].notes = updated;
        localStorage.setItem("noteGroups", JSON.stringify(noteGroups));
      }
      return updated;
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
                  <div className="note-time">{formatNoteDateTime(note)}</div>
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
