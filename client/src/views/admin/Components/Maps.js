
import React, { useState  } from 'react';
import { Search, Filter, MapPin, User, Truck } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const Maps = () => {
  const position = [30.704649, 76.717873]; // Default position (latitude, longitude)
  const [vehicles, setVehicles] = useState([
    { id: '142', speed: '0 MPH', location: '0.0 mi E Brule, Keith County, NE, 69127', driver: 'Gurjeet Bhullar', trailer: 'No Trailer' },
    { id: '108', speed: '0 MPH', location: 'Jackolyn Dr, 0.0 mi E Manteca, San Joaquin County, CA, 95336', driver: 'Amritpal Singh', trailer: 'No Trailer' },
    { id: '151', speed: '0 MPH', location: 'Prospect Ave NE, 0.0 mi E Albuquerque, Bernalillo County, NM, 87107', driver: 'Gregory Reguero', trailer: 'No Trailer' },
    { id: '79', speed: '0 MPH', location: '', driver: 'No Driver', trailer: 'No Trailer' },
    { id: 'Truck 07', speed: '0 MPH', location: '', driver: '', trailer: '' },
  ]);
  return (
    <div><MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={position}>
        <Popup>
            A pretty popup. <br /> Easily customizable.
        </Popup>
    </Marker>
</MapContainer></div>
  )
}

export default Maps