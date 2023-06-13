import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserToken from "helpers/getUserToken";
import axios from "axios";
import ENDPOINTS from "constants/endpoints";
import { toast } from "react-toastify";
import FixedSpinner from "library/Spinner/Spinner";
import Button from "library/Button/Button";
import { ProfileData, RolesAndPositionType } from "admin/hooks/useFetchProfile";
import MultiSelectInputV2 from "library/MultiSelectInput/MultiSelectInputV2";
import {
  POSITIONS,
  PROFILE_POSITIONS,
  PROFILE_ROLES,
} from "pages/PortalRegistration/constants";
import ErrorText from "pages/PortalRegistration/components/ErrorText";
import Badge from "library/Badge/Badge";
import * as _ from "lodash";
import Spinner from "library/Spinner/Spinner";

interface RolesFormProps {
  profile: ProfileData | undefined;
}
const RolesForm: React.FC<RolesFormProps> = (props) => {
  const navigate = useNavigate();
  const [isAdminChecked, setIsAdminChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    roles: [],
    position: [],
  });
  const [positionValues, setPositionValues] = useState([]);

  const ROLES = [
    {
      value: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value,
      label: PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.label,
    },
    {
      value: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value,
      label: PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.label,
    },
    {
      value: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value,
      label: PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.label,
    },
    {
      value: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value,
      label: PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.label,
    },
    {
      value: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value,
      label: PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.label,
    },
    {
      value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value,
      label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.label,
    },
    {
      value: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value,
      label: PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.label,
    },
    {
      value: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value,
      label: PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.label,
    },
    {
      value: PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value,
      label:
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.label + " - " + "Editor",
    },
    {
      value: PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value,
      label:
        PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.label +
        " - " +
        "Editor",
    },
    {
      value:
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.value,
      label:
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS.label +
        " - " +
        "Content Creator",
    },
    {
      value:
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .value,
      label:
        PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES
          .label +
        " - " +
        "Content Creator",
    },
  ];

  useEffect(() => {
    setInitialValues({
      position: props.profile?.position as any,
      roles: props.profile?.roles as any,
    });
  }, [props.profile]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values) => {
        setLoading(true);
        const config = {
          headers: {
            Authorization: "Bearer " + getUserToken(),
          },
        };

        axios
          .put(
            ENDPOINTS.PROFILE_ROLES.replace(
              ":userGuid",
              props.profile?.userGuid ?? ""
            ),
            values,
            config
          )
          .then((response) => {
            setLoading(false);
            toast.info(`Roles & Position Updated`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((err) => {
            toast.error(`Error Occured`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setLoading(false);
          });
      }}
    >
      {({
        values,
        handleSubmit,
        resetForm,
        isSubmitting,
        setFieldValue,
        setTouched,
        touched,
      }) => {
        const roleChangeHandler = (e) => {
          const currentValue = e?.map((val) => val);
          const newValue = currentValue[currentValue.length - 1];

          const isNewValueAgent =
            newValue?.value === PROFILE_ROLES.AGENT.ROLE_ASSOCIATE.value ||
            newValue?.value ===
              PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_MARKETING_DIRECTOR.value ||
            newValue?.value ===
              PROFILE_ROLES.AGENT.ROLE_EXECUTIVE_VICE_PRESIDENT.value ||
            newValue?.value ===
              PROFILE_ROLES.AGENT.ROLE_TRAINING_ASSOCIATE.value ||
            newValue?.value ===
              PROFILE_ROLES.AGENT.ROLE_MARKETING_DIRECTOR.value ||
            newValue?.value ===
              PROFILE_ROLES.AGENT.ROLE_SENIOR_ASSOCIATE.value ||
            newValue?.value ===
              PROFILE_ROLES.AGENT.ROLE_SENIOR_EXECUTIVE_MARKETING.value ||
            newValue?.value ===
              PROFILE_ROLES.AGENT.ROLE_SENIOR_MARKETING_DIRECTOR.value;

          const isNewValueEditor =
            newValue?.value ===
              PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_BLOGS.value ||
            newValue?.value ===
              PROFILE_ROLES.EDITOR_ROLES.ROLE_EDITOR_EMAIL_TEMPLATES.value;

          const isNewValueContentCreator =
            newValue?.value ===
              PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS
                .value ||
            newValue?.value ===
              PROFILE_ROLES.CONTENT_CREATOR_ROLES
                .ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES.value;

          console.log({
            isNewValueAgent,
            newValue,
            currentValue,
          });

          if (isNewValueAgent) {
            const positionValue: RolesAndPositionType[] = [
              ...values.position,
              PROFILE_POSITIONS.AGENT,
            ];
            const currentPosition = values.position.filter(
              (data: any) => data.value === PROFILE_POSITIONS.AGENT.value
            );
            if (currentPosition.length !== 1) {
              setFieldValue("position", positionValue);
              setFieldValue("roles", currentValue);

              setPositionValues((data) => {
                return {
                  ...data,
                  positionValue,
                };
              });
            } else {
              toast.error(`Only one agent role can be applied.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          } else if (isNewValueContentCreator) {
            const positionValue = [
              ...values.position,
              PROFILE_POSITIONS.CONTENT_CREATOR,
            ];
            const currentPosition = values.position.filter(
              (data: any) =>
                data.value === PROFILE_POSITIONS.CONTENT_CREATOR.value
            );
            if (currentPosition.length !== 1) {
              setFieldValue("position", positionValue);
              setPositionValues((data) => {
                return {
                  ...data,
                  positionValue,
                };
              });
            }
            setFieldValue("roles", currentValue);
          } else if (isNewValueEditor) {
            const positionValue = [
              ...values.position,
              PROFILE_POSITIONS.EDITOR,
            ];
            const currentPosition = values.position.filter(
              (data: any) => data.value === PROFILE_POSITIONS.EDITOR.value
            );
            if (currentPosition.length !== 1) {
              setFieldValue("position", positionValue);
              setPositionValues((data) => {
                return {
                  ...data,
                  positionValue,
                };
              });
            }
            setFieldValue("roles", currentValue);
          }

          const isEditorRemove = currentValue?.filter(
            (data: any) =>
              data.value ===
                PROFILE_ROLES.CONTENT_CREATOR_ROLES.ROLE_CONTENT_CREATOR_BLOGS
                  .value ||
              data.value ===
                PROFILE_ROLES.CONTENT_CREATOR_ROLES
                  .ROLE_CONTENT_CREATOR_EMAIL_TEMPLATES.value
          );
        };

        const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
          setIsAdminChecked((prevState) => !prevState);

          if (isAdminChecked) {
            setFieldValue("roles", []);
            setFieldValue("position", []);
          } else {
            setFieldValue("roles", [
              PROFILE_ROLES.MASTER_ADMIN.ROLE_MASTER_ADMIN,
            ]);
            setFieldValue("position", [POSITIONS[3]]);
          }
        };
        return (
          <div className="roles-profile-form">
            {loading ? <Spinner variant="fixed" /> : null}
            <div className="header-form">
              <h2>Roles & Position Form</h2>
            </div>
            <div className="label-sections">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div>
                    <h2>Position</h2>
                    {values.position?.map((data: any) => {
                      const isAgent = POSITIONS[0].value === data.value;
                      const isEditor = POSITIONS[1].value === data.value;
                      const isContentCreator =
                        POSITIONS[2].value === data.value;

                      const badgeVariant = isAgent
                        ? "secondary"
                        : isEditor || isContentCreator
                        ? "danger"
                        : "primary";
                      return <Badge variant={badgeVariant}>{data.label}</Badge>;
                    })}
                  </div>
                </Grid>
                {isAdminChecked ? null : (
                  <React.Fragment>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <h2>Roles (Required)</h2>
                      <MultiSelectInputV2
                        variant="filled"
                        options={ROLES.map((role) => {
                          return {
                            keyword: role.label,
                            label: role.label,
                            value: role.value,
                          };
                        })}
                        onChange={roleChangeHandler}
                        onBlur={(e) => {
                          if (values.roles?.length === 0) {
                            setTouched({
                              ...touched,
                              roles: true as any,
                            });
                          }
                        }}
                        error={
                          values.roles?.length === 0 && touched.roles
                            ? true
                            : false
                        }
                        placeholder="Select a roles item to add"
                        value={values.roles?.map((data: any) => {
                          return {
                            keyword: data.label,
                            label: data.label,
                            value: data.value,
                          };
                        })}
                      />

                      <ErrorText
                        isError={values.roles?.length === 0 && !!touched.roles}
                        text="Roles field is required."
                      />
                    </Grid>
                  </React.Fragment>
                )}
                <Grid item xs={12} md={12} lg={12}>
                  <FormGroup className="admin-checkbox">
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={checkHandler}
                          checked={isAdminChecked}
                        />
                      }
                      label="Is Admin Role?"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <div className="form-actions">
                <Button onClick={() => resetForm()}>CLEAR</Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                  UPDATE
                </Button>
              </div>
            </div>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(initialValues, null, 2)}</pre> */}
          </div>
        );
      }}
    </Formik>
  );
};

export default RolesForm;
