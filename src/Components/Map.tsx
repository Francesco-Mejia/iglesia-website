import React from 'react';
import { Container } from 'react-bootstrap';
import { GoogleMap, Marker, useJsApiLoader, MarkerProps } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
};

const center: google.maps.LatLngLiteral = {
  lat: 46.80464968967547,
  lng: -71.2418548055773,
};

const options: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true,
  mapTypeId: 'roadmap',
  clickableIcons: true,
  draggable: true,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  styles: [
    {
      featureType: "all" as google.maps.MapTypeStyleFeatureType,
      elementType: "labels.text.fill" as google.maps.MapTypeStyleElementType,
      stylers: [{ color: '#333333' }]
    },
    {
      featureType: "water" as google.maps.MapTypeStyleFeatureType,
      elementType: "geometry" as google.maps.MapTypeStyleElementType,
      stylers: [{ color: '#e9e9e9' }]
    },
    {
      featureType: "landscape" as google.maps.MapTypeStyleFeatureType,
      elementType: "geometry" as google.maps.MapTypeStyleElementType,
      stylers: [{ color: '#f5f5f5' }]
    }
  ]
};

const markerProps: MarkerProps = {
  position: center,
  animation: google.maps.Animation.DROP,
  title: "Eglise Le Reste De Sa Grace / Iglesia El Remanente de Su Gracia",
  clickable: true
};

export function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'googleMaps',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    version: "weekly",
    language: "fr",
    region: "CA"
  });

  if (!isLoaded) return null;

  return (
    <section className="map-section" id="ubicacion">
      <Container fluid className="px-4 py-5">
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={options}
          >
            <Marker {...markerProps} />
          </GoogleMap>
        </div>
      </Container>
    </section>
  );
}