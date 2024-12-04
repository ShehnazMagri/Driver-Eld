import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getuserByIdAction } from "../../../Redux/Action/adminauth";
import { Card, Container, Row, Col } from "react-bootstrap";

function DetailsUser() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.userbyIdlist.user); 


  useEffect(() => {
    dispatch(getuserByIdAction(id));
  }, [dispatch,id]);



  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">User Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <p><strong>Username: </strong>{user?.username || "N/A"}</p>
              <p><strong>Email: </strong>{user?.email || "N/A"}</p>
              {/* Add more fields if needed */}
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailsUser;
