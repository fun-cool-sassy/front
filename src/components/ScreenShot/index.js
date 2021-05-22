import React from 'react';
import { ScreenCapture } from 'react-screen-capture';
import App from '../../App';
import { StreetViewMap } from '../StreetViewMap';
import react, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useScreenshot } from "use-screenshot-hook";
import {Button,Dialog,Slide,DialogTitle,DialogContent,DialogActions,DialogContentText} from '@material-ui/core';
const ScreenShot = () => {
    const { image, takeScreenshot } = useScreenshot();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const onLoad = useCallback((img) => {
        imgRef.current = img;
      }, []);
      const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
      const handleClickOpen = () => {
        setOpen(true);
      };
    return (
      <div>
        <h1>Hello World!</h1>
        <button onClick={() =>takeScreenshot()}>screenshot</button>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        ScreenShot
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            이미지 자르기
          </DialogContentText>
          {image && <>
            <ReactCrop
            src={image}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            /></>
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={()=>setOpen(false)} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        {image && <>
        <img src={image} />
        <ReactCrop
        src={image}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        /></>
        }
        
      </div>
    );
  };

export default ScreenShot;