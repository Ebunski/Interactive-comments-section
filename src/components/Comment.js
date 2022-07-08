import React from "react";
import Replies from "./Replies";
import { useGlobalContext } from "../context";

export default function Comment(props) {
  const { vote, plus, minus, reply, del, edit, currUser } = useGlobalContext();
  const { id, content, createdAt, score, user, replies } = props;

  const tenMinutes = 150000;
  const timeElapsed = new Date() - new Date(createdAt) > tenMinutes;
  const canEdit = user.username === currUser.username && !timeElapsed;

  const replyList = replies.map((x) => <Replies key={x.id} {...x} />);

  /*
=============== 
update styles for num

new comments and
new replies at the end

Comment component
===============
*/

  return (
    <>
      <section className="comment">
        <div className="likes">
          <button className="plus" onClick={() => vote(id, "plus")}>
            <img src={plus} alt="icon-plus" />
          </button>

          <p className="num">{score}</p>
          {/* Changed the className from plus to minus :)*/}
          <button className="minus">
            <img
              src={minus}
              alt="icon-minus"
              onClick={() => vote(id, "minus")}
            />
          </button>
        </div>

        <article className="identity">
          <img className="avatar" src={user.image.png} alt={user.username} />

          <div className="name">{user.username}</div>
        </article>
        <div className="time">{createdAt} </div>

        {/* //conditionally renders if five minutes has not elapsed and it is the user id */}
        {canEdit ? (
          <div>
            <button className="reply-button">
              <img src={del} alt="icon-delete" />
              <span>Delete</span>
            </button>

            <button className="reply-button">
              <img src={edit} alt="icon-edit" />
              <span>Edit</span>
            </button>
          </div>
        ) : (
          <button className="reply-button">
            <img src={reply} alt="icon-reply" />
            <span>Reply</span>
          </button>
        )}

        <p className="content">{content}</p>
      </section>

      {replies.length > 0 && replyList}
    </>
  );
}
