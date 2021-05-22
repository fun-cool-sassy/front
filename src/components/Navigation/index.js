import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Tab,Tabs,Typography} from '@material-ui/core';
import Maps from '../Maps';
import styled from "styled-components";
import Search from '../Search';
import PopUp from "../PopUpInfo";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Rank from '../Rank';


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
}));
const Navigation = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [isSearchPanel, setIsSearchPanel] = React.useState(true);
	const [isTalkPanel, setIsTalkPanel] = React.useState(true);
	const [isRankPanel, setIsRankPanel] = React.useState(true);
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
				<Box className={classes.displayFlex} >
					{isSearchPanel && (
						<Search/>
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
						<Search/>
					)}
					<Button height={400} onClick={() => setIsTalkPanel(!isTalkPanel)}>
						<ArrowBackIosIcon></ArrowBackIosIcon>
					</Button>
					<PopUp />
				</Box>
			</TabPanel>
			<TabPanel value={value} index={3}>
				{ isRankPanel && <Rank onClickButton={() => setIsRankPanel(!isRankPanel)}/>}
			</TabPanel>
			<TabPanel value={value} index={4}>
				Item Five
			</TabPanel>
		</div>
	);
};

export default Navigation;
