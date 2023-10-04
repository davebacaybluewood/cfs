import React, { useState } from "react"
import { Alert, AlertTitle, Box, Button, Collapse, Grid } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

const AlertMessage = () => {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Collapse in={open}>
          <Alert
            // action={
            //   <IconButton
            //     aria-label="close"
            //     color="inherit"
            //     size="small"
            //     onClick={() => {
            //       setOpen(false)
            //     }}
            //   >
            //     <CloseIcon fontSize="inherit" />
            //   </IconButton>
            // }
            sx={{ mb: 2 }}
          >
            <AlertTitle>Thank you for raising your concern!</AlertTitle>
            Your issue has been received, and our team will review it shortly.
          </Alert>
        </Collapse>
        {/* <Button
          disabled={open}
          variant="outlined"
          onClick={() => {
            setOpen(true)
          }}
        >
          Re-open
        </Button> */}
      </Box>
    </div>
  )
}

export default AlertMessage
