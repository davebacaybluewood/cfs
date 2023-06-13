import usePrompt from "hooks/useCallbackPrompt";
import React from "react";

type PromptProps = {
  isDirty: boolean;
};
const Promt: React.FC<PromptProps> = (props) => {
  usePrompt(
    "All changes you made to this form will be undone. Are you sure you want to discard changes?",
    props.isDirty
  );

  return <React.Fragment />;
};

export default Promt;
