import React, { useContext, useEffect, useState } from "react";
import { Button as MUIButton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Spinner from "library/Spinner/Spinner";
import { Formik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
import * as yup from "yup";
import { toast } from "react-toastify";
import agent from "admin/api/agent";
import { SubscriptionsData } from "api/models/Subscriptions";
import { useNavigate, useParams } from "react-router-dom";
import useFetchUserProfile from "admin/hooks/useFetchProfile";
import { UserContext } from "admin/context/UserProvider";
import { useDispatch } from "react-redux";
import { logout } from "redux/actions/userActions";
import { paths } from "constants/routes";

const AdminSettings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    password: "",
  });
  const [subscriber, setSubscriber] = useState<
    SubscriptionsData[] | undefined
  >();
  const [showMessage, setShowMessage] = useState(false);
  const userCtx = useContext(UserContext) as any;
  const userGuid = userCtx?.user?.userGuid;

  /* Validation Schema */
  const validationSchema = yup.object({
    password: yup.string().required("Password field is required."),
  });

  /* Modal Styles */
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #c4a5a7 ",
    boxShadow: 17,
    borderRadius: 2,
    p: 3,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* Unsubcribe Function */
  const unsubscibeHandler = async (data: any) => {
    setLoading(true);
    try {
      const res = await agent.Profile.unsubscribe(userGuid, data.password);
      if (res) {
        toast.info("You've Successfully Unsubscribed.");
        dispatch(logout() as any);
        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      toast.error("Invalid Password");
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner variant="fixed" />;
  }

  return (
    <div className="admin-settings-container">
      <div className="title-content">
        <h2>Unsubcribe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="settings-actions-btn">
        <MUIButton variant="contained" onClick={() => setOpen(true)}>
          Unsubscibe
        </MUIButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-content">
            <h3>Please Verify: </h3>
            <Formik
              initialValues={initialValues}
              onSubmit={(data: any) => unsubscibeHandler(data)}
              validationSchema={validationSchema}
            >
              {({ values, errors }) => {
                return (
                  <div className="form-control-container">
                    <FormikTextInput
                      name="password"
                      placeholder="Enter your Password"
                      type="password"
                    />

                    <div className="btn-form-actions">
                      <MUIButton
                        variant="text"
                        onClick={() => unsubscibeHandler(values)}
                        disabled={!values.password}
                      >
                        Unsubcribe
                      </MUIButton>
                      <MUIButton
                        variant="text"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </MUIButton>
                    </div>
                    {/* pre Tags : uncomment when not in use */}
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                  </div>
                );
              }}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminSettings;
