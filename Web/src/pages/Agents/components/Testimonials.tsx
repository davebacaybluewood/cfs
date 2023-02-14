import { Box, Grid, Modal, Typography } from "@mui/material";
import Banner from "library/Banner/Banner";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type TestimonialProps = {
  testimonials: {
    title: string;
    name: string;
    testimonial: string;
  }[];
};
const Testimonials: React.FC<TestimonialProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="testimonials">
      <Banner
        bigTitle="What Clients Says To Me"
        title="Testimonials"
        hasBorder={true}
      ></Banner>

      <Grid container spacing={3}>
        {props.testimonials.map((t: any, index: number) => (
          <Grid item md={6} key={index}>
            <div className="item">
              {/* <div className="abosolute-icon">
                <FaQuoteRight />
              </div> */}
              <p className="testimonial">{t.testimonial}</p>
              <div className="client-from">
                <h5>{t.name}</h5>
                <p>{t.title}</p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <div className="testimonial-actions">
        <button onClick={handleOpen}>Add Testimonials</button>
        <Modal
          open={open}
          onClose={handleClose}
          disableRestoreFocus
          disableScrollLock
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Testimonials;
