import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const QuickAddModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // If modal is not open, return null

  // Initialize navigate
  const navigate = useNavigate();

  // Inline styles
  const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black w/ opacity
  };

  const modalContentStyle = {
    backgroundColor: '#fefefe',
    margin: '15% auto', // Center the modal
    padding: '20px',
    border: '1px solid #888',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const closeButtonStyle = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  };

  const buttonStyle = (isHovered) => ({
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: isHovered ? '#e0e0e0' : '#f0f0f0',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  });

  // Function to handle button click
  const handleButtonClick = (buttonText) => {
    switch (buttonText) {
      case 'Add Driver':
        navigate('/admin/add-driver');
        break;
      case 'Add Truck':
        navigate('/admin/add-truck');
        break;
      case 'Add Trailer':
        navigate('/admin/add-trailer');
        break;
      case 'Add Device':
        navigate('/admin/add-device');
        break;
      case 'Create Geofence':
        navigate('/admin/create-geofence');
        break;
      case 'Add Fuel Purchase':
        navigate('/admin/add-fuel-purchase');
        break;
      default:
        break;
    }
    onClose(); 
  };
  

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <span
          style={closeButtonStyle}
          onClick={onClose}
          onMouseOver={(e) => (e.target.style.color = 'black')}
          onMouseOut={(e) => (e.target.style.color = '#aaa')}
        >
          &times;
        </span>
        <h2>Quick Add</h2>
        <div style={buttonGridStyle}>
          {['Add Driver', 'Add Truck', 'Add Trailer', 'Add Device', 'Create Geofence', 'Add Fuel Purchase'].map((buttonText) => {
            const [isHovered, setIsHovered] = useState(false);

            return (
              <button
                key={buttonText}
                style={buttonStyle(isHovered)}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                onClick={() => handleButtonClick(buttonText)} // Call handleButtonClick on click
              >
                {buttonText}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
