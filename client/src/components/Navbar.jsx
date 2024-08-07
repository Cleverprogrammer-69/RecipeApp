import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const pages = ["Feed", "New Post", "Profile"];
  const settings = ["Logout", user?.user.name];

  const signupHandler = () => {
    navigate("/signup");
    setAnchorElNav(null);
  };

  const loginHandler = () => {
    navigate("/login");
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if (page !== "New Post") {
      const path = `/${page.toLowerCase()}`;
      navigate(path);
      setAnchorElNav(null);
    } else {
      navigate("/newpost");
      setAnchorElNav(null);
    }
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Logout") {
      logout();
      setAnchorElUser(null);
    } else if (setting === user?.user.name) {
      navigate("/profile");
      setAnchorElUser(null);
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ background: "#1E1E2E" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FastfoodIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#5F6BFF" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#E5E5E5",
              textDecoration: "none",
            }}
          >
            Recipick
          </Typography>
          {user && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "#E5E5E5" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                  background: "#2D2D44",
                  color: "#E5E5E5",
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{ color: "#E5E5E5" }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <FastfoodIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "#5F6BFF" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#E5E5E5",
              textDecoration: "none",
            }}
          >
            Recipick
          </Typography>
          {user && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: "#E5E5E5", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}
          <Box className="navBtnContainer" sx={{ flexGrow: 0 }}>
            <Tooltip>
              {user ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    className="avatar"
                    sx={{
                      bgcolor: "#5F6BFF",
                      color: "#E5E5E5",
                      fontWeight: "800",
                      borderRadius: "50%",
                    }}
                  >
                    {user?.user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              ) : (
                <div className="navBtnContainer">
                  <button
                    className="userBtns"
                    onClick={signupHandler}
                    style={{
                      backgroundColor: "#5F6BFF",
                      color: "#E5E5E5",
                      border: "2px solid #5F6BFF",
                    }}
                  >
                    Signup
                  </button>
                  <button
                    className="userBtns"
                    onClick={loginHandler}
                    style={{
                      backgroundColor: "#5F6BFF",
                      color: "#E5E5E5",
                      border: "2px solid #5F6BFF",
                    }}
                  >
                    Login
                  </button>
                </div>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px", background: "#2D2D44", color: "#E5E5E5" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                  sx={{ color: "#E5E5E5" }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
