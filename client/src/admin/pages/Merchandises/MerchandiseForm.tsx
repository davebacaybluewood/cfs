import { Grid, Button as MUIButton } from "@mui/material";
import { CrumbTypes } from "admin/pages/Dashboard/types";
import { paths } from "constants/routes";
import Wrapper from "admin/components/Wrapper/Wrapper";
import { Formik } from "formik";
import Spinner from "library/Spinner/Spinner";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import FormikTextInput from "library/Formik/FormikInput";
import Button from "library/Button/Button";
import "./MerchandiseForm.scss";
import { useLocation, useNavigate } from "react-router-dom";
import agent from "admin/api/agent";
import { toast } from "react-toastify";

const MerchandiseForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    points: "",
    image: "",
  });

  const search = useLocation().search;
  const action = new URLSearchParams(search).get("action");
  const merchandiseId = new URLSearchParams(search).get("merchandiseId");

  useEffect(() => {
    const getMerchandise = async () => {
      const merchandise = await agent.Merchandise.getSingleMerchandiseById(
        merchandiseId ?? ""
      );
      setInitialValues({
        image: merchandise?.image ?? "",
        name: merchandise?.name ?? "",
        points: merchandise?.points?.toString() ?? "",
      });
      setThumbnailPreview(merchandise?.image ?? "");
    };

    getMerchandise();
  }, []);

  const validationSchema = Yup.object({
    points: Yup.string()
      .required("Points is required.")
      .matches(/^[0-9]+$/, "Must be number type"),
    name: Yup.string().required("Merchandise name is required."),
  });

  const crumbs: CrumbTypes[] = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title: "My Rewards",
      url: paths.myRewards,
      isActive: false,
    },
    {
      title: "Add Rewards Form",
      url: paths.merchandiseForm,
      isActive: true,
    },
  ];

  const handleFocusBack = () => {
    setThumbnailPreview("");
    window.removeEventListener("focus", handleFocusBack);
  };
  const clickedFileInput = () => {
    window.addEventListener("focus", handleFocusBack);
  };

  return (
    <Wrapper
      breadcrumb={crumbs}
      error={false}
      loading={false}
      className="merchandise-container"
    >
      <div className="merchandise-form-container">
        {loading ? <Spinner variant="fixed" /> : null}
        <h2>Merchandise Form</h2>
        <div className="merchandise-form">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={async (data, actions) => {
              setLoading(true);

              const addMerchandise = async () => {
                await agent.Merchandise.addMerchandise({
                  name: data.name,
                  image: data.image,
                  points: parseFloat(data.points),
                });
                toast.info(`Reward has been added`, {
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
                navigate(paths.myRewards);
              };

              const editMerchandise = async () => {
                await agent.Merchandise.editMerchandise(merchandiseId ?? "", {
                  name: data.name,
                  image: data.image,
                  points: parseFloat(data.points),
                });
                toast.info(`Reward has been edited`, {
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
                navigate(paths.myRewards);
              };

              if (action === "edit") {
                editMerchandise();
              } else {
                addMerchandise();
              }
            }}
            validationSchema={validationSchema}
          >
            {({ values, errors, handleSubmit, setFieldValue }) => {
              return (
                <React.Fragment>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={12} lg={12}>
                      <label>Merchandise Image (Required)</label>
                      <div>
                        <MUIButton
                          variant="contained"
                          component="label"
                          className="primary-cfs-btn input-file-btn"
                        >
                          Upload File
                          <input
                            type="file"
                            hidden
                            name="avatar"
                            onChange={(event) => {
                              setFieldValue(
                                "image",
                                event.currentTarget.files![0]
                              );
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  setThumbnailPreview(
                                    fileReader.result?.toString() ?? ""
                                  );
                                }
                              };
                              fileReader.readAsDataURL(event.target.files![0]);
                              window.removeEventListener(
                                "focus",
                                handleFocusBack
                              );
                            }}
                            onClick={clickedFileInput}
                          />
                        </MUIButton>
                        {thumbnailPreview ||
                        (typeof values.image === "string" && values.image) ? (
                          <div className="merchandise-img-container">
                            <img
                              src={
                                typeof values.image === "string"
                                  ? values.image
                                  : thumbnailPreview
                              }
                              alt="merchandise-pic"
                            ></img>
                          </div>
                        ) : null}
                      </div>
                    </Grid>
                    <Grid
                      item
                      sm={12}
                      md={12}
                      lg={12}
                      className="form-card-container"
                    >
                      <label>Merchandise Name (Required)</label>
                      <FormikTextInput
                        placeholder="Enter your template name here"
                        variant="outlined"
                        name="name"
                        value={values.name}
                      />
                    </Grid>
                    <Grid
                      item
                      sm={12}
                      md={12}
                      lg={12}
                      className="form-card-container"
                    >
                      <label>Merchandise Points (Required)</label>
                      <FormikTextInput
                        placeholder="Enter your points here"
                        variant="outlined"
                        name="points"
                        value={values.points}
                      />
                    </Grid>
                  </Grid>
                  <div className="form-actions">
                    <Button variant="danger" onClick={() => handleSubmit()}>
                      {action === "edit" ? "Edit" : "Save"} Merchandise
                    </Button>
                  </div>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                  <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                </React.Fragment>
              );
            }}
          </Formik>
        </div>
      </div>
      {loading ? <Spinner variant="fixed" /> : null}
    </Wrapper>
  );
};

export default MerchandiseForm;
