import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  styled,
  //   makeStyles,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Calender from "../../components/calender";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  //   padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

const Navbar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      style: {
        width: `100%`,
        zIndex: theme.zIndex.drawer + 1,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export default function HomeScreen() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [person, setPerson] = useState("all");

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <Navbar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              drawerOpen && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            B-Clinic
          </Typography>
        </Toolbar>
      </Navbar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <div style={{ height: 50 }}></div>
        <DrawerHeader>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          B-Clinic
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          B-Clinic
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          B-Clinic
        </Typography> */}
      </Drawer>
      <Main open={drawerOpen}>
        <DrawerHeader />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyItems: "center",
              backgroundColor: "white",
              padding: 1,
              gap: 2,
              //   width: "100%",
              //   overflow: "hidden",
              //   overflowX: "scroll",
            }}
          >
            <Button
              variant="contained"
              sx={{ color: "white" }}
              onClick={() => setPerson("all")}
            >
              All
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#a02920", color: "white" }}
              onClick={() => setPerson("alice")}
            >
              Alice
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#5D576B", color: "white" }}
              onClick={() => setPerson("bob")}
            >
              Bob
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#202b90", color: "white" }}
              onClick={() => setPerson("charlie")}
            >
              Charlie
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#7067CF", color: "white" }}
              onClick={() => setPerson("diana")}
            >
              Diana
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#7B287D", color: "white" }}
              onClick={() => setPerson("ethan")}
            >
              Ethan
            </Button>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              maxHeight: "700px",
              overflowY: "scroll",
            }}
          >
            <Calender person={person} />
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
