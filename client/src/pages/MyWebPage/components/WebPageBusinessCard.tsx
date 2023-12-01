import React from "react"
import { QRCode } from "react-qrcode-logo"
import { MAIN_IMAGES } from "constants/constants"
import "./WebPageBusinessCard.scss"

interface BusinessCardProps {
  name: string
  phoneNumber: string
  url?: string
  state: string
  licenseNumber: string
  userGuid: string
  email: string
  position: string
  businessCardRef?: any
}

const WebPageBusinessCard: React.FC<BusinessCardProps> = (props) => {
  const emailAddressLength = props.email?.length

  const textSize = emailAddressLength > 20 ? "2rem" : "1.9rem"

  return (
    <div className="my-webpage-business-card-wrapper">
      <div
        className="back-page"
        style={{
          backgroundImage: `url('/assets/images/templates/business-card-orig-size.png')`,
          width: "100% !important",
        }}
        ref={props.businessCardRef as any}
      >
        <div
          className="business-card-content"
          style={{ width: "100% !important" }}
        >
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
              <p style={{ fontSize: "1.4rem" }}>
                LICENSE NO. {props.licenseNumber}
              </p>
            </div>
            <div className="qr-code">
              <QRCode
                value={`https://gocfs.pro/${props.userGuid}`}
                size={99}
                bgColor="transparent"
                fgColor="#FFFFFF"
              />
              <img src={MAIN_IMAGES.MAIN_LOGO} alt="cfs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebPageBusinessCard
