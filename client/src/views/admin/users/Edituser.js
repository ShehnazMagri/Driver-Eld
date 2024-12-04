import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { getuserByIdAction, updateuserAction } from "../../../Redux/Action/adminauth";
import { useForm } from "react-hook-form";

function Edituser() {
  const { id } = useParams();
  const dispatch = useDispatch();
//   const navigate = useNavigate();

  const user = useSelector((state) => state.login.userbyIdlist.user);

  // React Hook Form setup
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: '',
      email: '',
    }
  });

  useEffect(() => {
    dispatch(getuserByIdAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      // Set form values when user data is available
      setValue("username", user.username || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    // Add other fields if needed

    await dispatch(updateuserAction(data,id));
    // navigate('/some-route'); // Redirect after successful update
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Edit User Profile</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md="5">
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        name="username"
                        {...register("username", { required: true })}
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="7">
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        name="email"
                        {...register("email", { required: true })}
                        type="email"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                >
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Edituser;
