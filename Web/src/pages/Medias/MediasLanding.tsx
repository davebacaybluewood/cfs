import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import React from "react";
import "./MediasLanding.scss";
import { formatDate, formatISODateToDate } from "helpers/dateFormatter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";
import paths from "constants/routes";

const MediasLanding: React.FC = () => {
  return (
    <div className="media-wrapper">
      <PageTitle title="Medias" />
      <Banner
        bigTitle="Media "
        title="Explore the enjoyment with us."
        hasBorder={true}
      />

      <div className="album-container">
        <div className="albums">
          <div
            className="album"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/dfm2vczpy/image/upload/v1672895275/CFS%20Christmas/CFS%20Christmas%20Party%20Video/CFS%20Party%20Pictures/IMG_1269_wvbogx.jpg")`,
            }}
          >
            <div className="album-captions">
              <div className="date-wrapper">
                <CalendarTodayIcon />
                <span>
                  {formatDate(new Date("12/17/2022"), "fullFormat")} PST
                </span>
              </div>
              <h2>Christmas Party / Soft Launch</h2>
              <Link
                to={paths.media_with_id.replace(
                  ":id",
                  "639ce4ff061e6ed3a75acf51"
                )}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediasLanding;
