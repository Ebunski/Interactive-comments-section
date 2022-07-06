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
  const [isReplying, setIsReplying] = useState(false);

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

  //   function input(){
  //     return{
  //         id: Math.random().toString
  //     }
  //   }

  function handleSubmit(text, parentId) {
    setComments((prev) => [...prev, text]);
  }
  console.log(comments);
  return (
    <AppContext.Provider
      value={{
        plus,
        minus,
        edit,
        del,
        reply,
        isReplying,

        currUser,
        comments,
        vote,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(AppContext);
}
