
import { compose, withProps } from "recompose";
import React, { useEffect } from 'react';



const Maps = ()=> {
    useEffect(() => {
        const script = document.createElement("script");
        script.innerHTML = `         
            function initialize() {
                const fenway = { lat: 42.345573, lng: -71.098326 };
                const map = new google.maps.Map(document.getElementById("GoogleMap"), {
                center: fenway,
                zoom: 14,
                });
                const panorama = new google.maps.StreetViewPanorama(
                    document.getElementById("GoogleMap2"),
                {
                    position: fenway,
                    pov: {
                    heading: 34,
                    pitch: 10,
                    },
                }
                );
                map.setStreetView(panorama);
            }
            
            initialize();
           
       `;
        script.type = "text/javascript";
        script.async = "async";
        document.head.appendChild(script);
      }, []);
    
    return(
        <div>
            <div
                id="GoogleMap"
                style={{
                    height: "500px",
                    width: "500px",
                    float: "left",
                }}
            />
             <div
                id="GoogleMap2"
                style={{
                    height: "500px",
                    width: "900px",
                    float: "left",
                }}
            />
        </div>
    )
}

export default Maps;