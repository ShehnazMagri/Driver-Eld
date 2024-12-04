import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const Pagination = ({ totalPages,currentPage, pageSize, handlePageChange, userId }) => {
  // Set initial page to 1
  // const [currentPage, setCurrentPage] = useState(1)
  const goToPage = (newPage) => {
    setCurrentPage(newPage); 
    handlePageChange(userId, newPage); 
  };

  return (
    <div className="pagination d-flex justify-content-center align-items-center">
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)} 
        aria-label="Previous"
      >
        &laquo;
      </Button>

      <span>{`Page ${currentPage} of ${totalPages}`}</span>

      <Button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)} 
        aria-label="Next"
      >
        &raquo;
      </Button>
    </div>
  );
};

export default Pagination;
