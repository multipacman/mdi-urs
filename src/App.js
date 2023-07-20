import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/DashboardPage';
import UserLogin from './Pages/User/UserLoginPage';
import UserRegister from './Pages/User/UserRegisterPage';
import UserSuccess from './Pages/User/UserSuccessPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserLogin />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/user-success" element={<UserSuccess />} />
              <Route path="/profile" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
