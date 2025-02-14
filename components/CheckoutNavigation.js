// src/components/CheckoutNavigation.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';

const CheckoutNavigation = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/checkout');
    if (newValue === 1) navigate('/shipping');
    if (newValue === 2) navigate('/payment');
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="navigation tabs"
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
        sx={{ fontSize: '1.5rem' }}
      >
        <Tab label="Cart" />
        <Tab label="Shipping Details" />
        <Tab label="Payment Method" />
      </Tabs>
    </Box>
  );
};

export default CheckoutNavigation;

