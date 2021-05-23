
import React,{Component,useEffect, useState} from 'react';
import {GoogleMap,Marker, useJsApiLoader, StreetViewPanorama} from '@react-google-maps/api';
import { render } from '@testing-library/react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog,Grid, Fab ,AppBar,Toolbar,IconButton,Typography,TextField,MenuItem,Button, Container} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SettingsPowerRounded } from '@material-ui/icons';
import {getArticleList, postArticle} from '../../API';
import {Redirect} from 'react-router';
export const  MapComponent =() =>{
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
        title: {
          marginLeft: theme.spacing(2),
          flex: 1,
        },
      }));
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handlePostApi = ()=>{
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
            postArticle(data,headers).then(e=>
                setRedirect(true)
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
    <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>dd</Fab>
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
        <AppBar className={classes.appBar}>
          <Toolbar>
            
            <Typography variant="h6" center className={classes.title}>
              Suggestions.
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} >
        <Grid item xs={7}>
          <img src={'/assets/images/Logo_Line.png'}/>
          <Typography variant="h6" center className={classes.title}>
            {address}
          </Typography>
          <Typography graphy variant="p" center className={classes.title}>
            DATE. {date.toTimeString()}
          </Typography>
        <img width={'100%'} src={`https://maps.googleapis.com/maps/api/streetview?location=${location.lat},${location.lng}&size=656x456&fov=80&heading=${pov.heading}&pitch=${pov.pitch}&key=AIzaSyDP5khM0bM6hxMmn1nkIO6d4I1bnHy6kdw`}/>
        </Grid>
          <Grid item xs={5}>
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
            >
              {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
            </TextField>
              <Typography variant="p" left  className={classes.title}>
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
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}
 
export default MapComponent;