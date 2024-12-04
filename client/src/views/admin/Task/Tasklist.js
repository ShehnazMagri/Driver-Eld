import React from 'react';


const Tasklist = () => {
  const tasks = [
    { id: 1, title: "Meeting about plan for Admin Template 2018", time: "10:00 AM", color: "#e74c3c" },
    { id: 2, title: "Create new task for Dashboard", time: "11:00 AM", color: "#f39c12" },
    { id: 3, title: "Meeting about plan for Admin Template 2018", time: "02:00 PM", color: "#3498db" },
    { id: 4, title: "Create new task for Dashboard", time: "03:30 PM", color: "#2ecc71" },
  ];

  return (
    <div className="bg-white rounded shadow-sm overflow-hidden" style={{maxWidth: '400px'}}>
      <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <svg className="me-2" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>26 April, 2018</span>
        </div>
        <button className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center" style={{width: '24px', height: '24px'}}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>
      <div className="p-3">
        <h6 className="text-muted mb-3">Tasks for John Doe</h6>
        {tasks.map((task) => (
          <div key={task.id} className="d-flex mb-3">
            <div className="me-3" style={{width: '4px', backgroundColor: task.color}}></div>
            <div>
              <p className="mb-0 small">{task.title}</p>
              <small className="text-muted">{task.time}</small>
            </div>
          </div>
        ))}
        <button className="btn btn-secondary w-100 mt-2">
          LOAD MORE
        </button>
      </div>
    </div>
  );
};

export default Tasklist;