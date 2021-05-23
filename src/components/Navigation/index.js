import React, {
	useState,useEffect
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
const Navigation = (position,setPosition) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const [showPannel, setShowPanel] = useState(false);

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
				<Tab label="Logo" {...a11yProps(0)} />
				<Tab label="Map" {...a11yProps(1)} />
				<Tab label="Talk" {...a11yProps(2)} />
				<Tab label="Rank" {...a11yProps(3)} />
				<Tab label="Etc" {...a11yProps(4)} />
                {handleLoginButton()}
                
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
					<Talk position={position}/>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<Rank />
					<PopUp />
				</TabPanel>
				<TabPanel value={value} index={4}>
					Item Five
				</TabPanel>
                
			</Pannel>
            <StreetViewMap setPosition={setPosition()}/>
		</div>
	);
};

export default Navigation;
