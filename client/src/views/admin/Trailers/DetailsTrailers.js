import React, { useEffect } from 'react';
import { Card, Grid, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { gettrailers_IdAction } from '../../../Redux/Action/adminauth';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Description, DriveEta, LocalShipping, Person } from "@mui/icons-material";

const DetailsTrailers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const trailers = useSelector((state) => state.login.gettrailers_urllistby_id.trailer);
  console.log(trailers, 'trailerstrailers');

  useEffect(() => {
    dispatch(gettrailers_IdAction(id));
  }, [dispatch, id]);


  // Define the fields to display based on your API response
  const groupData = () => {
    if (!trailers) return {};
    return {
      basicInfo: {
        title: "Basic Information",
        icon: <LocalShipping />,
        data: {
          "Trailer Number": trailers.trailerNumber,
          "VIN": trailers.vin,
          "Model": trailers.model,
          "Trailer Type": trailers.trailerType,
        }
      },
      technicalInfo: {
        title: "Technical Details",
        icon: <DriveEta />,
        data: {
          "Trailer Manufacturer": trailers.trailerManufacturer,
          "Number Of Axels": trailers.numberOfAxels,
          "GVWR": trailers.gvwr,
          "Length": trailers.length,
        }
      },
      licenseInfo: {
        title: "License Information",
        icon: <Description />,
        data: {
          "License Authority": trailers.licenseAuthority,
          "Ownership Type": trailers.ownershipType,
          "License Plate Number": trailers.licensePlateNumber,
        }
      }
    };
  };

  const groupedData = groupData();

  const InfoSection = ({ title, icon, data }) => (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ 
        display: "flex",
        alignItems: "center",
        mb: 2,
        bgcolor: "#8b5cf6",
        p: "12px 18px",
        borderRadius: '8px',
        gap: 1.5
      }}>
        {icon && <Box sx={{ color: 'white', display: 'flex' }}>{icon}</Box>}
        <Typography sx={{ 
          color: 'white',
          fontSize: '15px',
          fontWeight: 500,
          letterSpacing: '0.3px'
        }}>
          {title.toUpperCase()}
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableBody>
            {Object.entries(data).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell
                  sx={{
                    pl: 0,
                    py: 2,
                    width: '200px',
                    color: '#5E636E',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderBottom: '1px solid #f5f5f5'
                  }}
                >
                  {key}
                </TableCell>
                <TableCell
                  sx={{
                    py: 2,
                    color: '#181C32',
                    fontSize: '14px',
                    borderBottom: '1px solid #f5f5f5'
                  }}
                >
                  {value || 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    // <Card style={{ padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
    //   <Box sx={{ marginTop: '20px' }}>
    //     <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: '0.02em', marginBottom: '30px' }}>
    //       Trailer Details
    //     </Typography>

    //     <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none' }}>
    //       <Table>
    //         <TableBody>
    //           {trailers && Object.entries(trailers).map(([key, value]) => (
    //             <TableRow key={key}>
    //               <TableCell
    //                 sx={{
    //                   fontWeight: 'bold',
    //                   border: 'none',
    //                   padding: '16px 24px',
    //                   color: "#a1a5b7"
    //                 }}>
    //                 {key.replace(/([A-Z])/g, ' $1')}
    //               </TableCell>
    //               <TableCell
    //                 sx={{
    //                   border: 'none',
    //                   padding: '16px 24px'
    //                 }}>
    //                 {value ? String(value) : "N/A"}
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Box>
    // </Card>
    
    <Card sx={{ 
      p: '30px', 
      borderRadius: '12px', 
      mb: '30px', 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box 
          sx={{ 
            width: 45,
            height: 45,
            borderRadius: '50%', 
            bgcolor: '#8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Person sx={{ color: 'white', fontSize: 24 }} />
        </Box>
        <Box>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 500,
              color: '#181C32',
              mb: 0.5
            }}
          >
            CH 01 {trailers?.trailerNumber || '3308'}
          </Typography>
          <Box 
            component="span" 
            sx={{ 
              bgcolor: '#e8f8f3',
              color: '#50cd89',
              px: 1.5,
              py: 0.5,
              borderRadius: '30px',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            deleted
          </Box>
        </Box>
      </Box>

      {/* Information Sections */}
      <Grid container spacing={3}>
        {Object.entries(groupedData).map(([key, section]) => (
          <Grid item xs={12} key={key}>
            <InfoSection
              title={section.title}
              icon={section.icon}
              data={section.data}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
    
  );
};

export default DetailsTrailers;
