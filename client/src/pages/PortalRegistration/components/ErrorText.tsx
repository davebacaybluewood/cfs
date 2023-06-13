import React from "react";

interface ErrorTextProps {
  isError: boolean;
  text: string;
}
const ErrorText: React.FC<ErrorTextProps> = (props) => {
  if (props.isError)
    return (
      <p className="form-error" style={{ marginLeft: 10 }}>
        {props.text}
      </p>
    );

  return <React.Fragment />;
};

export default ErrorText;
