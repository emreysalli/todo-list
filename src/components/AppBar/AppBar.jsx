import React, { useState, useEffect } from "react";
import "./AppBar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { auth } from "../../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSnackbar } from "notistack";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const ResponsiveAppBar = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  const logout = async () => {
    await props.setUser(user.uid);
    await signOut(auth);
    enqueueSnackbar("Exit successful.", {
      variant: "success",
    });
    props.setTaskItems([]);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FormatListBulletedIcon sx={{ display: "flex", mr: 1 }} />
          <Typography variant="h6" noWrap>
            <Link
              to="/"
              style={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TO DO LIST
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => props.setQuery(event.target.value)}
              />
            </Search>
          </Box>
          <Box sx={{ marginRight: 5 }}>{user?.email}</Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              <MenuItem
                key={"profile"}
                style={{ display: user ? "block" : "none" }}
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                </Typography>
              </MenuItem>

              <MenuItem
                key={"datagrid"}
                style={{ display: user ? "block" : "none" }}
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">
                  <Link className="link" to="/datagrid">
                    Datagrid
                  </Link>
                </Typography>
              </MenuItem>

              <MenuItem
                key={"register"}
                style={{ display: user ? "none" : "block" }}
              >
                <Link className="link" to="/register">
                  Register
                </Link>
              </MenuItem>
              <MenuItem
                key={"login"}
                style={{ display: user ? "none" : "block" }}
              >
                <Link className="link" to="/login">
                  Login
                </Link>
              </MenuItem>
              <MenuItem
                key={"logout"}
                style={{ display: user ? "block" : "none" }}
                onClick={logout}
              >
                <Typography className="link" textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
