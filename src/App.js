import React from "react";

import Comment from "./components/Comment";
import Markdown from "./components/Markdown";
import Modal from "./components/Modal";
import { useGlobalContext } from "./context";
import { useScrollAnimation } from "./custom";

export default function App() {
  const { comments } = useGlobalContext();
  useScrollAnimation();

  const commentList = comments.map((x) => <Comment key={x.id} {...x} />);

  return (
    <main className="container">
      <section className="comment-section">
        {commentList}
        <Markdown label="Send" />
      </section>
      <Modal />
    </main>
  );
}

//we need to pass current userId to compare it with the various comments so we can add extra features
//if this was a flat array,
//Root comment: we would have to create a filter method to filter the root comments from the replies.
//Replies: we would need another filter for those that are children of a particular root comment while mapping (compares the reference to the root id we are mapping(x))
// we would also need to use a sort function to arrange in chronological order.
