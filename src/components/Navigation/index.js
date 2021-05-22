import React, {
	useState,
	useCallback,
	useMemo,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import {Box,Tab,Tabs,Typography} from '@material-ui/core';
import Search from '../Search';
import PopUp from "../PopUpInfo";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Rank from '../Rank'
import StreetViewMap from '../StreetViewMap'
import Pannel from '../Pannel';
import Footer from '../Footer';

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
		height: '100%',
		wdith: '100vw',
	},
	tabs: {
		width: '180px',
		backgroundColor: '#FFFFFF',
		zIndex: 100,
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
}));
const Navigation = () => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const [showPannel, setShowPanel] = useState(false);

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
				onMouseEnter={() => setShowPanel(true)}
				onMouseLeave={() => setShowPanel(false)}
			>
				<Tab label="Logo" {...a11yProps(0)} />
				<Tab label="Map" {...a11yProps(1)} />
				<Tab label="Talk" {...a11yProps(2)} />
				<Tab label="Rank" {...a11yProps(3)} />
				<Tab label="Etc" {...a11yProps(4)} />
			</Tabs>
			<Pannel show={showPannel}>
				<TabPanel value={value} index={0}>
					Item One
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Search/>
					<PopUp />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Search/>
					<PopUp />
				</TabPanel>
				<TabPanel value={value} index={3}>
					<Rank />
					<PopUp />
				</TabPanel>
				<TabPanel value={value} index={4}>
					Item Five
				</TabPanel>
			</Pannel>
            <StreetViewMap/>
		</div>
	);
};

export default Navigation;
