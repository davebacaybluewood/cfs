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

const MediasLanding: React.FC = () => {
  const [index, setIndex] = useState(-1);
  const [video, setVideo] = useState("");
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
        link.download = filename;
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
            <Grid item sm={6} md={3}>
              <div
                className="video-item"
                style={{
                  backgroundImage: `url("https://res.cloudinary.com/dfm2vczpy/image/upload/v1673042672/CFS%20Christmas/CFS%20Christmas%20Party%20Video/Video%20Thumbnail/Screenshot_2_iwqaxw.png")`,
                }}
              >
                <div className="bg-overlay"></div>
                <div
                  className="play-button"
                  onClick={() => {
                    setShowVideo(true);
                    setVideo(
                      "https://res.cloudinary.com/dfm2vczpy/video/upload/v1673032003/CFS%20Christmas/CFS%20Christmas%20Party%20Video/XUKI8672_n32nfm.mov"
                    );
                  }}
                >
                  <FaPlayCircle />
                </div>
              </div>
            </Grid>
            <Grid item sm={6} md={3}>
              <div
                className="video-item"
                style={{
                  backgroundImage: `url("https://res.cloudinary.com/dfm2vczpy/image/upload/v1673047589/CFS%20Christmas/CFS%20Christmas%20Party%20Video/Video%20Thumbnail/cgme_ue4mai.png")`,
                }}
              >
                <div className="bg-overlay"></div>
                <div
                  className="play-button"
                  onClick={() => {
                    setShowVideo(true);
                    setVideo(
                      "https://res.cloudinary.com/dfm2vczpy/video/upload/v1673031748/CFS%20Christmas/CFS%20Christmas%20Party%20Video/CGME5740_bzppxk.mov"
                    );
                  }}
                >
                  <FaPlayCircle />
                </div>
              </div>
            </Grid>
            <Grid item sm={6} md={3}>
              <div
                className="video-item"
                style={{
                  backgroundImage: `url("https://res.cloudinary.com/dfm2vczpy/image/upload/v1673047754/CFS%20Christmas/CFS%20Christmas%20Party%20Video/Video%20Thumbnail/bfz_lb3mut.png")`,
                }}
              >
                <div className="bg-overlay"></div>
                <div
                  className="play-button"
                  onClick={() => {
                    setShowVideo(true);
                    setVideo(
                      "https://res.cloudinary.com/dfm2vczpy/video/upload/v1673031751/CFS%20Christmas/CFS%20Christmas%20Party%20Video/BZFT0200_rc3xk0.mov"
                    );
                  }}
                >
                  <FaPlayCircle />
                </div>
              </div>
            </Grid>
            <Grid item sm={6} md={3}>
              <div
                className="video-item"
                style={{
                  backgroundImage: `url("https://res.cloudinary.com/dfm2vczpy/image/upload/v1672895253/CFS%20Christmas/CFS%20Christmas%20Party%20Video/CFS%20Party%20Pictures/IMG_0909_tsigqr.jpg")`,
                }}
              >
                <div className="bg-overlay"></div>
                <div
                  className="play-button"
                  onClick={() => {
                    setShowVideo(true);
                    setVideo(
                      "https://res.cloudinary.com/dfm2vczpy/video/upload/v1673031483/CFS%20Christmas/CFS%20Christmas%20Party%20Video/IMG_0943_fvm1js.mov"
                    );
                  }}
                >
                  <FaPlayCircle />
                </div>
              </div>
            </Grid>
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
              setVideo("");
            }}
          />
          <video controls muted={false} autoPlay>
            <source src={video} type="video/mp4" />
            <source src={video} type="video/ogg" />
            Your browser does not support HTML video.
          </video>
        </div>
      ) : null}
    </div>
  );
};

export default MediasLanding;
