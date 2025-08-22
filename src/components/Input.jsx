import React from "react";
import "../styles/Input.Module.css";

const Input = ({ id, handleNewNote }) => {
  const [note, setNote] = React.useState("");

  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  const handleSendClick = () => {
    if (!note.trim()) return; // prevent empty notes

    const now = new Date();

    const newNote = {
      content: note,
      date: now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }), // e.g. 22 Aug 2025
      time: now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }), // e.g. 11:42 AM
      id: Math.floor(Math.random() * 1000),
    };

    handleNewNote(newNote);

    const notesGroup = JSON.parse(localStorage.getItem("noteGroups")) || [];
    const groupIndex = notesGroup.findIndex((group) => group.id === id);

    if (groupIndex === -1) {
      console.error(`Group with ID ${id} not found`);
      return;
    }

    notesGroup[groupIndex].notes.push(newNote);
    localStorage.setItem("noteGroups", JSON.stringify(notesGroup));

    setNote("");
  };

  return (
    <div className="input-container">
      <div className="input-div flex flex-row">
        <textarea
          name="note"
          cols="30"
          rows="6"
          className="note-input"
          placeholder="Enter your text here..."
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendClick();
            }
          }}
          value={note}
        ></textarea>

        {/* Send Button */}
        <svg
          className="send-btn"
          width="25"
          height="29"
          viewBox="0 0 35 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleSendClick}
          style={{
            cursor: note.trim() ? "pointer" : "not-allowed",
          }}
        >
          <path
            d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z"
            fill={note.trim() ? "#001F8B" : "#ABABAB"}
          />
        </svg>
      </div>
    </div>
  );
};

export default Input;
