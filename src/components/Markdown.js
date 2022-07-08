import React, { useState } from "react";
import { useGlobalContext } from "../context";
import timeSince from "../timeTracker";

export default function Markdown(props) {
  const { currUser, currId, actionType, handleSubmit } = useGlobalContext();
  const { label, replyId = null } = props;
  const [text, setText] = useState("");

  const isDisabled = text.length === 0; //***** *//

  function onSubmit(event) {
    event.preventDefault();

    const input = {
      id: Math.random().toString(36).substring(2, 9), // *********//
      content: text,
      createdAt: new Date().toLocaleDateString(), //timeSince(new Date(Date.now()))
      score: 0,
      replyingTo: "",
      user: currUser, // never pass userId to API
      replies: [],
    };

    handleSubmit(input, replyId);
    setText("");
  }
  return (
    <div>
      <form className="add-my-comment" onSubmit={onSubmit}>
        {actionType !== "edit" && (
          <div className="img">
            <img src={currUser.image.webp} alt={currUser.username} />
          </div>
        )}

        {/* changed to textarea */}
        <textarea
          type="text"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {actionType !== "edit" && (
          <button disabled={isDisabled}>{label}</button>
        )}
      </form>
      {/*please style this div such that the button is on the right (click edit to view)*/}
      {actionType === "edit" && (
        <div>
          <button>{label}</button>
        </div>
      )}
    </div>
  );
}
