
import React,{Component,useEffect, useState} from 'react';
import {GoogleMap,Marker, useJsApiLoader, StreetViewPanorama} from '@react-google-maps/api';
import { render } from '@testing-library/react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog,Grid, Fab ,AppBar,Toolbar,IconButton,Typography,TextField,MenuItem,Button, Container} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SettingsPowerRounded } from '@material-ui/icons';
import {getArticleList, postArticle} from '../../API';
import {Redirect} from 'react-router';
import Box from "@material-ui/core/Box";
import createHistory from 'history/createBrowserHistory'
export const  MapComponent =(props) =>{
  const { onLocationChange } = props;
  const [streetViewPanorama, setStreetViewPanorama] = useState(null);
  const [location, setLocation] = useState({lat:-3.745,lng:-38.523});
  const [pov, setPov] = useState({headeing:0,pitch:0});
  const [open,setOpen]=useState(false);
  const [title,setTitle] = useState();
  const [target,setTarget] = useState();
  const [contents,setContents] = useState();
  const [address,setAddress] = useState();
  const [redirect,setRedirect]=useState(false);
  const [markers,setMarkers]=useState();
  const date = new Date();
  const containerStyle = {
    width: '100%',
    height: '100%',
    position:'relative'
  };

  useEffect(() => {
    if (onLocationChange != null) {
      onLocationChange(location);
    }
  }, [onLocationChange, location]);

  const center = {
    lat: -3.745,
    lng: -38.523
  };
  const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex:99
    },
    appBar: {
      position: 'relative',
    },
    date: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: "#000000"

    },
    address: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: "#0045FF"
    },
    text: {
      flex: 1,
      color: "#000000"
    },
    side: {
      // backgroundColor: "#0045FF"
    },
    title: {
      textAlign: "center",
      width: "100%",
      color: "#FFFFFF"
    },
    form: {

    }
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePostApi = ()=>{
    const history = createHistory();
    if(title&&contents&&target){
      const data = {
        content_location:`https://maps.googleapis.com/maps/api/streetview?location=${location.lat},${location.lng}&size=656x456&fov=80&heading=${pov.heading}&pitch=${pov.pitch}&key=AIzaSyDP5khM0bM6hxMmn1nkIO6d4I1bnHy6kdw`,
        latitude:location.lat,
        longitude:location.lng,
        detail:contents,
        targets:[target],
        address:address,
        problems:['a']

      }
      const headers={
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
      postArticle(data,headers).then(e=>{
        setRedirect(true);
        setOpen(false);
        history.go(0);
      }
      );
    }
    else{
      alert('Please type required input form');
    }

  }
  const handleGetMarkers = ()=>{
    const data = `
          latitude=${location.lat}&
          longitude=${location.lng}
      `
    const headers={
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
    getArticleList(data,headers).then(e=>{
      setMarkers(e);
      console.log(e);}
    )
  }
  useEffect(() => {
    handleGetMarkers();
  }, [])
  const currencies = [
    {
      value: 'Wheelchair',
      label: 'Wheelchair',
    },
    {
      value: 'Old-man',
      label: 'Old-man',
    },
    {
      value: 'Child',
      label: 'Child',
    },
    {
      value: 'Others',
      label: 'Others',
    },
  ];
  const classes = useStyles();
  return(
    <>
      <Fab aria-label="add" className={classes.fab} onClick={handleClickOpen}>ADD</Fab>
      <GoogleMap
        id="googleMap"
        clickableIcons={false}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
      >
        {markers&& markers.map((index,key)=>{
          return(
            <Marker key={key}  position={{lat: index.latitude,lng: index.longitude}}/>
          )
        })}

        <StreetViewPanorama
          onLoad={e=>setStreetViewPanorama(e)}

          position={{lat:location.lat,lng:location.lng}}
          visible={true}
          mapContainerStyle={containerStyle}
          onPanoChanged={() => {
            if (streetViewPanorama != null) {
              setLocation({lat:streetViewPanorama.getPosition().lat(),lng:streetViewPanorama.getPosition().lng()})
              setAddress(streetViewPanorama.getLocation().description);
            }
          }}
          onPovChanged={
            ()=>{
              if (streetViewPanorama != null) {
                setPov(streetViewPanorama.getPov())
              }
            }
          }
          options={{clickToGo:false, enableCloseButton:false, addressControl:false,fullscreenControl:false,zoomControl:false,panControl:false}}
        ></StreetViewPanorama>
      </GoogleMap>
      <Dialog fullScreen open={open} onClose={handleClose} >
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar >
            <Typography variant="h6" center className={classes.title} style={{verticalAlign: "middle"}}>
              Suggestions.
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container >
          <Grid item xs={8}>
            <Box padding={10}>
              <Box display="flex" flex="1" alignItems="center">
                <Box padding={1}>
                  <img src={'/assets/images/Logo_Line.png'}/>
                </Box>
                <Box>
                  <Typography variant="h6" center className={classes.address}>
                    {address}
                  </Typography>
                  <Typography graphy variant="p" center className={classes.date}>
                    DATE. {date.toTimeString()}
                  </Typography>
                </Box>
              </Box>
              <img width={'100%'} src={`https://maps.googleapis.com/maps/api/streetview?location=${location.lat},${location.lng}&size=656x456&fov=80&heading=${pov.heading}&pitch=${pov.pitch}&key=AIzaSyDP5khM0bM6hxMmn1nkIO6d4I1bnHy6kdw`}/>

            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box height="100%" width="100%" className={classes.side} paddingTop={5} paddingBottom={5}>
              <Container>
                { redirect&&
                <Redirect to='/'/>
                }
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    select
                    id="target"
                    label="For."
                    name="target"
                    autoComplete="target"
                    autoFocus
                    onChange={e=>setTarget(e.target.value)}
                    className={classes.text}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="p" left  className={classes.title} >
                    Detail.
                  </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="id"
                    label="Title"
                    name="id"
                    autoComplete="id"
                    autoFocus
                    onChange={e=>setTitle(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    multiline
                    fullWidth
                    id="contents"
                    label="Contents."
                    name="contents"
                    rows={8}
                    autoComplete="contents"
                    autoFocus
                    onChange={e=>setContents(e.target.value)}
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handlePostApi}
                  >
                    Done.
                  </Button>

                </form>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default MapComponent;