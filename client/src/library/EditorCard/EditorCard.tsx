import React from "react";
import "./EditorCard.scss";

const EditorCard: React.FC = () => {
  return (
    <div className="editor-card-container">
      <div className="editor-card-details">
        <p>Jonathan Buhain</p>
        <p>09204710519</p>
        <p className="details-email">jonathan.buhain.vc@gmail.com</p>
        <p>
          Status: <span>Active</span>
        </p>
      </div>
      <div className="editor-card-thumbnail">
        <img
          src="https://res.cloudinary.com/dfm2vczpy/image/upload/v1676512417/agent-avatars/8edffe5e9fa07440f116005a36d52281_cipfke.jpg"
          alt="Avatar"
        />
      </div>
    </div>
  );
};

export default EditorCard;
