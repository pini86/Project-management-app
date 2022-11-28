import Box from '@mui/material/Box';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(rgba(109,157,255,.5) 0%, rgba(0,119,255,.7) 100%)',
      }}
    >
      <Header />
      <Outlet />
    </Box>
  );
}

export default Layout;
