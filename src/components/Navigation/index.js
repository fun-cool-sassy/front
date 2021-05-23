import React, {
	useState,useEffect, useCallback
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Button,Tab,Tabs,Typography} from '@material-ui/core';
import PopUp from "../PopUpInfo";
import Pannel from '../Pannel';
import Search from '../Search';
import Talk from '../Talk'
import Rank from '../Rank'
import StreetViewMap from '../StreetViewMap'
import createHistory from 'history/createBrowserHistory'
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
	const [location, setLocation] = useState(null);

    const [login,setLogin]=useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
    const handleLoginButton = ()=>{
        if(login){
            const history = createHistory();
            return(
                <Button onClick={()=>{localStorage.removeItem('token');history.go(0)}}>Log out</Button>
            )
        }
        else{
            
            
            return(
                <Button href="/signin" >Log in</Button>
            )
        }
        
    }
    const handleLocation = useCallback(
        (location) => {
            setLocation(location)
        },
        [setLocation],
    )

    useEffect(() => {
        if(localStorage.getItem('token')){
            setLogin(true);
        }
    }, [])
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
				<Tab icon={<img alt="test avatar" src="/assets/images/Logo_Line.png" />}  {...a11yProps(0)} />
				<Tab icon={<img alt="test avatar" src="/assets/images/map.png" />} {...a11yProps(1)} />
				<Tab icon={<img alt="test avatar" src="/assets/images/talk.png" />} {...a11yProps(2)} />
				<Tab icon={<img alt="test avatar" src="/assets/images/rank.png" />} {...a11yProps(3)} />
				<Tab icon={<img alt="test avatar" src="/assets/images/etc.png" />} {...a11yProps(4)} />
                {handleLoginButton()}
                
			</Tabs>
			<Pannel show={showPannel}>
				<TabPanel value={value} index={0}>
					<Typography variant="subtitle1">
Explore the world via Google Street View, and check non-barrier free zones on Google Earth maps and shares it among users. Let’s help users who have barriers and become bounty hunter.
                    </Typography>
                    <Typography varient="subtitle1">
                        How to use
                    </Typography>
                    <Typography varient="subtitle1">
                    1)Choose street that you want to explore and click.<br/>
                    2)Street Views will then be shown from the area you see in the map.<br/>
                    3)Explore map and check non-barrier free zone. <br/>
                    4)Click [Sugestion.] button to share.<br/>
                    5)You can search non-barrier free zone with our SNS channel on left tab.<br/>
                    6)Cheer up! Let’s find out more than others! Raise the ranking!<br/>
                    </Typography>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Search/>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Talk location={location} />
				</TabPanel>
				<TabPanel value={value} index={3}>
					<Rank />
				</TabPanel>
				<TabPanel value={value} index={4}>
					Item Five
				</TabPanel>
                
			</Pannel>
            <StreetViewMap onLocationChange={handleLocation} />
		</div>
	);
};

export default Navigation;
