import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


const DriverScore = ({ scoreLabel, value, total, amount, historyMessage }) => {
  const percentage = (value / total) * 100;

  return (
    <div>
      {/* Score Label */}
      <div className="mb-2">
      <h6 className="text-muted mb-3">{scoreLabel}</h6>
       
      </div>

      {/* Progress Bar Section */}
      <Box sx={{ position: 'relative', marginY: 2 }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
          }}
        />
        {/* Amount overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: -28,
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#7b61ff',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          ${amount}
        </Box>
      </Box>

      {/* History or Message Section */}
      <div className="mt-4">
        <span className="text-muted">{historyMessage}</span>
      </div>
    </div>
  );
};

export default DriverScore;
