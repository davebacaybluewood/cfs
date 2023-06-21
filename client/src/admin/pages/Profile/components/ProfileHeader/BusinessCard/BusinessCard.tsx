import React from "react";
import "./BusinessCard.scss";
import { QRCode } from "react-qrcode-logo";
import { MAIN_IMAGES } from "constants/constants";

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
  return (
    <div className="business-card-wrapper">
      <div
        className="back-page"
        style={{
          backgroundImage: `url('/assets/images/templates/business-card-bg.png')`,
        }}
      >
        <div className="business-card-content">
          <div className="primary-info">
            <h2>{props.name}</h2>
            <h3>{props.position}</h3>
          </div>
          <div className="secondary-info">
            <div className="captions">
              <h4>{props.email}</h4>
              <h4>{props.phoneNumber}</h4>
              <h4>www.gocfs.pro</h4>
              <h4>{props.state}</h4>
              <p>LICENSE NO. 0912322</p>
            </div>
            <div className="qr-code">
              <QRCode
                value={`https://gocfs.pro/${props.userGuid}`}
                size={80}
                bgColor="transparent"
                fgColor="#FFFFFF"
              />
              <img src={MAIN_IMAGES.WHITE_LOGO} />
            </div>
          </div>
        </div>
      </div>
      <div className="business-card-actions">
        <button>Download</button>
        <button>Send to Email</button>
      </div>
    </div>
  );
};

export default BusinessCard;
