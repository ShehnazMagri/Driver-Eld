import React, { useState, useRef, useEffect } from 'react';
import {
  Container, Row, Col, Form, InputGroup, Button, Card
} from 'react-bootstrap';

import { Search, Truck, MapPin, User } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const SearchMap = () => {
  const [trucks, setTrucks] = useState([
    { id: '142', speed: '0 MPH', location: [41.2587, -95.9378], address: 'Brule, Keith County, NE, 69127', driver: 'Gurjeet Bhullar', trailer: 'No Trailer' },
    { id: '108', speed: '0 MPH', location: [37.7972, -121.2161], address: 'Jackolyn Dr, Manteca, San Joaquin County, CA, 95336', driver: 'Amritpal Singh', trailer: 'No Trailer' },
    { id: '151', speed: '0 MPH', location: [35.1047, -106.6311], address: 'Prospect Ave NE, Albuquerque, Bernalillo County, NM, 87107', driver: 'Gregory Reguero', trailer: 'No Trailer' },
    { id: '79', speed: '0 MPH', location: [39.7392, -104.9903], address: 'Denver, CO', driver: 'No Driver', trailer: 'No Trailer' },
    { id: 'Truck 07', speed: '0 MPH', location: [34.0522, -118.2437], address: 'Los Angeles, CA', driver: 'John Doe', trailer: 'Trailer 123' },
    { id: 'Truck 08', speed: '0 MPH', location: [34.0522, -118.2437], address: 'mohali', driver: 'John Doe', trailer: 'Traddiler 563' },
  ]);

  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]); // Center of the US
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const mapRef = useRef();

  const handleSearch = async (e) => {
    e.preventDefault();
    // First, check if the search matches a truck
    const truck = trucks.find(t =>
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.driver.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (truck) {
      setMapCenter(truck.location);
      setSearchResult({ type: 'truck', data: truck });
      if (mapRef.current) {
        mapRef.current.setView(truck.location, 13);
      }
    } else {
      // If not a truck, search for the location
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const newCenter = [parseFloat(lat), parseFloat(lon)];
          setMapCenter(newCenter);
          setSearchResult({ type: 'location', data: { location: newCenter, address: data[0].display_name } });
          if (mapRef.current) {
            mapRef.current.setView(newCenter, 13);
          }
        } else {
          alert('Location not found');
        }
      } catch (error) {
        console.error('Error searching for location:', error);
        alert('Error searching for location');
      }
    }
  };

  const MapUpdater = () => {
    const map = useMap();
    mapRef.current = map;
    return null;
  };

  const getMarkerColor = (truckId) => {
    const colors = {
      '142': 'orange',
      '108': 'green',
      '151': 'red',
      '79': 'blue',
      'Truck 07': 'purple'
    };
    return colors[truckId] || 'gray';
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={4} className="bg-white p-3 overflow-auto" style={{ height: '100vh' }}>
          <Form onSubmit={handleSearch} style={{ background: "#846CF9", borderRadius: "5px", padding: "20px" }}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <Search size={30}  />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search truck, driver, or location"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderRadius: "0 5px 5px 0",height:"45px" }}
              />
              <Button
                variant="outline-secondary"
                type="submit"
                style={{
                  borderRadius: "0 5px 5px 0",
                  backgroundColor: "white",

                  borderColor: "#d3d3d3"
                }}
              >
                Search
              </Button>

            </InputGroup>
          </Form>

          {searchResult && searchResult.type === 'location' && (
            <Card className="mb-3">
              <Card.Body className="p-2">
                <h6>Search Result</h6>
                <p>{searchResult.data.address}</p>
              </Card.Body>
            </Card>
          )}

          {trucks.length > 0 ? (
            trucks.map((truck) => (
              <Card key={truck.id} className="mb-3">
                <Card.Body className="p-2">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: getMarkerColor(truck.id),
                          marginRight: '8px',
                        }}
                      ></div>
                      <h6 className="mb-0">{truck.id}</h6>
                    </div>
                    <small>{truck.speed}</small>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <MapPin size={16} className="me-2" />
                    <small>{truck.address}</small>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <User size={16} className="me-2" />
                    <small>{truck.driver}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <Truck size={16} className="me-2" />
                    <small>{truck.trailer}</small>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No trucks found.</p>
          )}
        </Col>


        <Col md={8} className="p-0">
          <MapContainer center={mapCenter} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapUpdater />
            {trucks.map(truck => (
              <Marker
                key={truck.id}
                position={truck.location}
                icon={L.divIcon({
                  className: 'custom-icon',
                  html: `<div style="background-color: ${getMarkerColor(truck.id)}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
                  iconSize: [24, 24],
                  iconAnchor: [12, 12]
                })}
              >
                <Popup>
                  <div>
                    <h6>{truck.id}</h6>
                    <p>{truck.driver}</p>
                    <p>{truck.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            {searchResult && searchResult.type === 'location' && (
              <Marker
                position={searchResult.data.location}
                icon={L.divIcon({
                  className: 'custom-icon',
                  html: `<div style="background-color: yellow; width: 24px; height: 24px; border-radius: 50%; border: 2px solid black;"></div>`,
                  iconSize: [24, 24],
                  iconAnchor: [12, 12]
                })}
              >
                <Popup>
                  <div>
                    <h6>Search Result</h6>
                    <p>{searchResult.data.address}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchMap;