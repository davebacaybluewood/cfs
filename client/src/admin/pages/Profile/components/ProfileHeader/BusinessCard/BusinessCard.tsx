import { exportComponentAsJPEG } from "react-component-export-image";
import React, { useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { MAIN_IMAGES } from "constants/constants";
import "./BusinessCard.scss";

interface BusinessCardProps {
  name: string;
  phoneNumber: string;
  url?: string;
  state: string;
  licenseNumber: string;
  userGuid: string;
  email: string;
  position: string;
}
const BusinessCard: React.FC<BusinessCardProps> = (props) => {
  const businessCardRef = useRef();

  const emailAddressLength = props.email?.length;

  const textSize = emailAddressLength > 20 ? "1rem" : "1.2rem";

  return (
    <div className="business-card-wrapper" ref={businessCardRef as any}>
      <div
        className="back-page"
        style={{
          backgroundImage: `url('/assets/images/templates/business-card-orig-size.png')`,
        }}
      >
        <div className="business-card-content">
          <div className="primary-info">
            <h2>{props.name}</h2>
            <h3>{props.position}</h3>
          </div>
          <div className="secondary-info">
            <div className="captions">
              <h4 style={{ fontSize: textSize }}>{props.email}</h4>
              <h4 style={{ fontSize: textSize }}>{props.phoneNumber}</h4>
              <h4 style={{ fontSize: textSize }}>www.gocfs.pro</h4>
              <h4 style={{ fontSize: textSize }}>{props.state}</h4>
              <p>LICENSE NO. 0912322</p>
            </div>
            <div className="qr-code">
              <QRCode
                value={`https://gocfs.pro/${props.userGuid}`}
                size={99}
                bgColor="transparent"
                fgColor="#FFFFFF"
              />
              <img src={MAIN_IMAGES.MAIN_LOGO} />
            </div>
          </div>
        </div>
      </div>
      <div className="business-card-actions">
        <button
          onClick={() =>
            exportComponentAsJPEG(businessCardRef as any, {
              fileName: `${props.name} - Business Card`,
            })
          }
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;
