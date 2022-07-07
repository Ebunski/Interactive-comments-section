import React from "react";
import { useState, useContext } from "react";
import data from "./data.json";
import plus from "./images/icon-plus.svg";
import minus from "./images/icon-minus.svg";
import reply from "./images/icon-reply.svg";
import del from "./images/icon-delete.svg";
import edit from "./images/icon-edit.svg";

const AppContext = React.createContext();

export function AppProvider({ children }) {
  const currUser = data.currentUser;

  const [comments, setComments] = useState(data.comments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currId, setCurrId] = useState(null);

  const [actionType, setActionType] = useState(null);

  function vote(id, type) {
    const voted = comments.map((x) => {
      if (x.id === id) {
        if (type === "plus") return { ...x, score: x.score + 1 };
        if (type === "minus") return { ...x, score: x.score - 1 };
      }
      return x;
    });
    setComments(voted);
  }

  function handleSubmit(text, parentName) {
    setComments((prev) => [...prev, text]);
  }

  function handleDelete(id) {
    setIsModalOpen(true);
    setCurrId(id);
  }

  function confirm(decision) {
    let deleted = comments.filter((x) => x.id !== currId);
    // let deleted = comments.map((x) => x.replies.filter((y) => y.id !== currId));
    decision && setComments(deleted);
    setIsModalOpen(false);
    setCurrId(null);
  }
  console.log(comments);

  // function handleEdit(id) {
  //   setCurrId(id);
  // }

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
        handleSubmit,
        handleDelete,
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
