import React,{useState,useEffect,Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {searchAddress} from '../../API/'
import GoogleMapReact from 'google-map-react';

import { List, ListItem,ListItemText } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

  const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Search = ()=>{
    const classes = useStyles();
    const [keyword,setKeyword]=useState();
    const [location,setLo] = useState();
    const [result,setResult] = useState();
    const [selected,setSelect] = useState();
    const containerStyle = {
        width: '400px',
        height: '400px'
      };
      
      const center = {
        lat: -3.745,
        lng: -38.523
      };
    return(
        <Paper>
            <Paper>
                <InputBase
                    className={classes.input}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange = {(e)=>{setKeyword(e.target.value)}}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={()=>searchAddress(keyword).then(e=>{setResult(e.data.results);})}>
                    <SearchIcon />
                </IconButton>
            </Paper>
                {result?
                <List component="nav" aria-label="secondary mailbox folder">
                    {
                        result.map((index,key)=>{
                                return(
                                    <ListItem
                                        button
                                        onClick={(event) => {setSelect(event.target);console.log(event)}}
                                    >
                                        <ListItemText primary={index.name} secondary={index.formatted_address ? index.formatted_address : null}/>
                                    </ListItem>)
                        })
                    }
              </List>
                
                :<div>Loading</div>
}
            <div style={{ height: '70vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyA_crOYEj2K4emrHWkGZsBiqm5Hw7jNyS4'}}
                defaultCenter={{lat:33,lng:30}}
                defaultZoom={7}
                >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
                </GoogleMapReact>
            </div>
        </Paper>
    )
}
export default Search;