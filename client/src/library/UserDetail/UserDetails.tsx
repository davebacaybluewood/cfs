import { AuthorType } from "library/Blogs/BlogModels";
import React from "react";
import "./UserDetails.scss";

const UserDetails: React.FC<AuthorType> = (props) => {
  return (
    <div className="user-details">
      <div className="user-image">
        <img src={props.image} alt="user-avatar" />
      </div>
      <div className="user-name">{props.authorName}</div>
    </div>
  );
};

export default UserDetails;
