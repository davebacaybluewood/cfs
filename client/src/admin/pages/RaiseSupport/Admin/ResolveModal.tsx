import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import "./RaiseSupportAdmin.scss"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 4,
}

const ResolveModal = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h3"
          >
            Are you sure you want to resolve this ticket?
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="confirmation-btn" onClick={handleClose}>
              Yes
            </button>
            <button className="confirmation-btn" onClick={handleClose}>
              No
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ResolveModal
