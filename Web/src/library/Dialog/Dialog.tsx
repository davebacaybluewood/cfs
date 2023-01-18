import * as React from "react";
import DialogMUI, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import "./Dialog.scss";

interface IDialog extends DialogProps {
  isDirty?: boolean;
  titleText?: string;
  contentText?: string;
  agreeText?: string;
  disagreeText?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
  agreeHandler: () => void;
}

export type DialogState = {
  open: boolean;
  id: string | number;
};
const Dialog: React.FC<IDialog> = (props) => {
  const agreeHandler = () => {
    props.setOpen(false);
    props.agreeHandler();
  };

  const disagreeHandler = () => {
    props.setOpen(false);
  };

  React.useEffect(() => {}, [props.open, props.agreeHandler]);
  return (
    <DialogMUI
      open={props.open}
      onClose={disagreeHandler}
      className="custom-dialog"
    >
      <DialogTitle>{props.titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={agreeHandler}>{props.disagreeText}</Button>
        <Button autoFocus>{props.agreeText}</Button>
      </DialogActions>
    </DialogMUI>
  );
};

Dialog.defaultProps = {
  titleText: "Delete Data",
  contentText:
    "This data will permanently deleted. Are you sure you want to delete this data?",
  agreeText: "Agree",
  disagreeText: "Disagree",
};

export default Dialog;
