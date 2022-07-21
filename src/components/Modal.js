import React from "react";
import { useGlobalContext } from "../context";

export default function Modal() {
  const { confirm, isModalOpen } = useGlobalContext();

  // Modal component is unstyled.
  // displays onclick of the delete icon at bottom of the page
  return (
    // The modal is not transitioning. Please figure out a way of adding
    // a class of "modal-show" after the element as rendered.

    <div className={`modal-overlay ${isModalOpen && "modal-show"}`}>
      <div className="modal-center">
        <div className="modal-content">
          <h1>Delete Comment</h1>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone
          </p>
          <footer>
            <button onClick={() => confirm(false)}>No, cancel</button>
            <button onClick={() => confirm(true)}>Yes, delete</button>
          </footer>
        </div>
      </div>
    </div>
  );
}
