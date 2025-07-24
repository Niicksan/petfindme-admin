import React from 'react';
import { Head } from '@inertiajs/react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PetsIcon from '@mui/icons-material/Pets';
import EmailIcon from '@mui/icons-material/Email';

export default function Dashboard({ totalUsers, totalSignals, totalContacts, newSignals }) {
    const cards = [
        {
            title: 'Users',
            value: totalUsers,
            icon: <GroupIcon fontSize="large" color="primary" />,
        },
        {
            title: 'Signals',
            value: totalSignals,
            icon: <PetsIcon fontSize="large" color="primary" />,
            extra:
                <Typography
                    variant="span"
                    sx={{ mt: 1, color: newSignals > 0 ? '#4caf50' : 'text.secondary' }}
                >
                    ({newSignals} new)
                </Typography>
        },
        {
            title: 'Emails',
            value: totalContacts,
            icon: <EmailIcon fontSize="large" color="primary" />,
        },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
                <Grid container spacing={3}>
                    {cards.map((card) => (
                        <Grid item xs={12} sm={6} md={4} key={card.title}>
                            <Card
                                elevation={6}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 4,
                                    minWidth: 180,
                                    boxShadow: '0 6px 16px 0 rgba(0,0,0,0.18)',
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0 }}>
                                    <Typography color="black" gutterBottom sx={{ textAlign: 'center' }}>
                                        {card.title} {card.extra}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 2 }}>
                                        <Typography variant="h4" sx={{ pr: 1 }}>{card.value}</Typography>
                                        <Box>{card.icon}</Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}
