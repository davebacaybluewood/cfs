import { Alert, AlertTitle } from "@mui/material"

const AlertMessage = () => {
  return (
    <div>
      <Alert
        sx={{
          fontSize: "13px",
          fontWeight: "400",
          boxShadow: "none !important",
        }}
      >
        <AlertTitle sx={{ fontSize: "16px" }}>
          Thank you for raising your concern!
        </AlertTitle>
        Your issue has been received, and our team will review it shortly.
      </Alert>
    </div>
  )
}

export default AlertMessage
