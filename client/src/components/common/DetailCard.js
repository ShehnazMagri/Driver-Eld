// components/DetailCard.js
import React from "react";
import { Card, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Chip } from '@mui/material';
import { Avatar } from '@mui/material';

const DetailCard = ({ title, data, icon, status, avatarLetter }) => {
    // Function to format date if needed
    const formatDate = (dateString) => {
        if (!dateString || dateString === 'N/A') return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const renderSection = (data) => (
        <TableContainer>
            <Table>
                <TableBody>
                    {Object.entries(data).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell sx={{ color: '#2196f3', width: '40%', border: 'none', py: 2 }}>
                                {key}
                            </TableCell>
                            <TableCell sx={{ border: 'none', py: 2 }}>
                                {key === 'Status' ? (
                                    <Chip 
                                        label={value} 
                                        color={value === 'deleted' ? 'error' : 'warning'}
                                        size="small"
                                    />
                                ) : value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Box sx={{ mt: 3 }}>
            <Box sx={{ bgcolor: '#7352FF', p: 2, borderTopLeftRadius: '8px', borderTopRightRadius: '8px', display: 'flex', alignItems: 'center', gap: 1 }}>
                {icon}
                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>{title}</Typography>
            </Box>
            <Card sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 3 }}>
                    <Avatar sx={{ bgcolor: '#2196f3', mr: 2 }}>
                        {avatarLetter || 'V'}
                    </Avatar>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{title}</Typography>
                        <Chip label={status || 'pending'} color={status === 'deleted' ? 'error' : 'warning'} size="small" sx={{ mt: 1 }} />
                    </Box>
                </Box>
                {renderSection(data)}
            </Card>
        </Box>
    );
};

export default DetailCard;
