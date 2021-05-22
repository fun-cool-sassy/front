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

  const AnyReactComponent = ({ text }) => <div style={{width:'10px',height:'10px',backgroundColor:'red',borderRadius:'50%'}}></div>;
const Search = ()=>{
    const classes = useStyles();
    const [keyword,setKeyword]=useState();
    const [location,setLo] = useState();
    const [result,setResult] = useState();
    const [selected,setSelect] = useState(0);
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
                <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={()=>{setSelect(0); searchAddress(keyword).then(e=>{setResult(e.data.results);})}}>
                    <SearchIcon />
                </IconButton>
            </Paper>
                {result?
                <div>
                    <List component="nav" aria-label="secondary mailbox folder">
                        {
                            result.map((index,key)=>{
                                    return(
                                        <ListItem
                                            button
                                            selected = {selected===key}
                                            onClick={(event) => {setSelect(key);console.log(key)}}
                                        >
                                            <ListItemText primary={index.name} secondary={index.formatted_address ? index.formatted_address : null}/>
                                        </ListItem>)
                            })
                        }
                     </List>
                     <div style={{ height: '70vh', width: '100%' }}>
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyA_crOYEj2K4emrHWkGZsBiqm5Hw7jNyS4'}}
                        defaultCenter={{lat:result[0].geometry.location.lat,lng:result[0].geometry.location.lng}}
                        defaultZoom={15}
                        center = {{lat:result[selected].geometry.location.lat,lng:result[selected].geometry.location.lng}}
                        >
                        <AnyReactComponent
                            lat={result[selected].geometry.location.lat}
                            lng={result[selected].geometry.location.lng}
                            text="My Marker"
                        />
                        </GoogleMapReact>
                    </div>
                     </div>
                :<div></div>
}
        
        </Paper>
    )
}
export default Search;