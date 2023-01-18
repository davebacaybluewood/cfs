import Banner from "library/Banner/Banner";
import PageTitle from "library/PageTitle/PageTitle";
import React, { useState } from "react";
import { images } from "./images";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./Medias.scss";
import { FaDownload, FaFacebookSquare, FaPlayCircle } from "react-icons/fa";
import { FacebookShareButton } from "react-share";
import { Grid } from "@mui/material";
import videos from "./videos";

const MediasLanding: React.FC = () => {
  const [index, setIndex] = useState(-1);
  const [video, setVideo] = useState({
    src: "",
    width: 900,
  });
  const [showVideo, setShowVideo] = useState(false);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  function download(url: string, filename: string) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const filteredFilename =
          filename.slice(0, filename.lastIndexOf(".")) + ".jpg";
        link.download = filteredFilename;
        link.click();
      })
      .catch(console.error);
  }

  const lightBoxButtons = [
    <button
      className="lb-button"
      onClick={() => download(currentImage?.original, "Comfort Life Image")}
    >
      <FaDownload />
    </button>,
    <button className="lb-button lb-button-icon">
      <FacebookShareButton
        url={currentImage?.original}
        hashtag={"#COMFORTFINANCIAL"}
        quote={currentImage?.original}
      >
        <FaFacebookSquare />
      </FacebookShareButton>
    </button>,
  ];
  return (
    <div className="media-wrapper">
      <PageTitle title="Christmas Party / Soft Launch" />
      <Banner
        bigTitle="Christmas Party / Soft Launch"
        title="12/16/2022"
        hasBorder={true}
      />

      <div id="container">
        <div className="video-container">
          <Grid container spacing={0}>
            {videos.map((video: any) => {
              return (
                <Grid
                  item
                  sm={video.gridCols?.sm || 6}
                  md={video.gridCols?.md || 3}
                  lg={video.gridCols?.lg || 3}
                >
                  <div
                    className="video-item"
                    style={{
                      backgroundImage: `url(${video.backgroundImage})`,
                    }}
                  >
                    <div className="bg-overlay"></div>
                    <div
                      className="play-button"
                      onClick={() => {
                        setShowVideo(true);
                        setVideo({
                          src: video.videoSrc,
                          width: video.width || 900,
                        });
                      }}
                    >
                      <FaPlayCircle />
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <div className="card-container">
          {images.map((image: any, index: number) => (
            <div className="card" onClick={() => handleClick(index)}>
              <div className="bg-overlay" />
              <div
                className="card-image"
                style={{ backgroundImage: `url(${image.src})` }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {currentImage && (
        <Lightbox
          mainSrc={currentImage.original}
          imageTitle={`${currentImage.caption} ${index + 1}/${images.length}`}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.original}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.original}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
          onImageLoad={() => {
            window.dispatchEvent(new Event("resize"));
          }}
          toolbarButtons={lightBoxButtons}
        />
      )}

      {showVideo && video ? (
        <div className="videoplay-container">
          <div
            className="videoplay-overlay"
            onClick={() => {
              setShowVideo(false);
              setVideo({
                src: "",
                width: 0,
              });
            }}
          />
          <video controls muted={false} autoPlay style={{ width: video.width }}>
            <source src={video.src} type="video/mp4" />
            <source src={video.src} type="video/ogg" />
            Your browser does not support HTML video.
          </video>
        </div>
      ) : null}
    </div>
  );
};

export default MediasLanding;
