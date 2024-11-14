import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios({
        method: "GET",
        url: "http://localhost:5000/api/auth/logout",
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{
      mb: 4,
      backgroundImage: "linear-gradient(109.6deg, rgba(79, 148, 243, 0.73) 11.2%, rgba(140, 105, 193, 0.87) 91.2%)"
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img style={{
            width: "30px",
            padding: "5px",
            backgroundColor: 'white',
            borderRadius: "50px",
            marginRight: "10px"
          }} src='https://cdn-icons-png.flaticon.com/512/4231/4231587.png' alt="logo" />
          
          {/* Logo Title for Large Screens */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AcademicEdge
          </Typography>

          {/* Menu Button for Small Screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
            </Menu>
          </Box>

          {/* Title for Small Screens */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AcademicEdge
          </Typography>

          {/* Navigation Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key="Students"
              onClick={() => navigate('/admin')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Students
            </Button>
            <Button
              key="Courses"
              onClick={() => navigate('/admin/courses')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Courses
            </Button>
          </Box>

          {/* Logout Button */}
          <Box sx={{ flexGrow: 0 }}>
            <Button
              key="logout"
              onClick={handleLogOut}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AdminNav;
