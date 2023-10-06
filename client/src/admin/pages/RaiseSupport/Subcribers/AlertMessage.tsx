import React from "react"
import { Alert, AlertTitle, Box } from "@mui/material"

const AlertMessage = () => {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Alert sx={{ mb: 2 }}>
          <AlertTitle>Thank you for raising your concern!</AlertTitle>
          Your issue has been received, and our team will review it shortly.
        </Alert>
      </Box>
    </div>
  )
}

export default AlertMessage
