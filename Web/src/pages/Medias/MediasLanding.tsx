import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import React from "react";
import "./MediasLanding.scss";
import { formatDate, formatISODateToDate } from "helpers/dateFormatter";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";
import paths from "constants/routes";
import { Helmet } from "react-helmet";

const MediasLanding: React.FC = () => {
  const metaKeywords = ["insurance news california"].join(", ");

  const metaDatas = {
    metaKeywords,
    metaDescription:
      "Discover the latest financial news and trends with our latest CFS blog posts. Trust the financial experts at Comfort Financial Solutions for all your financial needs.",
  };

  return (
    <div className="media-wrapper">
      <Helmet>
        <title>General Life Insurance News | Comfort Financial Solutions</title>
        <meta name="description" content={metaDatas.metaDescription}></meta>
        <meta name="keywords" content={metaDatas.metaKeywords}></meta>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
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
              backgroundImage: `url("https://res.cloudinary.com/dfm2vczpy/image/upload/v1673993161/medias/Christmas%20Party%20Medias/Images/Final%20CFS%20Christmas%20Party%20Media/CFS_Christmas_Party_50_fqs39i.jpg")`,
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
