import React, { useState } from "react";
import { useGlobalContext } from "../context";

export default function Markdown(props) {
  const { currUser, currId, actionType, handleAdd, handleEdit, changeAction } =
    useGlobalContext();
  const { label, replyId = null, initialText = "" } = props;
  const [text, setText] = useState(initialText);

  // Added this path to the front all images.... :) :) :)
  const PUBLIC_URL = process.env.PUBLIC_URL + "/";

  /*----------------------------------FUNCTIONS--------------------------------*/
  const actualText = text.replace(/\s/g, "");
  const isDisabled = actualText.length <= initialText.length; //***** *//

  function handleSubmit(event) {
    event.preventDefault();

    if (actionType === "edit" && text !== "") {
      handleEdit(currId, text);
      changeAction(null);
      return;
    }
    if (!isDisabled) {
      const input = {
        id: Math.random().toString(36).substring(2, 9), // *********//
        content: text.slice(initialText.length), //removes tag
        createdAt: new Date(), //timeSince(new Date(Date.now()))
        score: 0,
        replyingTo: initialText.slice(1), //removes @ from tag
        user: currUser, // never pass userId to API
        replies: [],
      };

      handleAdd(input, replyId);
      setText("");
      changeAction(null);
    }
  }

  /* 
    ============
      MARKDOWN
    =============

  */
  return (
    <div>
      <form
        className={
          initialText === "" || actionType !== "edit"
            ? `add-my-comment`
            : `edit-form`
        }
        onSubmit={handleSubmit}
      >
        {/* User image not displayed in edit state or if the textarea is not empty */}
        {(initialText === "" || actionType !== "edit") && (
          <div className="img">
            {/* give img a class and set object-fit:contain */}
            <img
              src={PUBLIC_URL + currUser.image.webp}
              alt={currUser.username}
            />
          </div>
        )}

        <textarea
          type="text"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/*----------crreate a disabled class called "btn-disabled"--------- */}
        {actionType !== "edit" && (
          <button className={isDisabled ? "btn-disabled" : ""}>{label}</button>
        )}

        {actionType === "edit" && (
          <div>
            <button className={text === "" ? "btn-disabled" : ""}>
              {label}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
