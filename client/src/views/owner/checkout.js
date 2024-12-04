import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createCheckoutSession } from "../../Redux/Action/vehicle";
// import { Form, Row, Col, Card, Button } from "react-bootstrap";
import { Form, Row, Col, Card, Button } from 'react-bootstrap';
import { Calendar } from 'lucide-react';

export default function Checkout() {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  const dispatch = useDispatch();
  // Assuming you have a Redux state that contains selected plan information
  const selectedPlan = useSelector(state => state.vehicle.selectedPlan); // Adjust this based on your state shape
  const price = useSelector(state => state.vehicle.price); // Adj
  const handleAddCard = (e) => {
    debugger
    e.preventDefault();

    // Prepare your checkout data (this can be adjusted based on your requirements)
    const numberOfUsers = 1; // Set this value as needed
    const price = 500; // Adjust the price as needed
    const planType = "Basic Plan"; // Example plan type

    // Dispatch the action to create a checkout session
    dispatch(createCheckoutSession(numberOfUsers, price, planType));
  };

  const styles = {
      card: {
          margin: '50px auto',
          width: '600px',
          padding: '3rem 3.5rem',
          boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          backgroundColor: '#fff',
      },
      title: {
          fontWeight: 700,
          fontSize: '2.5em',
          textAlign: 'center',
      },
      nav: {
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '6vh',
      },
      navItem: {
          padding: '1rem',
      },
      active: {
          borderBottom: '2px solid black',
          fontWeight: 'bold',
      },
      input: {
          border: '1px solid rgba(0, 0, 0, 0.137)',
          padding: '0.5rem',
          borderRadius: '5px',
          width: '100%',
          margin: '2vh 0',
          backgroundColor: 'rgba(221, 228, 236, 0.301)',
      },
      button: {
          width: '100%',
          backgroundColor: 'rgb(65, 202, 127)',
          color: 'white',
          padding: '2vh 0',
          marginTop: '3vh',
          border: 'none',
          cursor: 'pointer',
      },
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>Payment Details</div>
      <div style={styles.nav}>
        <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
          <li style={styles.navItem}><a href="#">Account</a></li>
          <li style={{ ...styles.navItem, ...styles.active }}><a href="#">Payment</a></li>
        </ul>
      </div>
      
      <div>
        <h5>Selected Plan: {selectedPlan}</h5>
        <h5>Price: ${price}</h5>
      </div>

      <form onSubmit={handleAddCard}>
        <span id="card-header">Saved cards:</span>
        {/* Placeholder for saved cards */}
        <div className="row row-1">
          <div className="col-2">
            <img className="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="MasterCard" />
          </div>
          <div className="col-7">
            <input type="text" placeholder="**** **** **** 3193" style={styles.input} />
          </div>
          <div className="col-3 d-flex justify-content-center">
            <a href="#">Remove card</a>
          </div>
        </div>
        <div className="row row-1">
          <div className="col-2">
            <img className="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
          </div>
          <div className="col-7">
            <input type="text" placeholder="**** **** **** 4296" style={styles.input} />
          </div>
          <div className="col-3 d-flex justify-content-center">
            <a href="#">Remove card</a>
          </div>
        </div>

        <span id="card-header">Add new card:</span>
        <div className="row-1">
          <div className="row row-2">
            <span id="card-inner">Card holder name</span>
          </div>
          <div className="row row-2">
            <input 
              type="text" 
              placeholder="Bojan Viner" 
              style={styles.input} 
              value={cardHolderName} 
              onChange={(e) => setCardHolderName(e.target.value)} 
            />
          </div>
        </div>
        <div className="row three">
          <div className="col-7">
            <div className="row-1">
              <div className="row row-2">
                <span id="card-inner">Card number</span>
              </div>
              <div className="row row-2">
                <input 
                  type="text" 
                  placeholder="5134-5264-4" 
                  style={styles.input} 
                  value={cardNumber} 
                  onChange={(e) => setCardNumber(e.target.value)} 
                />
              </div>
            </div>
          </div>
          <div className="col-2">
            <input 
              type="text" 
              placeholder="Exp. date" 
              style={styles.input} 
              value={expDate} 
              onChange={(e) => setExpDate(e.target.value)} 
            />
          </div>
          <div className="col-2">
            <input 
              type="text" 
              placeholder="CVV" 
              style={styles.input} 
              value={cvv} 
              onChange={(e) => setCvv(e.target.value)} 
            />
          </div>
        </div>
        <button type="submit" style={styles.button}><b>Add card</b></button>
      </form>
    </div>
    // <div className="p-4">
    //   <nav aria-label="breadcrumb">
    //     <ol className="breadcrumb">
    //       <li className="breadcrumb-item"><a href="#">Fleet Overview</a></li>
    //       <li className="breadcrumb-item"><a href="#">Assets</a></li>
    //       <li className="breadcrumb-item active" aria-current="page">Add New Vehicle</li>
    //     </ol>
    //   </nav>

    //   <h2 className="mb-4">Add New Vehicle</h2>

    //   <Form>
    //     <Card className="mb-4">
    //       <Card.Header className="bg-white">
    //         <h5 className="mb-0">Vehicle Details</h5>
    //       </Card.Header>
    //       <Card.Body>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Vehicle Number</Form.Label>
    //               <Form.Control type="text" />
    //             </Form.Group>
    //           </Col>
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Vehicle Type</Form.Label>
    //               <Form.Select>
    //                 <option>Select Vehicle Type</option>
    //               </Form.Select>
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>VIN Number</Form.Label>
    //               <Form.Control type="text" />
    //             </Form.Group>
    //           </Col>
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Vehicle Model</Form.Label>
    //               <Form.Select>
    //                 <option>Select Vehicle Model</option>
    //               </Form.Select>
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Select Country</Form.Label>
    //               <Form.Select>
    //                 <option>Select Country</option>
    //               </Form.Select>
    //             </Form.Group>
    //           </Col>
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Select State</Form.Label>
    //               <Form.Select>
    //                 <option>Select State</option>
    //               </Form.Select>
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Select Fuel Type</Form.Label>
    //               <Form.Select>
    //                 <option>Select Fuel Type</option>
    //               </Form.Select>
    //             </Form.Group>
    //           </Col>
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Fuel Tank Capacity</Form.Label>
    //               <Form.Control type="text" placeholder="Gallons" />
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //       </Card.Body>
    //     </Card>

    //     <Card className="mb-4">
    //       <Card.Header className="bg-white">
    //         <h5 className="mb-0">Registration Details</h5>
    //       </Card.Header>
    //       <Card.Body>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Registration Number</Form.Label>
    //               <Form.Control type="text" />
    //             </Form.Group>
    //           </Col>
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Expiry Date</Form.Label>
    //               <div className="input-group">
    //                 <Form.Control type="text" />
    //                 <span className="input-group-text">
    //                   <Calendar size={18} />
    //                 </span>
    //               </div>
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col>
    //             <Form.Check 
    //               type="checkbox"
    //               id="receiveEmailAlerts"
    //               label={
    //                 <span>
    //                   Receive Email alerts
    //                   <Form.Select className="d-inline-block mx-2" style={{width: 'auto'}}>
    //                     <option>60</option>
    //                   </Form.Select>
    //                   Days in prior
    //                 </span>
    //               }
    //             />
    //           </Col>
    //         </Row>
    //       </Card.Body>
    //     </Card>

    //     <Card className="mb-4">
    //       <Card.Header className="bg-white">
    //         <h5 className="mb-0">Insurance Detail</h5>
    //       </Card.Header>
    //       <Card.Body>
    //         <h6>Liability Insurance</h6>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Liability Insurance Name</Form.Label>
    //               <Form.Control type="text" />
    //             </Form.Group>
    //           </Col>
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Liability Insurance Number</Form.Label>
    //               <Form.Control type="text" />
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Liability Insurance Expiry Date</Form.Label>
    //               <div className="input-group">
    //                 <Form.Control type="text" />
    //                 <span className="input-group-text">
    //                   <Calendar size={18} />
    //                 </span>
    //               </div>
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //         <Row className="mb-4">
    //           <Col>
    //             <Form.Check 
    //               type="checkbox"
    //               id="receiveEmailAlertsLiability"
    //               label={
    //                 <span>
    //                   Receive Email alerts
    //                   <Form.Select className="d-inline-block mx-2" style={{width: 'auto'}}>
    //                     <option>60</option>
    //                   </Form.Select>
    //                   Days in prior
    //                 </span>
    //               }
    //             />
    //           </Col>
    //         </Row>

    //         <h6>Cargo Insurance</h6>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Cargo Insurance Name</Form.Label>
    //               <Form.Control type="text" />
    //             </Form.Group>
    //           </Col>
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Cargo Insurance Number</Form.Label>
    //               <Form.Control type="text" />
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Group>
    //               <Form.Label>Cargo Insurance Expiry Date</Form.Label>
    //               <div className="input-group">
    //                 <Form.Control type="text" />
    //                 <span className="input-group-text">
    //                   <Calendar size={18} />
    //                 </span>
    //               </div>
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col>
    //             <Form.Check 
    //               type="checkbox"
    //               id="receiveEmailAlertsCargo"
    //               label={
    //                 <span>
    //                   Receive Email alerts
    //                   <Form.Select className="d-inline-block mx-2" style={{width: 'auto'}}>
    //                     <option>60</option>
    //                   </Form.Select>
    //                   Days in prior
    //                 </span>
    //               }
    //             />
    //           </Col>
    //         </Row>
    //       </Card.Body>
    //     </Card>

    //     <div className="d-flex justify-content-start">
    //       <Button variant="primary" type="submit" className="me-2">
    //         Add Vehicle
    //       </Button>
    //       <Button variant="secondary" type="button">
    //         Cancel
    //       </Button>
    //     </div>
    //   </Form>
    // </div>


    // <div className="p-4">
    //   <nav aria-label="breadcrumb">
    //     <ol className="breadcrumb">
    //       <li className="breadcrumb-item">
    //         <a href="#">Fleet Overview</a>
    //       </li>
    //       <li className="breadcrumb-item">
    //         <a href="#">Drivers</a>
    //       </li>
    //       <li className="breadcrumb-item active" aria-current="page">
    //         Add Driver
    //       </li>
    //     </ol>
    //   </nav>

    //   <Form>
    //     <Card className="mb-4">
    //       <Card.Header>
    //         <h5>Special Duty Statuses</h5>
    //       </Card.Header>
    //       <Card.Body>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Check
    //               type="checkbox"
    //               id="eldPersonalConveyance"
    //               label="ELD Personal Conveyance (PC)"
    //             />
    //           </Col>
    //           <Col>
    //             <Form.Check
    //               type="checkbox"
    //               id="eldYardMoves"
    //               label="ELD Yard Moves (YM)"
    //             />
    //           </Col>
    //           <Col>
    //             <Form.Check
    //               type="checkbox"
    //               id="waitingTime"
    //               label="Waiting Time (WT)"
    //             />
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col>
    //             <Form.Check type="checkbox" id="eldExempt" label="ELD Exempt" />
    //           </Col>
    //         </Row>
    //       </Card.Body>
    //     </Card>

    //     <Card className="mb-4">
    //       <Card.Header>
    //         <h5>ELD Day Start Hour</h5>
    //       </Card.Header>
    //       <Card.Body>
    //         <Form.Check
    //           type="checkbox"
    //           id="dayStartMidnight"
    //           label="12am (Midnight)"
    //         />
    //       </Card.Body>
    //     </Card>

    //     <Card className="mb-4">
    //       <Card.Header>
    //         <h5>USA Hours of Service USA Exemption</h5>
    //       </Card.Header>
    //       <Card.Body>
    //         <Row>
    //           <Col>
    //             <Form.Check
    //               type="checkbox"
    //               id="shortHaul"
    //               label="16-Hour Short-Haul 395.1(o)"
    //             />
    //           </Col>
    //           <Col>
    //             <Form.Check
    //               type="checkbox"
    //               id="adverseDriving"
    //               label="Adverse Driving (USA) 395.1 (b)(1)"
    //             />
    //           </Col>
    //           <Col>
    //             <Form.Check
    //               type="checkbox"
    //               id="agricultureExemption"
    //               label="Agriculture Exemption"
    //             />
    //           </Col>
    //         </Row>
    //       </Card.Body>
    //     </Card>

    //     <Card className="mb-4">
    //       <Card.Header>
    //         <h5>Canada Hours of Service Canada Exemption</h5>
    //       </Card.Header>
    //       <Card.Body>
    //         <Form.Check
    //           type="checkbox"
    //           id="adverseDrivingCanada"
    //           label="Adverse Driving (Canada)"
    //         />
    //       </Card.Body>
    //     </Card>

    //     <Card className="mb-4">
    //       <Card.Header>
    //         <h5>Carrier Details</h5>
    //       </Card.Header>
    //       <Card.Body>
    //         <Row className="mb-3">
    //           <Col>
    //             <Form.Control type="text" placeholder="Apple Freight Inc" />
    //           </Col>
    //           <Col>
    //             <Form.Control type="text" placeholder="223 W Fifth St, Ripon" />
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col>
    //             <Form.Select>
    //               <option>PST</option>
    //             </Form.Select>
    //           </Col>
    //           <Col>
    //             <Form.Select>
    //               <option>Apple Freight Inc</option>
    //             </Form.Select>
    //           </Col>
    //         </Row>
    //       </Card.Body>
    //     </Card>

    //     <Card className="mb-4">
    //       <Card.Header>
    //         <h5>Cycle Details</h5>
    //       </Card.Header>
    //       <Card.Body>
    //         <nav>
    //           <div className="nav nav-tabs" id="nav-tab" role="tablist">
    //             <button
    //               className="nav-link active"
    //               id="nav-usa-tab"
    //               data-bs-toggle="tab"
    //               data-bs-target="#nav-usa"
    //               type="button"
    //               role="tab"
    //               aria-controls="nav-usa"
    //               aria-selected="true"
    //             >
    //               USA Cycle
    //             </button>
    //             <button
    //               className="nav-link"
    //               id="nav-canada-tab"
    //               data-bs-toggle="tab"
    //               data-bs-target="#nav-canada"
    //               type="button"
    //               role="tab"
    //               aria-controls="nav-canada"
    //               aria-selected="false"
    //             >
    //               Canada Cycle
    //             </button>
    //           </div>
    //         </nav>
    //         <div className="tab-content" id="nav-tabContent">
    //           <div
    //             className="tab-pane fade show active"
    //             id="nav-usa"
    //             role="tabpanel"
    //             aria-labelledby="nav-usa-tab"
    //           >
    //             <Row className="mt-3">
    //               <Col>
    //                 <Form.Select>
    //                   <option>Select Cycle</option>
    //                 </Form.Select>
    //               </Col>
    //               <Col>
    //                 <Form.Select>
    //                   <option>Cargo Type</option>
    //                 </Form.Select>
    //               </Col>
    //             </Row>
    //           </div>
    //           <div
    //             className="tab-pane fade"
    //             id="nav-canada"
    //             role="tabpanel"
    //             aria-labelledby="nav-canada-tab"
    //           >
    //             {/* Add Canada-specific fields here if needed */}
    //           </div>
    //         </div>
    //       </Card.Body>
    //     </Card>

    //     <div className="d-flex justify-content-start">
    //       <Button variant="primary" type="submit" className="me-2">
    //         Add Driver
    //       </Button>
    //       <Button variant="secondary" type="button">
    //         Cancel
    //       </Button>
    //     </div>
    //   </Form>
    // </div>
  );
}
