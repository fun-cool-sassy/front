import React, {
	useState,
	useCallback,
	useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Tab,Tabs,Typography} from '@material-ui/core';
import Search from '../Search';
import PopUp from "../PopUpInfo";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Rank from '../Rank'

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
		height: '90vh',
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
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
	const [value, setValue] = useState(0);

	const [showPanel, setShowPanel] = useState(true);

	const handleTogglePanel = useCallback(() => {
		setShowPanel(!showPanel)
	}, [showPanel])

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const PannelButtonComponent = useMemo(() => (
		<Button height={'100%'} onClick={handleTogglePanel}>
			<ArrowBackIosIcon></ArrowBackIosIcon>
		</Button>
	), [handleTogglePanel])

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
				<Box className={classes.displayFlex} >
					{ showPanel && <Search/> }
					{ PannelButtonComponent }
					<PopUp />
				</Box>
			</TabPanel>
			<TabPanel value={value} index={2}>
			<Box className={classes.displayFlex}>
					{ showPanel && <Search/> }
					{ PannelButtonComponent }
					<PopUp />
				</Box>
			</TabPanel>
			<TabPanel value={value} index={3}>
			<Box className={classes.displayFlex}>
					{ showPanel && <Rank /> }
					{ PannelButtonComponent }
					<PopUp />
				</Box>
			</TabPanel>
			<TabPanel value={value} index={4}>
				Item Five
			</TabPanel>
		</div>
	);
};

export default Navigation;
