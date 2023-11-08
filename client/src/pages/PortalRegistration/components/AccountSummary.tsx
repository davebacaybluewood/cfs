import { Grid } from "@mui/material";
import React, { useState } from "react";
import LabeledValue from "library/LabeledValue/LabeledValue";
import {
  FaComments,
  FaDiscord,
  FaFacebookSquare,
  FaIdCard,
  FaInstagramSquare,
  FaLinkedin,
  FaLock,
  FaMapMarked,
  FaMapMarkerAlt,
  FaPenAlt,
  FaRegEnvelope,
  FaRegEye,
  FaRegEyeSlash,
  FaStar,
  FaTwitterSquare,
  FaUserAlt,
  FaUserShield,
} from "react-icons/fa";
import Badge from "library/Badge/Badge";
import checkBlankValue from "helpers/checkBlankValue";
import { BLANK_VALUE } from "constants/constants";
import { ValuesType } from "../models";

interface AccountSummaryProps {
  values: ValuesType;
  changeStage: (newStage: number) => void;
  isValid: boolean;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}
const AccountSummary: React.FC<AccountSummaryProps> = (props) => {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const accountInfo = [
    {
      title: "Email Address",
      subTitle: props.values.emailAddress,
      icon: <FaRegEnvelope />,
    },
    {
      title: "Password",
      subTitle: (
        <div className="password-container">
          {isPasswordOpen
            ? props.values.password
            : [0, 0, 0, 0, 0, 0, 0].map(() => (
                <React.Fragment>
                  <span>&#x2022;</span>
                </React.Fragment>
              ))}
          {isPasswordOpen ? (
            <button
              onClick={() => {
                setIsPasswordOpen(false);
              }}
            >
              <FaRegEyeSlash />
            </button>
          ) : (
            <button
              onClick={() => {
                setIsPasswordOpen(true);
              }}
            >
              <FaRegEye />
            </button>
          )}
        </div>
      ),
      icon: <FaLock />,
    },
  ];
  const personalInfo = [
    {
      title: "Full Name",
      subTitle: `${props.values.firstName} ${props.values.lastName}`,
      icon: <FaUserAlt />,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
    },
    {
      title: "Position",
      subTitle: "Free 30days Trial",
      icon: <FaUserShield />,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
    },
    {
      title: "Resident License Number",
      subTitle: checkBlankValue(props.values.licenseNumber),
      icon: <FaIdCard />,
    },
    {
      title: "Biography",
      subTitle: props.values.bio,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      icon: <FaPenAlt />,
    },
    {
      title: "Specialties",
      subTitle: props.values.specialties?.length
        ? props.values.specialties.map((data) => <Badge>{data}</Badge>)
        : BLANK_VALUE,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      icon: <FaStar />,
    },
    {
      title: "Languages",
      subTitle: props.values.languages.length
        ? props.values.languages.map((data) => <Badge>{data}</Badge>)
        : BLANK_VALUE,
      grid: {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
      },
      icon: <FaComments />,
    },
    {
      title: "Address Line 1",
      subTitle: checkBlankValue(props.values.address1),
      icon: <FaMapMarked />,
    },
    {
      title: "Address Line 2",
      subTitle: checkBlankValue(props.values.address2),
      icon: <FaMapMarked />,
    },
    {
      title: "State",
      subTitle: props.values.state,
      icon: <FaMapMarkerAlt />,
    },
  ];

  const socmeds = [
    {
      title: "Facebook",
      subTitle: checkBlankValue(props.values.facebook),
      icon: <FaFacebookSquare />,
    },

    {
      title: "Twitter",
      subTitle: checkBlankValue(props.values.twitter),
      icon: <FaTwitterSquare />,
    },
    {
      title: "Instagram",
      subTitle: checkBlankValue(props.values.instagram),
      icon: <FaInstagramSquare />,
    },
    {
      title: "LinkedIn",
      subTitle: checkBlankValue(props.values.linkedIn),
      icon: <FaLinkedin />,
    },
    {
      title: "Discord ID",
      subTitle: checkBlankValue(props.values.discordId),
      icon: <FaDiscord />,
    },
    {
      title: "WeChat",
      subTitle: checkBlankValue(props.values.weChat),
      icon: <FaComments />,
    },
  ];
  return (
    <div className="account-summary-container">
      <div className="box-container">
        <h3>Account Information</h3>
        <Grid container spacing={2}>
          {accountInfo.map((data) => {
            return (
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <LabeledValue
                  title={data.title}
                  subTitle={data.subTitle}
                  variant="bold"
                  icon={data.icon}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className="box-container">
        <h3>Personal Information</h3>
        <Grid container spacing={2}>
          {/* {props.values.avatar ? (
            <Grid item sm={12} lg={12}>
              <div className="profile-pic">
                <h5>
                  <FaUserCircle />
                  <span>Profile Picture</span>
                </h5>
                <div className="user-img-container">
                  <img src={props.values.avatar} alt="user-profile-pic" />
                </div>
              </div>
            </Grid>
          ) : null} */}
          {personalInfo.map((data) => {
            return (
              <Grid
                item
                xs={data.grid?.xs || 12}
                sm={data.grid?.sm || 12}
                md={data.grid?.md || 12}
                lg={data.grid?.lg || 6}
              >
                <LabeledValue
                  title={data.title}
                  subTitle={data.subTitle ?? ""}
                  variant="bold"
                  icon={data.icon}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className="box-container">
        <h3>Social Media</h3>
        <Grid container spacing={2}>
          {socmeds.map((data) => {
            return (
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <LabeledValue
                  title={data.title}
                  subTitle={data.subTitle ?? ""}
                  variant="bold"
                  icon={data.icon}
                  ellipsis={true}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <button className="primary-cfs-btn" onClick={() => props.onSubmit()}>
            Register
          </button>
          <button
            className="secondary-cfs-btn"
            onClick={() => props.changeStage(4)}
          >
            Go back to previous stage
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountSummary;
