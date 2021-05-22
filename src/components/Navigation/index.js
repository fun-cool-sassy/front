import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Tab,Tabs,Typography} from '@material-ui/core';
import Maps from '../Maps';
import styled from "styled-components";
import Search from '../Search';

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
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: '75vh',
      
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      
    }
  }));
  const WrapperBox = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
`;
  const Navigation = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return(
        <WrapperBox>
        <div className={classes.root}>
            
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="메인" {...a11yProps(0)} />
          <Tab label="지도" {...a11yProps(1)} />
          <Tab label="검색" {...a11yProps(2)} />
          <Tab label="랭킹" {...a11yProps(3)} />
          <Tab label="팀 소개" {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={0}>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Search/>
            
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Search/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
      </div>
      <Maps/>
      </WrapperBox>
    )
}

export default Navigation;