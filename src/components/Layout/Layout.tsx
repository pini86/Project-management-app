import Box from '@mui/material/Box';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <Box className="layout">
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default Layout;
