import { Snackbar, SnackbarOrigin } from "@mui/material";
import React, { useEffect } from "react";

interface IToast {
  isVisible?: boolean;
  text?: string;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  origin?: SnackbarOrigin;
}
const Toast: React.FC<IToast> = (props) => {
  useEffect(() => {
    if (props.isVisible) {
      setTimeout(() => props.setter(false), 7000);
    }
  }, [props]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: props.origin?.vertical ?? "top",
        horizontal: props.origin?.horizontal ?? "right",
      }}
      open={props.isVisible}
      message={props.text}
    />
  );
};

Toast.defaultProps = {
  isVisible: true,
  text: "Your message has been submitted.",
};

export default Toast;
