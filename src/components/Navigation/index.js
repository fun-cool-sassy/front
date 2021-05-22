import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import PopUp from "../PopUp";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

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
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		height: 224,
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	searchPanel: {
		height: 500,
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
}));
const Navigation = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [isSearchPanel, setIsSearchPanel] = React.useState(true);
	const [isTalkPanel, setIsTalkPanel] = React.useState(true);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
				<Tab label="Logo" {...a11yProps(0)} />
				<Tab label="Map" {...a11yProps(1)} />
				<Tab label="Talk" {...a11yProps(2)} />
				<Tab label="Rank" {...a11yProps(3)} />
				<Tab label="Etc" {...a11yProps(4)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				Item One
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Box className={classes.displayFlex}>
					{isSearchPanel && (
						<Box className={classes.searchPanel} border={1}>
							<Box className={classes.displayFlexCenter}>
								<InputBase
									placeholder="Search…"
									inputProps={{ "aria-label": "search" }}
								/>
								<SearchIcon />
							</Box>
						</Box>
					)}
					<Button height={400} onClick={() => setIsSearchPanel(!isSearchPanel)}>
						<ArrowBackIosIcon></ArrowBackIosIcon>
					</Button>
					<PopUp />
				</Box>
			</TabPanel>
			<TabPanel value={value} index={2}>
			<Box className={classes.displayFlex}>
					{isTalkPanel && (
						<Box className={classes.searchPanel} display="flex" flexDirection="column" border={1}>
							<Box className={classes.displayFlexCenter}>
								<InputBase
									placeholder="Search…"
									inputProps={{ "aria-label": "search" }}
								/>
								<SearchIcon />
							</Box>
							<Button>Near me(1km)</Button>
							<Button>Exclude resolved posts</Button>
						</Box>
					)}
					<Button height={400} onClick={() => setIsTalkPanel(!isTalkPanel)}>
						<ArrowBackIosIcon></ArrowBackIosIcon>
					</Button>
					<PopUp />
				</Box>
			</TabPanel>
			<TabPanel value={value} index={3}>
				Item Four
			</TabPanel>
			<TabPanel value={value} index={4}>
				Item Five
			</TabPanel>
		</div>
	);
};

export default Navigation;
