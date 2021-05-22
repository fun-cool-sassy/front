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

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		height: '90vh',
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
}));

function Rank({
  onClickButton,
}) {
  const classes = useStyles()
	const [content, setContent] = React.useState("");

	const handleContent = (event) => {
		setContent(event.target.value);
  };

  return (
    <Box className={classes.displayFlex}>
      <Box className={classes.searchPanel} display="flex" flexDirection="column">
        <FormControl className={classes.dialog}>
        <InputLabel id="demo-simple-select-label">Rank</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={content}
          onChange={handleContent}
        >
          <MenuItem value={'UserRank'}>User Rank</MenuItem>
          <MenuItem value={'TargetRank'}>Target Rank</MenuItem>
          <MenuItem value={'ProblemRank'}>Problem Rank</MenuItem>
        </Select>
      </FormControl>
      </Box>
      <Button height={400} onClick={onClickButton}>
        <ArrowBackIosIcon></ArrowBackIosIcon>
      </Button>
      <PopUp />
    </Box>
  )
}

export default Rank
