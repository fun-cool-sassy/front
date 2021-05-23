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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
        <Box p={1}>
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

const explanationText = (
  <div>
    <p>
      Explore the world via Google Street View, and check non-barrier free zones
      on Google Earth maps and shares it among users. Let’s help users who have
      barriers and become bounty hunter.
    </p>
    <h4>How to use</h4>
    <ol>
      <li>Choose street that you want to explore and click</li>
      <li>Street Views will then be shown from the area you see in the map.</li>
      <li>Explore map and check non-barrier free zone.</li>
      <li>Click the [Report] button to share.</li>
      <li>
        You can search non-barrier free zone with our SNS channel on left tab.
      </li>
      <li>Cheer up! Let’s find out more than others! Raise the ranking!</li>
    </ol>
  </div>
);

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
            <Box className={classes.searchPanel} border={1} >
              <Box className={classes.displayFlexCenter}>
                <InputBase
                  placeholder="Search location"
                  inputProps={{ "aria-label": "search" }}
                />
                <SearchIcon />
              </Box>
              {/* <Typography className={classes.font}>Boston, USA</Typography>
							<Typography className={classes.font}>Seoul, South Korea</Typography>
							<Typography className={classes.font}>Venice, Italy</Typography>
							<Typography className={classes.font}>South Island, New Zealand</Typography>
							<Typography className={classes.font}>London, England</Typography>
							<Typography className={classes.font}>UC Berkeley, USA</Typography>
							<Typography className={classes.font}>Tokyo, Japan</Typography>
							<Typography className={classes.font}>Boston, USA</Typography>
							<Typography className={classes.font}>Las Vagas, USA</Typography>
							<Typography className={classes.font}>New York City, USA</Typography>
							<Typography className={classes.font}>Bali, Indonesia</Typography>
							<Typography className={classes.font}>New Jersey, USA</Typography>
							<Typography className={classes.font}>Daejeon, South Korea</Typography>
							<Typography className={classes.font}>Beijing, China</Typography>
							<Typography className={classes.font}>Busan, South Korea</Typography>
							<Typography className={classes.font}>Texas, USA</Typography> */}
              {explanationText}
            </Box>
          )}
          <Button height={400} onClick={() => setIsSearchPanel(!isSearchPanel)}>
						{isSearchPanel ? <ArrowBackIosIcon></ArrowBackIosIcon> : <ChevronRightIcon></ChevronRightIcon>}
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
					{isTalkPanel ? <ArrowBackIosIcon></ArrowBackIosIcon> : <ChevronRightIcon></ChevronRightIcon>}
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
              <Typography className={classes.font}>
                1. qwerty(20 reports)
              </Typography>
              <Typography className={classes.font}>
                2. cherry(19 reports)
              </Typography>
              <Typography className={classes.font}>
                3. momjeans(16 reports)
              </Typography>
              <Typography className={classes.font}>
                4. programmer(15 reports)
              </Typography>
              <Typography className={classes.font}>
                5. janet(14 reports)
              </Typography>
              <Typography className={classes.font}>
                6. bobbuilder(11 reports)
              </Typography>
              <Typography className={classes.font}>
                7. carrot(10 reports)
              </Typography>
              <Typography className={classes.font}>
                8. teambob(9 reports)
              </Typography>
              <Typography className={classes.font}>
                9. drinkbeer(7 reports)
              </Typography>
              <Typography className={classes.font}>
                10. starbucks(6 reports)
              </Typography>
              <Typography className={classes.font}>
                11. angel(4 reports)
              </Typography>
              <Typography className={classes.font}>
                12. asdf(3 reports)
              </Typography>
              <Typography className={classes.font}>
                13. blanket(2 reports)
              </Typography>
              <Typography className={classes.font}>
                14. password(1 reports)
              </Typography>
              <Typography className={classes.font}>
                15. dave(0 reports)
              </Typography>
            </Box>
          )}
          <Button height={400} onClick={() => setIsRankPanel(!isRankPanel)}>
					{isRankPanel ? <ArrowBackIosIcon></ArrowBackIosIcon> : <ChevronRightIcon></ChevronRightIcon>}
          </Button>
          {/* <PopUpInput /> */}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={4}>
				<Box width={400} border={1} p={2}>
          <h2>Team: Fun Cool Sassy</h2>
          <h3>Entrepreneur</h3>
          <p>Young-ji Sim(0g@soongsil.ac.kr)</p>
          <h3>Designer</h3>
          <p>Minju Kim(democracy0218@gmail.com)</p>
          <h3>Developer</h3>
          <p>Minju Kim(minj01134@gmail.com)</p>
          <p>Siyual Bak(siyual.bak@gmail.com )</p>
          <p>Yeong-u Song(songyw9812@gmail.com)</p>
          <p>Yoojeong Lee(yjclarelee@postech.ac.kr)</p>
          <br />
          <p>Junction X Seoul</p>
        </Box>
      </TabPanel>
    </div>
  );
};

export default Navigation;
