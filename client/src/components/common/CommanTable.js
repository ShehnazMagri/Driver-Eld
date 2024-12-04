import React, { useEffect, useState } from "react";
import { Table, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from "./Pagination";

const CommonTable = ({
  columns = [],
  data = [],
  onEdit = () => {}, 
  onDelete = () => {}, 
  onDetails = () => {}, 
  onAssignTask = () => {},
  pagination = { totalPages: 0 },
  handlePageChange,
  currentPage,
  userId,
  pageSize,
  currentTab,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const handleActionMenuOpen = (event, driver) => {
    setAnchorEl(event.currentTarget);
    setSelectedDriver(driver);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
    setSelectedDriver(null);
  };
  return (
    <>
      <Table
        className="table table-hover"
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
          <tr>
            {columns.length > 0 ? (
              columns.map((column) => (
                <th key={column.field} style={{ padding: "12px 15px", textAlign: "left" }}>
                  {column.title}
                </th>
              ))
            ) : (
              <th style={{ padding: "12px 15px", textAlign: "left" }}>No Columns Available</th>
            )}
            <th style={{ padding: "12px 15px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((driver, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                {columns.map((column) => (
                  <td key={column.field} style={{ padding: "15px" }}>
                    {column.field === "Sr." ? (
                      index + 1 // Display the serial number (index starts from 0, so we add 1)
                    ) : (
                      driver[column.field] !== null && driver[column.field] !== undefined
                        ? driver[column.field]
                        : "N/A"
                    )}
                  </td>
                ))}
                <td style={{ padding: "15px" }}>
                  <IconButton onClick={(event) => handleActionMenuOpen(event, driver)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl) && selectedDriver === driver}
                    onClose={handleActionMenuClose}
                  >
                    <MenuItem
                      onClick={() => {
                        onEdit(driver.id); // Calls the onEdit function
                        handleActionMenuClose();
                      }}
                    >
                      Edit
                    </MenuItem>
                    {(currentTab === 0 || currentTab === 1) && (
                      <MenuItem
                        onClick={() => {
                          onDelete(driver.id); // Calls the onDelete function
                          handleActionMenuClose();
                        }}
                      >
                        Delete
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        onDetails(driver.id); // Calls the onDetails function
                        handleActionMenuClose();
                      }}
                    >
                      Details
                    </MenuItem>
                    {/* <MenuItem
                      onClick={() => {
                        onAssignTask(driver); // Calls the onAssignTask function
                        handleActionMenuClose();
                      }}
                    >
                      Assign Task
                    </MenuItem> */}
                  </Menu>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center" style={{ padding: "30px" }}>
                <div className="text-center">
                  {/* <img
                    src="/path-to-icon/no-data-icon.png" // Adjust the path as needed
                    alt="No Data"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginBottom: "10px",
                    }}
                  /> */}
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    No Data Found
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {pagination.totalPages > 0 && (
        <Pagination
          totalPages={pagination.totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          userId={userId}
        />
      )}
    </>
  );
};

export default CommonTable;
