import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  popupRoot: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  dialog: {
    display: "flex",
  },
  font: {
    fontSize: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [address, setAddress] = useState("서울시 동작구");
  const [coordinates, setCoordinates] = useState("146, 234");
  const [isFixed, setIsFixed] = useState(false);
  const [target, setTarget] = useState("Wheelchair");
  const [problem, setProblem] = useState("Broken");
  const [details, setDetails] = useState("text detail blah blah blah");
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      p={2}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="lg"
    >
      <Box className={classes.dialog}>
        <Box>
          <Typography className={classes.font}>{address}</Typography>
          <Typography className={classes.font}>{coordinates}</Typography>
          <img src="https://picsum.photos/400/300" alt="random img" />
        </Box>
        <Box>
          <div style={{ textAlign: "end" }}>
            <Button width={1 / 10} onClick={handleClose}>
              <CloseIcon></CloseIcon>
            </Button>
          </div>
          <form className={classes.popupRoot} noValidate autoComplete="off">
            <Typography className={classes.font}>
              {isFixed ? "Fixed" : "Not fixed"}
            </Typography>
            <Typography>{new Date().toLocaleString()}</Typography>
            <Typography className={classes.font}>Target: {target}</Typography>
            <Typography className={classes.font}>Problem: {problem}</Typography>
            <Typography className={classes.font}>Detail</Typography>
            <Typography className={classes.font}>{details}</Typography>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function PopUp() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <Button variant="outlined" color="primary">
        My location
      </Button>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Report
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
