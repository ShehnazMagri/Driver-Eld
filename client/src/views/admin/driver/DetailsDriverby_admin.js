import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getdriverby_adminIdAction } from "../../../Redux/Action/adminauth";
import { Card, Grid, Typography, Box,Table,TableBody,TableCell, TableContainer, TableRow, Paper, Avatar, Divider,Chip,} from "@mui/material";
import { Person, DriveEta } from "@mui/icons-material";

function DetailsDriverby_admin() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const vichel = useSelector(
    (state) => state.login.getby_iddriverby_detalsIdlist?.driver
  );

  useEffect(() => {
    if (id) {
      dispatch(getdriverby_adminIdAction(id));
    }
  }, [dispatch, id]);

  // Group data into categories
  const groupData = () => {
    if (!vichel) return {};

    return {
      personalInfo: {
        title: "Personal Information",
        icon: <Person />,
        data: {
          FirstName: vichel.firstName,
          LastName: vichel.lastName,
          Email: vichel.email,
          CellPhone: vichel.cell,
          Country: vichel.country,
        },
      },
      vehicleInfo: {
        title: "Vehicle Information",
        icon: <DriveEta />,
        data: {
          "Truck Number": vichel.vehicleNumber,
          "License": vichel.license,
          "License Expiration": vichel.licenseExpiration,
          "License State": vichel.licenseState,
          "Terminal Address": vichel.terminalAddress,
          "Start Date": vichel.startDate,
          "Special Duty Status": vichel.specialDutyStatus,
          "Cargo Type": vichel.cargoType,
          "RestBreak": vichel.restBreak,
          "RestartHours": vichel.restartHours,
          "Cycle": vichel.cycle,
          "AppVersion": vichel.appVersion,
          "Os": vichel.os,
          "Exemptions":vichel.exemptions
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
  //                   color: "#5E636E",
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
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mr: 3,
              bgcolor: "#8b5cf6",
            }}
          >
            {vichel?.name?.[0] || "D"}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {vichel?.firstName || "Driver Details"}
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
  );
}

export default DetailsDriverby_admin;



