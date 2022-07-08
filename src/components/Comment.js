import React from "react";
import { useGlobalContext } from "../context";
import Markdown from "./Markdown";

export default function Comment(props) {
  const {
    //functions
    vote,
    changeAction,
    handleDelete,

    //icons
    plus,
    minus,
    reply,
    del,
    edit,

    //states
    currUser,
    currId,
    actionType,
  } = useGlobalContext();
  const {
    id,
    content,
    createdAt,
    score,
    user,
    replies = [],
    replyingTo = "",
    parentId = null, //used to place the replies
  } = props;

  // const fiveMinutes = 300000;
  // const timeElapsed = new Date() - new Date(createdAt) > fiveMinutes;
  const authentication = user.username === currUser.username;
  const canEdit = authentication; //{&& !timeElapsed;

  const replyId = parentId ? parentId : id; //passed to markdown to place reply

  const replyList = replies.map((x) => (
    <Comment key={x.id} {...x} replyingTo={x.replyingTo} parentId={id} />
  )); //-----------***recursive***---------//

  /*
=============== 
update styles for num


Comment component
===============
*/

  return (
    <>
      <article className="comment">
        <div className="likes">
          <button className="plus" onClick={() => vote(id, "plus")}>
            <img src={plus} alt="icon-plus" />
          </button>
          {/*----- button not fully functional for replies ----*/}
          <p className="num">{score}</p>
          <button className="plus">
            <img
              src={minus}
              alt="icon-minus"
              onClick={() => vote(id, "minus")}
            />
          </button>
        </div>

        <div className="identity">
          <img className="avatar" src={user.image.png} alt={user.username} />
          <div className="name">{user.username}</div>
          {/* ---style this----(displays if its current user)*/}
          {authentication && <button>you</button>}
        </div>
        <div className="time">{createdAt} </div>

        {/* renders edit and delete if five minutes has not elapsed and it is the user id */}
        {canEdit ? (
          <div>
            <button className="reply-button" onClick={() => handleDelete(id)}>
              <img src={del} alt="icon-delete" />
              <span>Delete</span>
            </button>

            <button
              className="reply-button"
              onClick={() => changeAction(id, "edit")}
            >
              <img src={edit} alt="icon-edit" />
              <span>Edit</span>
            </button>
          </div>
        ) : (
          // ---------------otherwise renders reply button--------------------//
          <button
            className="reply-button"
            onClick={() => changeAction(id, "reply")}
          >
            <img src={reply} alt="icon-reply" />
            <span>Reply</span>
          </button>
        )}
        {/*--------Here, displays the markdown if its in diting state else displays the comment-content----*/}
        <div className="content">
          {replyingTo !== "" && <span>@{replyingTo} </span>} {/* if a reply */}
          {actionType === "edit" && currId === id ? (
            <Markdown label="update" />
          ) : (
            <p>{content}</p>
          )}
        </div>
      </article>

      {/*---------renders markdown when reply is clicked and id is ID of the card------------------*/}
      {actionType === "reply" && currId === id && (
        <Markdown label="reply" replyId={replyId} />
      )}

      {/*--------------replies ---------------------------*/}
      {replies.length > 0 && <div className="reply-section">{replyList}</div>}
    </>
  );
}
