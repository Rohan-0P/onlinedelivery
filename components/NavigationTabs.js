// NavigationTabs.js
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavigationTabs = ({ currentTab }) => {
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    if (newValue === 0) navigate('/checkout');
    if (newValue === 1) navigate('/shipping');
    if (newValue === 2) navigate('/payment');
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="navigation tabs"
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab label="Cart" />
        <Tab label="Shipping Details" />
        <Tab label="Payment Method" />
      </Tabs>
    </Box>
  );
};

export default NavigationTabs;
