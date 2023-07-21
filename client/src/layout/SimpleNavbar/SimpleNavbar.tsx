import { Container } from "@mui/material";
import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import "./SimpleNavbar.scss";
import { Link, useParams } from "react-router-dom";
import { paths } from "constants/routes";
import { toast } from "react-toastify";

const SimpleNavbar: React.FC = () => {
  const { userGuid } = useParams();

  const copyToClip = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.info(`URL Copied`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="simple-navbar">
      <Container>
        <ul>
          <li>
            <Link to={paths.home} target="_blank" rel="noopener noreferrer">
              Home
            </Link>
          </li>
          <li>
            <Link
              to={paths.agent_with_id.replace(":id", userGuid ?? "")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agent Information
            </Link>
          </li>
          <li>
            <button onClick={() => copyToClip()}>
              <AiOutlineLink />
              <span>Copy Link</span>
            </button>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default SimpleNavbar;
