import React from "react";
import Comment from "./components/Comment";
import Markdown from "./components/Markdown";
import { useGlobalContext } from "./context";

export default function App() {
  const { comments } = useGlobalContext();
  //we need to pass current userId to compare it with the various comments so we can add extra features
  //if this was a flat array,
  //Root comment: we would have to create a filter method to filter the root comments from the replies.
  //Replies: we would need another filter for those that are children of a particular root comment while mapping (compares the reference to the root id we are mapping(x))
  // we would also need to use a sort function to arrange in chronological order.
  const commentList = comments.map((x) => <Comment key={x.id} {...x} />);
  return (
    // container not centralised- margin auto maybe? or flex sha
    <ul className="container">
      <li className="comment-section">
        {commentList}
        <Markdown type="write" label="Send" />
      </li>
    </ul>
  );
}
