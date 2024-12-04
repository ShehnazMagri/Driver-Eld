import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVichelsByIdAction } from "../../../Redux/Action/adminauth";
import {
  Card,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";
import DetailCard from "components/common/DetailCard";

import { DriveEta, Person } from "@mui/icons-material";

const REACT_APP_BACKEND_API = process.env.REACT_APP_BACKEND_URL;

function Details_vehiclebyadmin() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const vichel = useSelector(
    (state) => state.login.allvicheleby_detalsIdlist.vichel
  );


  useEffect(() => {
    dispatch(getVichelsByIdAction(id));
  }, [dispatch, id]);

  const formattedVehicleData = vichel
    ? {
        Make: vichel.make,
        Model: vichel.model,
        Year: vichel.year,
        VIN: vichel.vin,
        Status: vichel.status || "N/A",
        CreatedAt: vichel.createdAt || "N/A",
      }
    : {};

  const groupData = () => {
    if (!vichel) return {};

    return {
      personalInfo: {
        title: "Personal Information",
        icon: <Person />,
        sx: {
            backgroundColor: '#8b5cf6', // background color applied
          },
        data: {
          "VehicleNumber": vichel.vehicleNumber,
          "VehicleModel": vichel.vehicleModel,
          "VehicleType": vichel.vehicleType,
          "FuelType": vichel.fuelType,
          "TruckType": vichel.truckType,
          "Registration Number": vichel.registrationNumber,
         " Registration Expiry Date": vichel.registrationExpiryDate,
          "License": vichel.license,
        },
      },
      vehicleInfo: {
        title: "Vehicle Information",
        icon: <DriveEta />,
        sx: {
            backgroundColor: '#8b5cf6', // background color applied
          },
        data: {
          "Fuel Tank Capacity": vichel.fuelTankCapacity,
          "Terminal Address": vichel.terminalAddress,
          "Hours Available Per Day": vichel.hoursAvailablePerDay,
          "Dormancy Threshold": vichel.dormancyThreshold,
          "Liability Insurance": vichel.liabilityInsuranceName,
          "Liability Insurance Number": vichel.liabilityInsuranceNumber,
          "Liability Insurance ExpiryDate": vichel.liabilityInsuranceExpiryDate,
          "Cargo Insurance Name": vichel.cargoInsuranceName,
          "Cargo Insurance Number": vichel.cargoInsuranceNumber,
          "Cargo Insurance ExpiryDate": vichel.cargoInsuranceExpiryDate,
        },
      },
    };
  };

  const groupedData = groupData();

  // const InfoSection = ({ title, icon, data }) => (
  //   <Box sx={{ mb: 4 }}>
  //     <Box
  //       sx={{
  //         display: "flex",
  //         alignItems: "center",
  //         mb: 2,
  //         bgcolor: "#8b5cf6",
  //         p: 1,
  //         borderRadius: 2,
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           mr: 2,
  //           bgcolor: "primary.main",
  //           p: 1,
  //           borderRadius: 1,
  //           color: "white",
  //         }}
  //       >
  //         {icon}
  //       </Box>
  //       <Typography
  //         variant="subtitle2" // Smaller font size
  //         sx={{ color: "white", fontWeight: "bold" }} // White text color for title
  //       >
  //         {title}
  //       </Typography>
  //     </Box>
  //     <TableContainer
  //       component={Paper}
  //       elevation={0}
  //       sx={{
  //         boxShadow: "none",
  //         bgcolor: "background.default",
  //       }}
  //     >
  //       <Table>
  //         <TableBody>
  //           {Object.entries(data).map(([key, value]) => (
  //             <TableRow
  //               key={key}
  //               sx={{
  //                 "&:hover": {
  //                   bgcolor: "action.hover",
  //                 },
  //               }}
  //             >
  //               <TableCell
  //                 sx={{
  //                   fontWeight: "bold",
  //                   border: "none",
  //                   padding: "8px 16px",
  //                   // color: "primary.main",
  //                   color:"#5E636E",
  //                   width: "30%",
  //                 }}
  //               >
  //                 {key}
  //               </TableCell>
  //               <TableCell
  //                 sx={{
  //                   border: "none",
  //                   padding: "8px 16px",
  //                   color: "text.primary",
  //                 }}
  //               >
  //                 {value ? String(value) : "N/A"}
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </Box>
  // );
  const InfoSection = ({ title, icon, data }) => (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          bgcolor: '#8b5cf6', // Use the same purple background color
          p: '12px 18px',
          borderRadius: '8px',
          gap: 1.5, // Gap between the icon and title
        }}
      >
        <Box sx={{ color: 'white', display: 'flex' }}>
          {icon}
        </Box>
        <Typography
          sx={{
            color: 'white',
            fontSize: '15px', // Adjusted font size to match the reference code
            fontWeight: 500,
            letterSpacing: '0.3px', // Adjust letter spacing
          }}
        >
          {title.toUpperCase()} {/* Capitalize the title like in the reference */}
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          boxShadow: 'none',
          bgcolor: 'background.default', // Use default background color
        }}
      >
        <Table>
          <TableBody>
            {Object.entries(data).map(([key, value]) => (
              <TableRow
                key={key}
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover', // Add hover effect for table rows
                  },
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    border: 'none',
                    padding: '8px 16px',
                    color: '#5E636E', // Slightly muted color for table keys
                    width: '30%', // Make the left column narrower
                  }}
                >
                  {key}
                </TableCell>
                <TableCell
                  sx={{
                    border: 'none',
                    padding: '8px 16px',
                    color: 'text.primary', // Use text.primary for better readability
                  }}
                >
                  {value ? String(value) : 'N/A'} {/* Display value or 'N/A' */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Card
      sx={{
        padding: "30px",
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ marginTop: "20px" }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            pb: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* <Avatar
            sx={{
              width: 80,
              height: 80,
              mr: 3,
              bgcolor: "primary.main",
            }}
          >
            {vichel?.name?.[0] || 'D'}
          </Avatar> */}
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mr: 3,
              bgcolor: "primary.main",
            }}
            src={
              vichel?.vehicleImage
                ? `${REACT_APP_BACKEND_API}/api/vehicle/${vichel.vehicleImage}`
                : "/images/red.jpg"
            }
            alt="Profile Picture"
          />

          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {vichel?.vehicleNumber || "Vehicle Details"}
            </Typography>
            <Chip
              label={vichel?.status || "Active"}
              color="success"
              variant="outlined"
            />
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
      </Box>
    </Card>

    //   <Card style={{ padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
    //   <Box sx={{ marginTop: '20px' }}>
    //       <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: '0.02em', marginBottom: '30px' }}>
    //           Vehicle Details
    //       </Typography>

    //       {/* Using the custom DetailCard component */}

    //       <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none' }}>
    //           <Table>
    //               <TableBody>
    //                   { vichel && Object.entries(vichel).map(([key, value]) => (

    //                       <TableRow >
    //                           <TableCell sx={{ fontWeight: 'bold', border: 'none', padding: '16px 24px', color: "#a1a5b7" }}>{key.replace(/([A-Z])/g, ' $1')}</TableCell>
    //                           <TableCell sx={{ border: 'none', padding: '16px 24px' }}>{value ? String(value) : "N/A"}</TableCell>
    //                       </TableRow>
    //                   ))}
    //               </TableBody>
    //           </Table>
    //       </TableContainer>
    //   </Box>
    //   </Card>
  );
}

export default Details_vehiclebyadmin;
