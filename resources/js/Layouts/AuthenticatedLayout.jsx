"use client";

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    Box,
    Divider,
    Menu,
    MenuItem,
    Avatar,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from '@mui/icons-material/Group';
import PetsIcon from '@mui/icons-material/Pets';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SnackbarComponent from "@/Components/Snackbar";

const drawerWidth = 240;

const navigation = [
    {
        name: "Dashboard",
        route: "dashboard",
        icon: <HomeIcon />
    },
    {
        name: "Users",
        route: "users.index",
        icon: <GroupIcon />,
    },
    {
        name: "Signals",
        route: "signals.index",
        icon: <PetsIcon />,
    },
    {
        name: "Contacts",
        route: "contacts.index",
        // route: "dashboard",
        icon: <EmailIcon />,
    },
];

export default function AuthenticatedLayout({ header, children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6" noWrap>
                        PetFind.Me Admin
                    </Typography>
                    <img src="/assets/logo.svg" alt="Logo" style={{ height: 32 }} />
                </Box>
            </Toolbar>
            <Divider />
            <List>
                {navigation.map((item) => (
                    <ListItem
                        key={item.name}
                        component={Link}
                        href={route(item.route)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: "#222",
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        PetFind.Me Admin
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar
                                alt="User"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            sx={{ mt: 1 }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem component={Link} href="/profile" onClick={handleClose}>
                                <AccountCircleIcon sx={{ mr: 1 }} /> Profile
                            </MenuItem>
                            <MenuItem component={Link} href="/logout" onClick={handleClose}>
                                <LogoutIcon sx={{ mr: 1 }} /> Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            {/* Drawer for mobile */}
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                        display: { xs: "none", md: "block" },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            )}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                }}
            >
                {header && <Box mb={2}>{header}</Box>}
                {children}
            </Box>
            <SnackbarComponent />
        </Box>
    );
}
