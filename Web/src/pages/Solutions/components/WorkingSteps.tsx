import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import "./WorkingSteps.scss";

interface IWorkingSteps {
  bigTitle: string | JSX.Element;
  title: string;
  backgroundImage?: string;
  steps?: {
    title: string;
    subTitle: string;
    description: string;
  }[];
  topTitle?: string;
}

/** TODO: Put this to library */
const WorkingSteps: React.FC<IWorkingSteps> = (props) => {
  return (
    <div
      className="working-steps"
      style={{
        backgroundImage: `url(${props.backgroundImage})`,
      }}
    >
      <Container>
        <div className="title">
          <h5>{props.topTitle || "Working Steps"}</h5>
          {typeof props.title === "string" ? (
            <h1>{props.bigTitle}</h1>
          ) : (
            props.bigTitle
          )}
        </div>

        <Grid container spacing={2} className="steps">
          {props.steps?.map((item, i) => (
            <Grid item xs={6} sm={6} md={3} key={i}>
              <h1>{item.title}</h1>
              <h5>{item.subTitle}</h5>
              <p>{item.description}</p>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default WorkingSteps;
