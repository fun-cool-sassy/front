import React from 'react';
import { ScreenCapture } from 'react-screen-capture';
import App from '../../App';
import { StreetViewMap } from '../StreetViewMap';
import react, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useScreenshot } from "use-screenshot-hook";
import {Button,Dialog,Slide,DialogTitle,DialogContent,DialogActions,DialogContentText} from '@material-ui/core';
import html2canvas from 'html2canvas';

const ScreenShot = () => {
    const { image, takeScreenshot } = useScreenshot();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [src,setSrc]=useState();
    const onLoad = useCallback((img) => {
        imgRef.current = img;
      }, []);
     
      const handleClickOpen = () => {
        setOpen(true);
      };
        const handleClose = () => {
            setOpen(false);
        };
    
    const copyDOM = async () => {
        window.scrollTo(0, 0);

        let url = "";
        await html2canvas(document.getElementById("googleMap")).then(async (canvas) => {
            url = await canvas.toDataURL("image/jpg");
            console.log(url);
            setSrc(url);
        });

    }
    return (
      <div>
        <button onClick={() =>copyDOM()}>screenshot</button>
        {src&&<img src={src} width={400} height={300}/>}
        <Button id={'iloveu'} variant="outlined" color="primary" onClick={handleClickOpen}>
        ScreenShot
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Plz Crop the Image!"}</DialogTitle>
        <DialogContent>
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Next
          </Button>
        </DialogActions>
      </Dialog>
       
        
      </div>
    );
  };

export default ScreenShot;