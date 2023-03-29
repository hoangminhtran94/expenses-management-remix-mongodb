import React from "react";
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: React.MouseEventHandler;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <dialog
        className="modal"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}

export default Modal;
