"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  title: string;
}

export default function SideBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.replace("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const texts = [
    { title: "Restaurants", value: "restaurants" },
    { title: "Maintenance History", value: "maintenance-history" },
    { title: "Menu Items", value: "menu-items" },
  ];
  const icons = [
    <RestaurantIcon key="restaurants" />,
    <WorkHistoryIcon key="maintenance-history" />,
    <MenuBookIcon key="menu-items" />,
  ];
  const drawer = (
    <Box>
      <Toolbar />
      <List sx={{ pt: "1rem" }}>
        {texts.map((item, index) => (
          <ListItem key={item.value} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(`/${item.value}`);
              }}
            >
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ pt: "1rem" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              {" "}
              <LogoutIcon key="logout" />{" "}
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // it a test
  const currentPath = usePathname();
  const matchResult = currentPath.match(/^\/([^/]+)/);
  const extractedPart = matchResult != null ? matchResult[1] : null;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {props.title}
            </Typography>
          </Box>
          {/* must be dynamic based on the URL */}
          {extractedPart === "maintenance-history" && (
            <IconButton
              color="inherit"
              aria-label=" add maintenance history"
              onClick={() => {
                router.push("/maintenance-history/add");
              }}
              sx={{ mr: 2 }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          )}
          {extractedPart === "menu-items" && (
            <IconButton
              color="inherit"
              aria-label="add menu items"
              onClick={() => {
                router.push("/menu-items/add");
              }}
              sx={{ mr: 2 }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          )}{" "}
          {extractedPart === "restaurants" && (
            <IconButton
              color="inherit"
              aria-label="add restaurants"
              onClick={() => {
                router.push("/restaurants/add");
              }}
              sx={{ mr: 2 }}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          position: "fixed",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
