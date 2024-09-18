import React from "react";
import "../styles/Note.css";

// Not will take the note itself and the onDelete FCT
function Note({ note, onDelete }) {
  // this will not show all info about date, but just what the date was when the note was created
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
