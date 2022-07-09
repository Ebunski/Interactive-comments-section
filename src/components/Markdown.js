import React, { useState } from "react";
import { useGlobalContext } from "../context";
// import timeSince from "../timeTracker";

export default function Markdown(props) {
  const { currUser, currId, actionType, handleAdd, handleEdit, changeAction } =
    useGlobalContext();
  const { label, replyId = null, initialText = "" } = props;
  const [text, setText] = useState(initialText);

  /*----------------------------------FUNCTIONS--------------------------------*/

  const isDisabled = text.length === 0; //***** *//

  function handleSubmit(event) {
    event.preventDefault();

    if (actionType === "edit") {
      handleEdit(currId, text);
      changeAction(null);
    } else {
      const input = {
        id: Math.random().toString(36).substring(2, 9), // *********//
        content: text,
        createdAt: new Date(), //timeSince(new Date(Date.now()))
        score: 0,
        replyingTo: "",
        user: currUser, // never pass userId to API
        replies: [],
      };

      handleAdd(input, replyId);
      setText("");
    }
  }

  /* 
    ============
      MARKDOWN
    =============

  */
  return (
    <div>
      {/* 
      ============
      You would create two classes for the form:
      1) For the normal markdown with grid - 3 columns
      2) 2nd one for the edit state: one column - called *******"edit-form"********
      - i created a div wrapping the button for edit - you can use it to position the button on the right 

      =============
      */}

      <form
        className={initialText !== "" ? `edit-form` : `add-my-comment`}
        //because initialText is empty in commenting state
        onSubmit={handleSubmit}
      >
        {/* User image not displayed in edit state */}
        {initialText === "" && (
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
        {initialText === "" && <button disabled={isDisabled}>{label}</button>}

        {/*please style this div such that the button is on the right (click edit to view)*/}
        {initialText !== "" && (
          <div>
            <button>{label}</button>
          </div>
        )}
      </form>
    </div>
  );
}
