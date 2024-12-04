import React, { useEffect } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allusersAction, deleteuserAction } from "../../../Redux/Action/adminauth";

function Allusers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allusers = useSelector((state) => state.login.userlist?.users || []);

  useEffect(() => {
    dispatch(allusersAction());
  }, [dispatch]);

  const handleEdit = (id) => {
    // Redirect to the edit page for the selected user
    navigate(`/admin/edit_user/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Dispatch action to delete the user
      dispatch(deleteuserAction(id));
    }
  };

  const handleViewDetails = (id) => {
    // Redirect to the details page for the selected user
    navigate(`/admin/user_details/${id}`);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">User Information Table</Card.Title>
                <p className="card-category">Here is the list of all users</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Username</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">Created At</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allusers.length > 0 ? (
                      allusers.map((user, index) => (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{new Date(user.createdAt).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-sm mr-2"
                              onClick={() => handleEdit(user.id)}
                            >
                              <i
                                className="fa fa-edit fa-lg"
                                style={{ color: "grey" }}
                              ></i>
                            </button>

                            <button
                              className="btn btn-sm mr-2"
                              onClick={() => handleDelete(user.id)}
                            >
                              <i
                                className="fa fa-trash fa-lg"
                                style={{ color: "grey" }}
                              ></i>
                            </button>

                            <button
                              className="btn btn-sm mr-2"
                              onClick={() => handleViewDetails(user.id)}
                            >
                              <i
                                className="fa fa-eye fa-lg"
                                style={{ color: "grey" }}
                              ></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Users Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Allusers;
