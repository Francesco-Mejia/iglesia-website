import React from 'react';
import { GoogleMap, Marker, useJsApiLoader, type GoogleMapProps } from '@react-google-maps/api';

const containerStyle = 
{
  width: '500px',
  height: '500px',
};
const center = 
{
  lat: 46.80464968967547,
  lng: -71.2418548055773,
};

export function Map() 
{
  const { isLoaded } = useJsApiLoader({
    id: 'googleMaps',
    googleMapsApiKey: 'AIzaSyDlhfK31EYCr7rqbpmNYyOPN7C2wLY5ayI',
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) 
  {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) 
  {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div id='mapa' className="map-container">
        <h2>Ubicación</h2>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}   
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={center} title="Eglise Le Reste De Sa Grace / Iglesia El Remanente de Su Gracia" />
        </GoogleMap>
    </div>
  ) : <></>;
}