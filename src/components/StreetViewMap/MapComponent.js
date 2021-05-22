import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React,{Component} from 'react';
import {GoogleMap, useJsApiLoader, StreetViewPanorama} from '@react-google-maps/api';

export const MapComponent =()=> {
  const containerStyle = {
    width: '100%',
    height: '100%',
    position:'relative'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
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
        
          position={center}
          visible={true}
          mapContainerStyle={containerStyle}
        />
    </GoogleMap>
    </>
  )
}
 
export default MapComponent;