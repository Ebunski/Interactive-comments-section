import React from "react";
import { useGlobalContext } from "../context";

export default function Modal() {
  const { isModalOpen, confirm } = useGlobalContext();
  return (
    <div className="modal-container">
      <div className="modal-center">
        <div className="modal-content">
          <h1>Delete Comment</h1>
          <p>
            Are you sure you want to deletethis comment? This will remove the
            comment and can't be undone
          </p>
          <footer>
            <button>No, cancel</button>
            <button>Yes, delete</button>
          </footer>
        </div>
      </div>
    </div>
  );
}
