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

                  {/* Date + time from timestamp */}
                  <div className="note-time">
                    {note?.timestamp
                      ? new Date(note.timestamp).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : ""}
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
