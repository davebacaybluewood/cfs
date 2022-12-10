import { Container, Grid } from "@mui/material";
import { MAIN_CALENDLY_EVENT_LINK } from "constants/constants";
import Banner from "library/Banner/Banner";
import Button from "library/Button/Button";
import HeaderTitle from "pages/Home/components/HeaderTitle/HeaderTitle";
import Wrapper from "pages/Home/components/Wrapper/Wrapper";
import { useState } from "react";
import { PopupModal } from "react-calendly";
import Form from "./components/Form/Form";
import Inquiries from "./components/Inquiries/Inquiries";
import "./Contact.scss";

const Contact = () => {
  const [calendlyModal, setCalendlyModal] = useState(false);

  return (
    <div className="contact">
      <Banner
        bigTitle="Contact Us"
        title="Share your suggestions and feedback with us."
        hasBorder={true}
        backgroundImage="https://demo.casethemes.net/itfirm/wp-content/uploads/2021/09/bg-pagetitle.jpg"
      />
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8} lg={8}>
            <Form />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Inquiries />
          </Grid>
        </Grid>
      </Container>

      {/* TODO */}
      <Wrapper
        className="contact-section"
        style={{ backgroundImage: `url("/assets/others/bg.png")` }}
      >
        <Container>
          <HeaderTitle
            title="+1 (626) 722-1611"
            bigTitle="To Make Requests For The Further Information"
            hasBorder={false}
          />
          <Button onClick={() => setCalendlyModal(true)}>
            Book an Appointment
          </Button>
          <PopupModal
            url={MAIN_CALENDLY_EVENT_LINK}
            onModalClose={() => setCalendlyModal(false)}
            open={calendlyModal}
            rootElement={document.getElementById("root") as any}
          />
        </Container>
      </Wrapper>
    </div>
  );
};

export default Contact;
