import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import tickImage from '../../../Assets/green_tick_check.svg'; 

const SubmitPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/CostExplorer'); 
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 4,
        bgcolor: '#f9fafb', 
        borderRadius: 2,
      }}
    >
      <Box
        component="img"
        src={tickImage}
        alt="Success Tick"
        sx={{
          width: '120px',
          height: '120px',
          mb: 2,
        }}
      />

      <Typography variant="h4" fontWeight="bold" color="primary">
        Thank You for Submitting!
      </Typography>

      <Typography variant="body1" color="text.secondary">
        We’ve received your submission and will get back to you shortly.
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 2, textTransform: 'none', borderRadius: '8px' }}
        onClick={handleBack}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default SubmitPage;
