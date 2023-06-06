import { Link } from "react-router-dom";
import { paths } from "constants/routes";
import "./NotFound.scss";

const InvalidRoute = () => {
  return (
    <div className="not-found-container">
      <img src="\assets\images\logos\cfs-logo.png" />
      <h3>Oops! Page not found</h3>
      <h1>
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </h1>
      <h2>we are sorry, but the page you requested was not found.</h2>
      <Link to={paths.home}>Back to the Home Page</Link>
    </div>
  );
};

export default InvalidRoute;
