import React from 'react';
import './task.css';

const Addtaskby_admin = () => {
  return (
    <div className="mt-2"> {/* Removed container-fluid for full width */}
      <div className="row justify-content-center"> {/* Center the content */}
        <div className="col-lg-11 form-container p-4"> {/* Padding inside the form container */}
          <h4>Add New Task</h4>
          <form>
            {/* Task Title */}
            <div className="mb-3">
              <label htmlFor="taskTitle" className="form-label">Task Title *</label>
              <input type="text" className="form-control" id="taskTitle" placeholder="Enter task title" required />
            </div>

            {/* Task Description */}
            <div className="mb-3">
              <label htmlFor="taskDescription" className="form-label">Task Description *</label>
              <textarea className="form-control" id="taskDescription" rows="3" placeholder="Enter task description" required></textarea>
            </div>

            {/* Task Root */}
            <div className="mb-3">
              <label htmlFor="taskRoot" className="form-label">Task Root *</label>
              <input type="text" className="form-control" id="taskRoot" placeholder="Enter task root" required />
            </div>

            {/* Owner ID (Dropdown) */}
            <div className="mb-3">
              <label htmlFor="ownerId" className="form-label">Owner ID *</label>
              <select className="form-select" id="ownerId" required>
                <option>Select Owner ID</option>
                {/* Add Owner ID options here */}
              </select>
            </div>

            {/* Vehicle ID (Dropdown) */}
            <div className="mb-3">
              <label htmlFor="vehicleId" className="form-label">Vehicle ID *</label>
              <select className="form-select" id="vehicleId" required>
                <option>Select Vehicle ID</option>
                {/* Add Vehicle ID options here */}
              </select>
            </div>

            {/* Driver ID (Dropdown) */}
            <div className="mb-3">
              <label htmlFor="driverId" className="form-label">Driver ID *</label>
              <select className="form-select" id="driverId" required>
                <option>Select Driver ID</option>
                {/* Add Driver ID options here */}
              </select>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end">
            <button type="submit" className="btn custom-btn">Save</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addtaskby_admin;
