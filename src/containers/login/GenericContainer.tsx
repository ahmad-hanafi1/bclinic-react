import React, { useState } from "react";
import {
  AppBar,
  // Avatar,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  Drawer,
  IconButton,
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

interface AuthContainerProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  title,
  subtitle,
  children,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} onClick={() => toggleDrawer(false)}>
      <IconButton
        onClick={() => toggleDrawer(false)}
        sx={{ marginLeft: "auto" }}
      >
        <CloseIcon />
      </IconButton>
      {/* <List>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/">
            <ListItemText primary="Find a Job" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/">
            <ListItemText primary="Create Your CV" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/">
            <ListItemText primary="Get Job Alerts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/">
            <ListItemText primary="Find a Doctor" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/">
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/register">
            <ListItemText primary="Sign Up" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/post-job">
            <ListItemText primary="Post a Job" />
          </ListItemButton>
        </ListItem>
      </List> */}
    </Box>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      paddingX={2}
      boxSizing="border-box"
      className="bg-light"
    >
      <AppBar
        component="nav"
        elevation={0}
        sx={{ background: "white", padding: "10px" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" gap={1} alignItems="center">
            {/* <Avatar variant="rounded" src={logo} /> */}
            <Typography variant="h6" fontWeight="bold">
              B Clinic
            </Typography>
          </Stack>
          {isMediumScreen ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <Stack direction="row" gap={2}>
              {/* <Button>Find a Job</Button>
              <Button>Create Your CV</Button>
              <Button>Get Job Alerts</Button>
              <Button>Find a Doctor</Button> */}
              <Button component={NavLink} to="/" replace>
                Login
              </Button>
              <Button
                variant="contained"
                component={NavLink}
                to="/register"
                sx={{ color: "white", textDecoration: "none" }}
              >
                Sign Up
              </Button>
              {/* <Button variant="contained" sx={{ color: "white" }}>
                Post a Job
              </Button> */}
            </Stack>
          )}
        </Stack>
      </AppBar>

      <Grid
        container
        spacing={4}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={5}>
          <Stack direction="column" display="flex" gap={2} textAlign="start">
            {/* <Avatar
              variant="rounded"
              src={logo}
              sx={{
                width: 120,
                height: 120,
              }}
            /> */}
            <Typography variant="h5">Not registered yet!</Typography>
            <Stack direction="column" gap={1}>
              <Typography variant="h6">Search & Apply</Typography>
              <Typography variant="subtitle2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </Typography>

              <Typography variant="h6">Upload Your Own Video CV</Typography>
              <Typography variant="subtitle2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </Typography>

              <Typography variant="h6">Job Alerts</Typography>
              <Typography variant="subtitle2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </Typography>

              <Typography variant="h6">Free CV Review</Typography>
              <Typography variant="subtitle2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Stack direction="column" gap={2} justifyContent="center">
            <Typography textAlign="start" variant="h5">
              {title}
            </Typography>
            <Typography variant="body2">{subtitle}</Typography>
            <Box sx={{ maxWidth: 400, width: "100%" }}>{children}</Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthContainer;
