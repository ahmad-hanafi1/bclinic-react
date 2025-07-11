import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch } from "../utils/hooks";
import { showModal } from "../data/features/modal/modalSlice";
import { logout } from "../domain/stores/AuthStore";
import { createPatient } from "../data/features/patient/patientSlice";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Main = styled("main")<{ isMdUp: boolean; drawerOpen: boolean }>(
  ({ theme, isMdUp, drawerOpen }) => ({
    flexGrow: 1,
    // maxHeight: "100vh ",
    // padding: "16px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: !drawerOpen && isMdUp ? `${drawerWidth}px` : 0,
  })
);

const Layout = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = useState(isMdUp);

  useEffect(() => {
    setDrawerOpen(isMdUp);
  }, [isMdUp]);

  const drawerContent = (
    <>
      {/* ✅ DrawerHeader only for small screens */}
      {!isMdUp && (
        <DrawerHeader>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 1,
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            dispatch(
              showModal({
                title: "Add Patient",
                type: "patient",
                onSubmit: (data) => dispatch(createPatient(data)),
              })
            )
          }
        >
          Add Patient
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            dispatch(
              showModal({
                title: "Add Doctor",
                type: "doctor",
              })
            )
          }
        >
          Add Doctor
        </Button>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(!drawerOpen)}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && isMdUp && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            B-Clinic
          </Typography>

          {/* 🔽 Navigation Links */}
          <Box sx={{ display: "flex", gap: 2, flexGrow: 1, mx: 4 }}>
            <NavLink
              to="/calender"
              className={({ isActive }) =>
                `${
                  isActive ? "text-[#1E40AF]" : "text-white"
                }  text-lg hover:text-[#1E40AF] transition-colors duration-300`
              }
            >
              Calender
            </NavLink>
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                `${
                  isActive ? "text-[#1E40AF]" : "text-white"
                } text-lg hover:text-[#1E40AF] transition-colors duration-300`
              }
            >
              Patients
            </NavLink>
          </Box>

          {/* 🔽 Logout Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMdUp ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={() => !isMdUp && setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: drawerOpen ? "block" : "none", // Add this line
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            ...(isMdUp && {
              top: 64,
              height: "calc(100% - 64px)", // Add height calculation
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Main isMdUp={isMdUp} drawerOpen={drawerOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Layout;
