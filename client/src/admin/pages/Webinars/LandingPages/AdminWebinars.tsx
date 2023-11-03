import { paths } from "constants/routes"
import React, { useEffect, useState } from "react"
import "../style.scss"
import { useNavigate, useParams } from "react-router-dom"
import ENDPOINTS from "constants/endpoints"
import getUserToken from "helpers/getUserToken"
import FullwidthBox, { FullwidthBoxData } from "../components/FullwidthBox"
import Wrapper from "admin/components/Wrapper/Wrapper"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material"
import Title from "admin/components/Title/Title"
import { Formik } from "formik"
import * as Yup from "yup"
import FormikTextInput from "library/Formik/FormikInput"
import { NOTIFICATION_ENUMS } from "constants/constants"
import { toast } from "react-toastify"
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay"
import DocumentTitleSetter from "library/DocumentTitleSetter/DocumentTitleSetter"

const AdminWebinars: React.FC = () => {
  const initialValues = {
    calendlyUrl: "",
  }
  const validationSchema = Yup.object({
    calendlyUrl: Yup.string().required("Personal Calendar field is required."),
  })
  const { status } = useParams()
  const breadcrumb = [
    {
      title: "Comfort Financial Solutions",
      url: paths.dashboard,
      isActive: false,
    },
    {
      title:
        status === "webinar_request" ? "Webinar Requests" : "Agent Webinars",
      url: paths.allAgentWebinars,
      isActive: true,
    },
  ]
  const [loading, setLoading] = useState(false)
  const [webinars, setWebinars] = useState<any>([])
  const [openDialog, setOpenDialog] = useState(false)

  const handleClose = () => {
    setOpenDialog(false)
  }

  const modifiedStatus = status?.toUpperCase()
  useEffect(() => {
    const getWebinars = async () => {
      setLoading(true)
      const response = await fetch(
        ENDPOINTS.AGENT_WEBINARS_FILTERED.replace(
          ":status",
          modifiedStatus ?? ""
        ),
        {
          method: "post",
          headers: {
            Authorization: "Bearer " + getUserToken(),
          },
          body: JSON.stringify({ status: modifiedStatus }),
        }
      )

      const data = await response.json()

      setWebinars(data)
      setLoading(false)
    }

    getWebinars()
  }, [status])

  const navigate = useNavigate()
  const [dialogData, setDialogData] = useState({
    webinarGuid: "",
    agentId: "",
  })

  const fullwidthData: FullwidthBoxData[] = webinars?.map((data: any) => {
    return {
      _id: data._id,
      date: data.createdAt,
      name: data.name,
      firstName: data.firstName,
      lastName: data.lastName,
      onClick: () => {
        setDialogData({
          webinarGuid: data.webinarGuid,
          agentId: data.userGuid,
        })
        setOpenDialog(true)
      },
      status: data.status,
      title: data.title,
    }
  })
  return (
    <Wrapper
      breadcrumb={breadcrumb}
      loading={loading}
      error={false}
      className="admin-webinar-container"
    >
      <DocumentTitleSetter title="Agent Webinars | CFS Portal" />
      <Title title="Agent Webinars" subtitle="Manage all agent webinars." />
      <NoInformationToDisplay
        showNoInfo={fullwidthData?.length === 0 && !loading}
        title="No information to display"
        message="No webinars available."
      >
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={12}>
            <FullwidthBox
              data={fullwidthData}
              hideAction={status === "webinar_approved" ? true : false}
            />
          </Grid>
        </Grid>
      </NoInformationToDisplay>
      <Dialog open={openDialog} onClose={handleClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            setLoading(true)
            fetch(
              ENDPOINTS.AGENT_WEBINAR_UPDATE.replace(
                ":webinarGuid",
                dialogData.webinarGuid
              ).replace(":agentId", dialogData.agentId),
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + getUserToken(),
                },
                body: JSON.stringify({
                  status: NOTIFICATION_ENUMS.WEBINARS.WEBINAR_APPROVED,
                  calendlyUrl: values.calendlyUrl,
                }),
              }
            )
              .then((response) => {
                toast.info(`Webinar Approved`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                })
                setOpenDialog(false)
                navigate(
                  paths.allAgentWebinars.replace(
                    ":status",
                    NOTIFICATION_ENUMS.WEBINARS.WEBINAR_APPROVED.toLowerCase()
                  )
                )
              })
              .then((result) => {
                console.log(result)
                setLoading(false)
              })
          }}
        >
          {({ values, handleSubmit }) => {
            return (
              <React.Fragment>
                <DialogContent className="form-dialog">
                  <DialogContentText fontSize={18}>
                    By approving this webinar, you need to add more details.
                  </DialogContentText>
                  <Grid container spacing={1} marginTop={1}>
                    <Grid item xs={12} lg={12}>
                      <FormikTextInput
                        name="calendlyUrl"
                        label="Calendly URL *"
                        value={values.calendlyUrl}
                        className="text-input"
                        variant="standard"
                        error={!!values.calendlyUrl}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} style={{ fontSize: "13px" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSubmit()}
                    autoFocus
                    style={{ fontSize: "13px" }}
                  >
                    Approve Request
                  </Button>
                </DialogActions>
              </React.Fragment>
            )
          }}
        </Formik>
      </Dialog>
    </Wrapper>
  )
}

export default AdminWebinars
