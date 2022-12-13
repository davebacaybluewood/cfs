import classNames from "classnames";
import Button from "library/Button/Button";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import "./EventCard.scss";
import { Autocomplete, Grid } from "@mui/material";
import DrawerBase, { Anchor } from "library/Drawer/Drawer";
import * as Yup from "yup";
import { Formik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
import Promt from "library/Prompt/Promt";
import Spinner from "library/Spinner/Spinner";
import Toast from "library/Toast/Toast";
import { ILabeledInput } from "pages/Contact/components/Form/Form";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import generateRandomChars from "helpers/generateRandomChars";
import { MAIN_LOCALHOST } from "constants/constants";
import paths from "constants/routes";
import { submitInvite } from "redux/actions/eventActions";
import { useDispatch, useSelector } from "react-redux";
import { enforceFormat, formatToPhone } from "helpers/mobileNumberFormatter";
import { agents } from "data/agents";
import { formatISODateToDate } from "helpers/dateFormatter";

export type EventCardVariant = "light" | "dark";

interface IEventCard {
  image: string;
  title: string;
  description: string;
  createdAt: Date;
  id: string;
  variant: EventCardVariant;
  ticket?: string;
  event_date: Date | string;
  setShowDialog: Dispatch<SetStateAction<any>>;
  setClipboardValue: Dispatch<SetStateAction<any>>;
  setTicket: Dispatch<SetStateAction<any>>;
}

type EventValues = {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  agentNumber: string;
  invitee: string;
  remarks: string;
};

const EventCard: React.FC<IEventCard> = (props) => {
  const form = useRef<any>();
  const dispatch = useDispatch();
  const eventInvitesList = useSelector((state: any) => state?.eventInvitesList);
  const { loading, error } = eventInvitesList;

  const [showDrawer, setShowDrawer] = useState(false);
  const eventCardCn = classNames("event-card", {
    "event-card-light": props.variant === "light",
    "event-card-dark": props.variant === "dark",
  });

  const [showToast, setShowToast] = useState(false);
  const initialValues: EventValues = {
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    agentNumber: "",
    invitee: "",
    remarks: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name field is required."),
    emailAddress: Yup.string()
      .email("Invalid email address")
      .required("Email address field is required."),
    mobileNumber: Yup.string().required("Mobile Number field is required."),
  });
  return (
    <React.Fragment>
      <div
        style={{ backgroundImage: `url(${props.image})` }}
        className={eventCardCn}
      >
        <div className="event-card-content">
          <div className="date-wrapper">
            <CalendarTodayIcon />
            {formatISODateToDate(props.event_date.toString())} - 4:00 PM PST
          </div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <Button onClick={() => setShowDrawer(true)}>BOOK NOW</Button>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data: EventValues, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const referenceId = generateRandomChars(6);
          console.log(data);
          setSubmitting(false);
          resetForm();
          setShowDrawer(false);
          dispatch(
            submitInvite(
              referenceId,
              props.id,
              new Date().toString(),
              data.fullName,
              data.mobileNumber,
              data.emailAddress,
              data.agentNumber,
              data.invitee,
              data.remarks
            ) as any
          );
          props.setClipboardValue(
            `${MAIN_LOCALHOST}${paths.event_invites.replace(
              ":id",
              referenceId
            )}`
          );
          props.setTicket(props.ticket);
          props.setShowDialog(true);
        }}
      >
        {({ values, handleSubmit, dirty, isSubmitting, setFieldValue }) => {
          const labeledInput: ILabeledInput[] = [
            {
              name: "fullName",
              label: "Full Name *",
              value: values.fullName,
              colDef: {
                xs: 12,
                md: 12,
                lg: 12,
              },
            },
            {
              name: "mobileNumber",
              label: "Mobile Number (+1) *",
              value: values.mobileNumber,
              colDef: {
                xs: 12,
                md: 6,
                lg: 6,
              },
            },
            {
              name: "emailAddress",
              label: "Email Address *",
              value: values.emailAddress,
              colDef: {
                xs: 12,
                md: 6,
                lg: 6,
              },
            },
            {
              name: "agentNumber",
              label: "Agent ID Number",
              value: values.agentNumber,
              colDef: {
                xs: 12,
                md: 6,
                lg: 12,
              },
            },
            {
              name: "invitee",
              label: "Who Invited You?",
              value: values.invitee,
              colDef: {
                xs: 12,
                md: 6,
                lg: 12,
              },
              isAutoComplete: true,
            },
            {
              name: "remarks",
              label: "Comments",
              value: values.remarks,
              colDef: {
                xs: 12,
                md: 12,
                lg: 12,
              },
              isTextArea: true,
            },
          ];

          const onSubmitHandler = () => {
            handleSubmit();
          };
          return (
            <DrawerBase
              anchor={Anchor.Right}
              onClose={() => setShowDrawer(false)}
              open={showDrawer}
              title="BOOK EVENT"
              footer={
                <React.Fragment>
                  <Button
                    onClick={() => setShowDrawer(false)}
                    disabled={isSubmitting}
                    variation="light"
                  >
                    CANCEL
                  </Button>
                  <Button
                    onClick={() => onSubmitHandler()}
                    disabled={isSubmitting}
                    variation="dark"
                  >
                    BOOK NOW
                  </Button>
                </React.Fragment>
              }
            >
              <div>
                {/* <img src={props.image} alt="event-1" width="100%" /> */}
                <div className="event-captions">
                  <div className="date-wrapper">
                    <CalendarTodayIcon />{" "}
                    {formatISODateToDate(props.event_date.toString())} - 4:00 PM
                    PST
                  </div>
                  <h2>{props.title}</h2>
                  <p>{props.description}</p>
                </div>
                <div className="form-instructions">
                  <h2>RSVP FORM</h2>
                  <p>(*) fields are required.</p>
                </div>

                <form onSubmit={handleSubmit} className="form" ref={form}>
                  <Grid container spacing={2}>
                    {labeledInput.map((data, index) => {
                      const withAutoComplete = (
                        <Grid item {...{ ...data.colDef }} key={index}>
                          <Autocomplete
                            options={[]}
                            getOptionLabel={(option: any) => option}
                            freeSolo
                            onChange={(e, value) => {
                              setFieldValue(
                                data.name,
                                value !== null ? value : data.name
                              );
                            }}
                            renderInput={(params) => (
                              <FormikTextInput
                                label={data.label}
                                variant="filled"
                                className="filled-input"
                                name={data.name}
                                isTextArea={data.isTextArea}
                                onKeyDown={
                                  data.name === "mobileNumber"
                                    ? enforceFormat
                                    : () => {}
                                }
                                onKeyUp={
                                  data.name === "mobileNumber"
                                    ? formatToPhone
                                    : () => {}
                                }
                                {...params}
                              />
                            )}
                          />
                        </Grid>
                      );

                      const FormikInput = (
                        <Grid item {...{ ...data.colDef }} key={index}>
                          <FormikTextInput
                            label={data.label}
                            variant="filled"
                            fullWidth
                            className="filled-input"
                            name={data.name}
                            isTextArea={data.isTextArea}
                            onKeyDown={
                              data.name === "mobileNumber"
                                ? enforceFormat
                                : () => {}
                            }
                            onKeyUp={
                              data.name === "mobileNumber"
                                ? formatToPhone
                                : () => {}
                            }
                            inputProps={{
                              maxLength: data.name === "mobileNumber" ? 16 : 50,
                            }}
                          />
                        </Grid>
                      );

                      return data.isAutoComplete
                        ? withAutoComplete
                        : FormikInput;
                    })}
                  </Grid>
                  <Promt isDirty={dirty} />
                  <Spinner isVisible={isSubmitting} />
                  <Toast setter={setShowToast} isVisible={showToast} />
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </form>
              </div>
            </DrawerBase>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default EventCard;
