import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
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
  const [target, setTarget] = useState("");
  const [kind, setKind] = useState("");
  const [problem, setProblem] = useState("");
  const handleKind = (event) => {
    setKind(event.target.value);
  };
  const handleProblem = (event) => {
    setProblem(event.target.value);
  };
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
          <div style={{ textAlign: "end"}}>
            <Button width={1 / 10} onClick={handleClose}>
              <CloseIcon></CloseIcon>
            </Button>
          </div>

          <form className={classes.root} noValidate autoComplete="off">
            <Typography>{new Date().toLocaleString()}</Typography>
            <FormControl className={classes.dialog}>
              <InputLabel id="demo-simple-select-label">Target</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={target}
                onChange={handleProblem}
              >
                <MenuItem value={"Wheelchair"}>Wheelchair</MenuItem>
                <MenuItem value={"Elderly"}>Elderly</MenuItem>
                <MenuItem value={"Children"}>Children</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Problem</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={problem}
                onChange={handleProblem}
              >
                <MenuItem value={"Broken"}>Broken</MenuItem>
                <MenuItem value={"Obstacles"}>Obstacles</MenuItem>
                <MenuItem value={"Uninstalled"}>Uninstalled</MenuItem>
                <MenuItem value={"UnderConstruction"}>
                  Under Construction
                </MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={10}
                placeholder="Details"
              />
            </FormControl>
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
