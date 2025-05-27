import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SignUp from './SignUp';
import Login from './Login';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `auth-tab-${index}`,
    'aria-controls': `auth-tabpanel-${index}`,
  };
}

const LoginSignup = () => {
  const [value, setValue] = useState(0);
 


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  


  return (
    <div className='bg-[#C7E8FF] min-h-screen flex items-center justify-center px-4'>
      <div className='bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md'>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="login signup tabs"
            centered
            variant="fullWidth"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Create Account" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* Login Form */}
        <CustomTabPanel value={value} index={0}>
        <Login/>
        </CustomTabPanel>

        {/* Signup Form */}
        <CustomTabPanel value={value} index={1}>
         
         <SignUp />
        </CustomTabPanel>
      </div>

     
    </div>
  );
};

export default LoginSignup;
