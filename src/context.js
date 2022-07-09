import React from "react";
import { useState, useContext, useEffect } from "react";
import data from "./data.json";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";
import reply from "./images/icon-reply.svg";
import del from "./images/icon-delete.svg";
import edit from "./images/icon-edit.svg";

const AppContext = React.createContext();

function getData() {
  let appData = JSON.parse(localStorage.getItem("comments"));
  if (appData) return appData;
  return data.comments;
}

export function AppProvider({ children }) {
  const currUser = data.currentUser;
  const [comments, setComments] = useState(getData());
  const [isModalOpen, setIsModalOpen] = useState(false);
  /*for replying,deleting,rendering an item in list */
  const [currId, setCurrId] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(
    () => localStorage.setItem("comments", JSON.stringify(comments)),
    [comments]
  );

  function vote(id, type) {
    const voted = comments.map((x) => {
      if (x.id === id) {
        if (type === "plus") return { ...x, score: x.score + 1 };
        if (type === "minus" && x.score !== 0)
          return { ...x, score: x.score - 1 };
      }
      return {
        ...x,
        replies: x.replies.map((x) => {
          if (x.id === id) {
            if (type === "plus") return { ...x, score: x.score + 1 };
            if (type === "minus" && x.score !== 0)
              return { ...x, score: x.score - 1 };
          }
          return x;
        }),
      };
    });
    setComments(voted);
  }

  function handleAdd(text, parentId) {
    if (parentId) {
      const newComments = comments.map((x) =>
        x.id === parentId ? { ...x, replies: [...x.replies, text] } : x
      );
      return setComments(newComments);
    }
    setComments((prev) => [...prev, text]);
    setCurrId(null);
  }

  function handleDelete(id) {
    setIsModalOpen(true);
    setCurrId(id);
  }

  function confirm(decision) {
    let deleted = comments
      .map((x) => ({ ...x, replies: x.replies.filter((x) => x.id !== currId) }))
      .filter((x) => x.id !== currId);

    decision && setComments(deleted);
    setIsModalOpen(false);
    setCurrId(null);
  }
  console.log(new Date().getMinutes());

  function handleEdit(id, text) {
    const updatedComments = comments.map((x) =>
      x.id === id
        ? { ...x, content: text }
        : {
            ...x,
            replies: x.replies.map((x) =>
              x.id === id ? { ...x, content: text } : x
            ),
          }
    );

    setComments(updatedComments);
  }

  function changeAction(id, type) {
    setCurrId(id);
    setActionType(type);
  }

  return (
    <AppContext.Provider
      value={{
        plus,
        minus,
        edit,
        del,
        reply,

        comments,
        isModalOpen,
        currUser,
        currId,
        actionType,

        vote,
        handleAdd,
        handleDelete,
        handleEdit,
        confirm,
        changeAction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
