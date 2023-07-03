import React from "react";
import { AuthorType } from "library/Blogs/BlogModels";
import "./UserDetails.scss";

const UserDetails: React.FC<AuthorType> = (props) => {
  return (
    <div className="user-details">
      <div className="user-image">
        {props.image ? <img src={props.image} alt="user-avatar" /> : null}
      </div>
      <div className="user-name">
        {props.authorName ? props.authorName : null}
      </div>
    </div>
  );
};

export default UserDetails;
