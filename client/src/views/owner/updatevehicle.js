import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  updateVehicleAction,
  getVehicleDetailsAction,
  getVehiclesByOwnerAction,
} from "../../Redux/Action/vehicle.js";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function UpdateVehicle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    vehicleNumber: "",
  });
  const [vehicleId, setVehicleId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getVehicleDetailsAction(id));
        if (response && response.status) {
          const { vichel } = response;
          if (vichel) {
            setFormData({
              name: vichel.name || "",
              vehicleNumber: vichel.vehicleNumber || "",
            });
            setVehicleId(vichel.id); // Set the vehicle ID for updating
          } else {
            toast.error("Vehicle details not found!");
          }
        }
      } catch (error) {
        toast.error("Failed to fetch vehicle details!");
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateVehicleAction(vehicleId, formData));
      if (response && response.status === 200) {
        toast.success("Vehicle updated successfully!");
        // Optionally reset the form or navigate to another page
        setFormData({
          name: "",
          vehicleNumber: "",
        });
        return;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    // <Container fluid>
    //   <Row>
    //     <Col md="8">
    //       <Card>
    //         <Card.Header>
    //           <Card.Title as="h4">Update Vehicle</Card.Title>
    //         </Card.Header>
    //         <Card.Body>
    //           <Form onSubmit={handleSubmit}>
    //             <Row>
    //               <Col className="pr-1" md="6">
    //                 <Form.Group>
    //                   <label>Vehicle Name</label>
    //                   <Form.Control
    //                     name="name"
    //                     value={formData.name} // Ensure this is correctly bound
    //                     onChange={handleInputChange}
    //                     placeholder="Enter vehicle name"
    //                     type="text"
    //                     required
    //                   />
    //                 </Form.Group>
    //               </Col>
    //               <Col className="pl-1" md="6">
    //                 <Form.Group>
    //                   <label>Vehicle Number</label>
    //                   <Form.Control
    //                     name="vehicleNumber"
    //                     value={formData.vehicleNumber} // Ensure this is correctly bound
    //                     onChange={handleInputChange}
    //                     placeholder="Enter vehicle number"
    //                     type="text"
    //                     required
    //                   />
    //                 </Form.Group>
    //               </Col>
    //             </Row>
    //             <Button
    //               className="btn-fill pull-right"
    //               type="submit"
    //               variant="info"
    //             >
    //               Update
    //             </Button>
    //             <div className="clearfix"></div>
    //           </Form>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
    <div className="custom-bg py-3 py-md-5">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={11} lg={8} xl={7} xxl={6}>
            <div className="custom-card p-4 p-md-5">
              <Row>
                <Col xs={12}>
                  <div className="mb-5">
                    <h3>Update Vehicle</h3>
                  </div>
                </Col>
              </Row>
              <Form onSubmit={handleSubmit}>
                <Row className="gy-3 gy-md-4 overflow-hidden">
                  <Col xs={12}>
                    <Form.Label htmlFor="email">
                      Vehicle Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name} // Ensure this is correctly bound
                      onChange={handleInputChange}
                      placeholder="Enter vehicle name"
                      type="text"
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Label htmlFor="username">
                      Vechicle Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="vehicleNumber"
                      value={formData.vehicleNumber} // Ensure this is correctly bound
                      onChange={handleInputChange}
                      placeholder="Enter vehicle number"
                      type="text"
                      required
                    />
                  </Col>
                  <Col xs={12}>
                    <div className="d-grid">
                      <Button className="custom-button" type="submit">
                        Update Vehicle
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UpdateVehicle;
