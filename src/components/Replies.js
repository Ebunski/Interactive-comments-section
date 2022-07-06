import React from "react";
import { useGlobalContext } from "../context";

export default function Replies(props) {
  const { plus, minus, reply, del, edit, vote, currUser } = useGlobalContext();
  const { id, content, createdAt, score, user, replyingTo } = props;

  return (
    <div className="reply-section">
      <div className="hr separator"></div>
      <div className="content-side">
        <div className="reply comment">
          <div className="likes">
            <button className="plus">
              <img src={plus} alt="icon-plus" />
            </button>
            <div className="num">{score}</div>
            <button className="plus">
              <img src={minus} alt="icon-minus" />
            </button>
          </div>
          <div className="identity">
            <img
              className="avatar img"
              src={user.image.png}
              alt={user.username}
            />

            <div className="name">{user.username}</div>
          </div>
          <div className="time">{createdAt}</div>
          <button className="reply-button">
            <img src={reply} alt="icon-reply" />
            <span>Reply</span>
          </button>
          <p className="content">
            <span>@{replyingTo} </span>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
