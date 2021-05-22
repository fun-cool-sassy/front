import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import PopUpInput from "../PopUpInput";
import PopUpInfo from "../PopUpInfo";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "90vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  searchPanel: {
    height: 600,
    width: 400,
  },
  displayFlex: {
    display: "flex",
  },
  displayFlexCenter: {
    display: "flex",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {},
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
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
  popupRoot: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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
          <Button width={1 / 10} onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </Button>
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

const Navigation = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [content, setContent] = useState("");
  const [isSearchPanel, setIsSearchPanel] = useState(true);
  const [isTalkPanel, setIsTalkPanel] = useState(true);
  const [isRankPanel, setIsRankPanel] = useState(true);
  const [rank, setRank] = useState(5);
  const [id, setId] = useState("qwerty");
  const [email, setEmail] = useState("qwerty@gmail.com");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleContent = (event) => {
    setContent(event.target.value);
  };
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          icon={<Avatar alt="bf" src="../assets/images/logo.png" />}
          {...a11yProps(0)}
        />
        <Tab label="Map" {...a11yProps(1)} />
        <Tab label="Talk" {...a11yProps(2)} />
        <Tab label="Rank" {...a11yProps(3)} />
        <Tab label="Etc" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        <Box className={classes.displayFlex}>
          {isSearchPanel && (
            <Box className={classes.searchPanel} border={1}>
              <Box className={classes.displayFlexCenter}>
                <InputBase
                  placeholder="Search location"
                  inputProps={{ "aria-label": "search" }}
                />
                <SearchIcon />
              </Box>
            </Box>
          )}
          <Button height={400} onClick={() => setIsSearchPanel(!isSearchPanel)}>
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </Button>
          <PopUpInput />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box className={classes.displayFlex}>
          {isTalkPanel && (
            <Box
              className={classes.searchPanel}
              display="flex"
              flexDirection="column"
              border={1}
            >
              <Box className={classes.displayFlexCenter}>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
                <SearchIcon />
              </Box>
              <Button>Near me(1km)</Button>
              <Button>Exclude resolved posts</Button>
              <img
                src="https://picsum.photos/400/250"
                alt="random img"
                onClick={() => {
                  setOpen(!open);
                }}
              />
              <img
                src="https://picsum.photos/400/249"
                alt="random img"
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </Box>
          )}
          <SimpleDialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          ></SimpleDialog>
          <Button height={400} onClick={() => setIsTalkPanel(!isTalkPanel)}>
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </Button>
          {/* <PopUpInfo /> */}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box className={classes.displayFlex}>
          {isRankPanel && (
            <Box
              className={classes.searchPanel}
              display="flex"
              flexDirection="column"
              border={1}
            >
              <Typography className={classes.font}>Rank: {rank}</Typography>
              <Typography className={classes.font}>ID: {id}</Typography>
              <Typography className={classes.font}>Email: {email}</Typography>
              <FormControl className={classes.dialog}>
                <InputLabel id="demo-simple-select-label">Rank</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={content}
                  onChange={handleContent}
                >
                  <MenuItem value={"UserRank"}>User Rank</MenuItem>
                  <MenuItem value={"TargetRank"}>Target Rank</MenuItem>
                  <MenuItem value={"ProblemRank"}>Problem Rank</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
          <Button height={400} onClick={() => setIsRankPanel(!isRankPanel)}>
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </Button>
          {/* <PopUpInput /> */}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Created by Team FCS(Fun Cool Sassy)
      </TabPanel>
    </div>
  );
};

export default Navigation;
