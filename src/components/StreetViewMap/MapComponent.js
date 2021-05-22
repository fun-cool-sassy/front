import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React,{Component,useEffect, useState} from 'react';
import {GoogleMap, useJsApiLoader, StreetViewPanorama} from '@react-google-maps/api';
import { render } from '@testing-library/react';

export const  MapComponent =() =>{
    const [streetViewPanorama, setStreetViewPanorama] = useState(null);
    const [location, setLocation] = useState(null);
  
    const containerStyle = {
      width: '100%',
      height: '100%',
      position:'relative'
    };
    
    const center = {
      lat: -3.745,
      lng: -38.523
    };

  useEffect(() => {
    if (location != null) {
      const latLng = location.latLng;
      console.log(latLng.lat());
      console.log(latLng.lng());
    }
  }, [location])
    
   
  return(
    <>
    <GoogleMap
        id="googleMap"
        clickableIcons={false}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}        
    >
       <StreetViewPanorama
        onLoad={e=>setStreetViewPanorama(e)}
      
          defaultPosition={center}
          visible={true}
          mapContainerStyle={containerStyle}
          onPanoChanged={() => {
            if (streetViewPanorama != null) {
              setLocation(streetViewPanorama.getLocation())
            }
          }}
          onPovChanged={
            ()=>{
              console.log(streetViewPanorama.getPov())
            }
          }
        />
    </GoogleMap>
    </>
  )
}
 
export default MapComponent;