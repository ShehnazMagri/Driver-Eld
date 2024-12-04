import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const DriverTasksStatus = () => {
  const [tasks, setTasks] = useState([
    { id:1, name: 'Dakota Rice', assignedDate: '07/09/2024', dueDate: '11/01/2025', status: 'Pending' },
    { id:2, name: 'Minerva Hooper', assignedDate: '06/09/2024', dueDate: '11/09/2024', status: 'In Progress' },
    { id:3, name: 'Sage Rodriguez', assignedDate: '05/09/2024', dueDate: '10/09/2024', status: 'Completed' },
    { id:4, name: 'Philip Chaney', assignedDate: '05/09/2024', dueDate: '10/09/2024', status: 'Over Due' },
    { id:5, name: 'Doris Greene', assignedDate: '10/09/2024', dueDate: '15/09/2024', status: 'Pending' },
    { id:6, name: 'Mason Porter', assignedDate: '05/09/2024', dueDate: '10/09/2024', status: 'Completed' }
  ]);

  const statusStyles = {
    Pending: { color: '#FFA500' },
    'In Progress': { color: '#FFD700' },
    Completed: { color: '#32CD32' },
    'Over Due': { color: '#FF4500' },
  };
  const handleEdit = async(id) => {
        console.log(id)
  }
  const handleView = async(id) => {
    console.log(id)
  }

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Driver Tasks Status</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">Task ID</th>
                    <th className="border-0">Task Name</th>
                    <th className="border-0">Assigned Date</th>
                    <th className="border-0">Due Date</th>
                    <th className="border-0">Status</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{task.name}</td>
                      <td>{task.assignedDate}</td>
                      <td>{task.dueDate}</td>
                      <td style={statusStyles[task.status]}>{task.status}</td>
                      <td>
                      <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(task.id)}>
                          <i className="fa fa-edit fa-lg"></i>
                        </button>
                        <button className="btn btn-info btn-sm" onClick={() => handleView(task.id)}>
                          <i class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export const task  =() => {
  return(
    <div>Hello ji Hello</div>
  )
}
export default DriverTasksStatus;
