import ENDPOINTS from "constants/endpoints";
import getUserToken from "helpers/getUserToken";
import NoInformationToDisplay from "library/NoInformationToDisplay/NoInformationToDisplay";
import Spinner from "library/Spinner/Spinner";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Testimonials.scss";

export type TestiMonialTypes = {
  comment: string;
  name: string;
  title: string;
  isDisplayed: boolean;
  emailAddress: string;
  _id: string;
  testimonialGuid: string;
};
type TestimonialsProps = {
  testimonials: TestiMonialTypes[];
  setPageLoading: any;
  agentId: string;
};
const Testimonials: React.FC<TestimonialsProps> = (props) => {
  const [testimonialsState, setTestimonialsState] = useState<
    TestiMonialTypes[]
  >([]);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setTestimonialsState(props.testimonials);
  }, [props.testimonials]);

  const testimonialStatusHandler = async (testimonialId: string) => {
    setPageLoading(true);
    try {
      const response = await fetch(
        ENDPOINTS.AGENT_TESTIMONIALS_STATUS.replace(":agentId", props.agentId),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getUserToken(),
          },
          body: JSON.stringify({
            // data to be submitted
            testimonialGuid: testimonialId,
          }),
        }
      );

      const newData = await response.json();
      setTestimonialsState(newData);
      toast.success(`Testimonial Updated!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPageLoading(false);
    } catch (err) {
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
      setPageLoading(false);
    }
  };
  return (
    <div className="testimonials">
      {pageLoading ? <Spinner variant="fixed" /> : null}
      <h2>Testimonials</h2>
      <NoInformationToDisplay
        showNoInfo={testimonialsState?.length === 0 ? true : false}
        message="No testimonials available in this agent."
        title="NO INFORMATION TO DISPLAY"
        icon={<React.Fragment />}
      >
        <React.Fragment>
          {testimonialsState?.map((testimonial, index) => (
            <div className="item">
              <div className="abosolute-icon">{index + 1}</div>
              <p className="testimonial">{testimonial.comment}</p>
              <div className="client-from">
                <div>
                  <h5>{testimonial.name}</h5>
                  <p>{testimonial.title}</p>
                </div>
                <div className="actions">
                  {testimonial.isDisplayed ? (
                    <button
                      onClick={() =>
                        testimonialStatusHandler(testimonial.testimonialGuid)
                      }
                    >
                      <FaEye />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        testimonialStatusHandler(testimonial.testimonialGuid)
                      }
                    >
                      <FaEyeSlash />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      </NoInformationToDisplay>
    </div>
  );
};

export default Testimonials;
