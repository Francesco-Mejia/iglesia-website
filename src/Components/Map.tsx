import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
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
    <Row className="map-container">
      <Col md={6} className="map-col"> 
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} title="Eglise Le Reste De Sa Grace / Iglesia El Remanente de Su Gracia" />
        </GoogleMap>
      </Col>
      <Col md={6} className="image-col">
        <Image src="/images/map_icon.png" alt="Imagen de la iglesia" />
      </Col>
    </Row>
  ) : <></>;
}