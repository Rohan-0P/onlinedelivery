import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  CssBaseline,
  Tabs,
  Tab,
  Box,
  InputAdornment
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  Markunread as MarkunreadIcon
} from '@mui/icons-material';
import boxImage from "../assets/shipping image.jpg"; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081',
    },
    background: {
      default: '#fce4ec',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#ff4081',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ff4081',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ff4081',
            },
            '&:hover fieldset': {
              borderColor: '#ff7299',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff7299',
            },
           
            minWidth: '220px', 
            margin: '5px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          backgroundColor: '#ff4081',
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '25px',
          boxShadow: '0px 4px 8px rgba(255,64,129,0.3)',
          '&:hover': {
            backgroundColor: '#ff7299',
          },
        },
      },
    },
  },
});

const ShippingPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1); 
  const [shippingData, setShippingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/checkout');
    if (newValue === 2) navigate('/payment');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

   
    if (name === 'fullName' && !/^[A-Za-z\s]*$/.test(value)) return; 
    if (name === 'phone' && !/^\d*$/.test(value)) return; 

    setShippingData({ ...shippingData, [name]: value });
  };

 
  useEffect(() => {
    const { fullName, email, phone, address, city, postalCode } = shippingData;
    if (fullName && email && phone.length === 10 && address && city && postalCode) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [shippingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      
      localStorage.setItem('shippingData', JSON.stringify(shippingData)); 
      navigate('/payment');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          backgroundColor: '#fff',
          borderRadius: 4,
          padding: 4,
          boxShadow: '0px 8px 16px rgba(0,0,0,0.1)',
        }}
      >
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

        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          Shipping Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={shippingData.fullName}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={shippingData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    name="address"
                    value={shippingData.address}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={shippingData.city}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postalCode"
                    value={shippingData.postalCode}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MarkunreadIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={shippingData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ fontWeight: 'bold', py: 1.5 }}
                    disabled={!isFormValid} 
                  >
                    CONTINUE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

        
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={boxImage}
              alt="Shipping"
              sx={{
               
                width: '100%',
                height: 'auto',
              
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ShippingPage;
