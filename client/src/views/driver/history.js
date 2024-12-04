import { useEffect, useState } from "react";
import { getDriverAllTasks } from "../../Redux/Action/driver";
import { useDispatch } from "react-redux";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Badge,
  Pagination,
} from "react-bootstrap"; 
const DriverHistory = () => {
  const dispatch = useDispatch();
  const [taskHistory, setTaskHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Example total pages
  const paginationItems =[]
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handlePageChange = async(pageNumber) => {
    setCurrentPage(pageNumber);
    try {
      const queryParams = {
        page:pageNumber,
        limit:10
      }
      const response = await dispatch(getDriverAllTasks(queryParams));
      if (response?.payload?.status) {
        setTaskHistory(response.payload.tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const queryParams = {
        page:1,
        limit:10
      }
      const response = await dispatch(getDriverAllTasks(queryParams));
      if (response?.payload?.status) {
        setTaskHistory(response.payload.tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid>
      <Container>
    <div className="d-flex justify-content-end mt-4">
      <nav aria-label="Page navigation">
        <Pagination className="pagination-dark">
          <Pagination.Prev
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-item"
          />
          {paginationItems}
          <Pagination.Next
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-item"
          />
        </Pagination>
      </nav>
    </div>
  </Container>
      <Row className="mt-4">
        <Col md={12}>
          <Card className="custom-card">
            <Card.Header className="bg-dark text-white text-center">
              <h4>Driver Task History</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive="md" className="mb-0">
                <thead>
                  <tr>
                    <th>SR</th>
                    <th>Check-In Time</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Time</th>
                    <th>Check-Out Date</th>
                    <th>Break Time</th>
                    <th>totalWorkHours</th>
                    <th>Status</th> 
                    <th>Cost of Fuel</th>
                    <th>Task Description</th>
                  </tr>
                </thead>
                <tbody>
                  {taskHistory.map((task, index) => (
                    <tr key={task.id}>
                      <td>{index + 1}</td> {/* Adding SR */}
                      <td>{task.checkinTime}</td>
                      <td>{task.checkInDate}</td>
                     <td>
                        {task.checkoutTime ? (
                          `${task.checkoutTime}`
                        ) : (
                          <Badge bg="secondary">Not Available</Badge>
                        )}
                      </td>
                      <td>
                      {task.checkoutDate ? (
                          `${task.checkoutDate}`
                        ) : (
                          <Badge bg="secondary">Not Available</Badge>
                        )}
                      </td>
                      <td>
                        {task.breakTime ? (
                          `${task.breakTime} `
                        ) : (
                          <Badge bg="secondary">Not Available</Badge>
                        )}
                      </td>
                      <td>
                        {task.totalWorkHours ? (
                          `${task.totalWorkHours} `
                        ) : (
                          <Badge bg="secondary">Not Available</Badge>
                        )}
                      </td>
                      <td>
                        {task.status ? (
                          `${task.status} `
                        ) : (
                          <Badge bg="secondary">Not Available</Badge>
                        )}
                      </td>
                      <td>
                        {task.costFuel ? (
                          `$${task.costFuel}`
                        ) : (
                          <Badge bg="secondary">Not Available</Badge>
                        )}
                      </td>
                      <td>{task.taskDescription}</td>
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

export default DriverHistory;
