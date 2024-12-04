import React, { useEffect } from "react";
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
import { getterminal_IdAction } from "../../../Redux/Action/adminauth";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const DetailsTerminal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const terminal = useSelector((state) => state.login.getid_terminalbyIdlist);

  useEffect(() => {
    if (id) {
      dispatch(getterminal_IdAction(id)); // Fetch terminal data
    }
  }, [dispatch, id]);

  // Group terminal data into categories
  const groupData = () => {
    if (!terminal) return {};
    return {
      terminalInfo: {
        title: "Terminal Information",
        icon: <LocationOnIcon />,
        data: {
          "Terminal Name": terminal?.terminalName,
          "Terminal Time Zone": terminal?.terminalTimeZone,
          "Terminal Address": terminal?.terminalAddress,
          "Terminal Contact": terminal?.terminalContact,
          "Status": terminal?.status,
        },
      },
    };
  };

  const groupedData = groupData();

  // InfoSection Component
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
            {terminal?.terminalName?.[0] || "T"}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
              {terminal?.terminalName || "Terminal Details"}
            </Typography>
            <Chip
              label={terminal?.status || "Pending"}
              color={terminal?.status === "Active" ? "success" : "warning"}
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

      //    <Card style={{ padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
    //         <Box sx={{ marginTop: '20px' }}>
    //             <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: '0.02em', marginBottom: '30px' }}>
    //                 Terminal Details
    //             </Typography>

    //             <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none' }}>
    //                 <Table>
    //                     <TableBody>
    //                         { terminal && Object.entries(terminal).map(([key, value]) => (

    //                             <TableRow >
    //                                 <TableCell sx={{ fontWeight: 'bold', border: 'none', padding: '16px 24px', color: "#a1a5b7" }}>{key.replace(/([A-Z])/g, ' $1')}</TableCell>
    //                                 <TableCell sx={{ border: 'none', padding: '16px 24px' }}>{value ? String(value) : "N/A"}</TableCell>
    //                             </TableRow>
    //                         ))}
    //                     </TableBody>
    //                 </Table>
    //             </TableContainer>
    //         </Box>
    //     </Card>

  );
};

export default DetailsTerminal;
