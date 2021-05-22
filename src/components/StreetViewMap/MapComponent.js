import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React,{Component} from 'react';
export class MapComponent extends Component {
    
  render() {
    return (
      <Map google={this.props.google}  zoom={14} initialCenter={{ lat: 37.715133, lng: 126.734086}}>
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyA_crOYEj2K4emrHWkGZsBiqm5Hw7jNyS4')
})(MapComponent)