'use client';

import { MapContainer, Circle, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type CircleType = {
  lat: number;
  lng: number;
  radius: number;
};

export default function MapComponent({ circleRad } : { circleRad: number }) {
  const defaultCircle: CircleType = {
    lat: 43.6532,
    lng:-79.3870,
    radius: circleRad
  } 
  const [hasMounted, setHasMounted] = useState(false);
  const [circle, setCircle] = useState<CircleType>(defaultCircle);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newCircle: CircleType = {
          lat,
          lng,
          radius: circleRad
        };
        setCircle(newCircle);
      },
    });
    return null;
  };

  // Ensure we only return this on client
  useEffect(() => {
    setHasMounted(true);
    L.Icon.Default.prototype.options.iconUrl = "/images/marker.svg";
    L.Icon.Default.prototype.options.shadowUrl = '';
  });

  // Update the circle radius if circleRad updated
  useEffect(() => {
    setCircle({
      lat: circle.lat,
      lng: circle.lng,
      radius: circleRad
    });
  }, [circleRad]);

  return hasMounted? (
  <MapContainer center={[43.6532, -79.3870]} zoom={13} scrollWheelZoom={true} className="w-full h-screen" >
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      attribution='&copy; <a href="https://carto.com/">CARTO</a>'    
    />
    <Marker position={[43.6532, -79.3870]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>

    <MapClickHandler />

    <Circle
      key={circle.lat}
      center={[circle.lat, circle.lng]}
      radius={circle.radius}
      color="grey"
    />
  </MapContainer>
  ): null;
}