import { Menu, MenuItem, AppBar, Toolbar, Typography, IconButton, Box, Badge, Divider, List, ListItem, ListItemText, Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { DarkMode, LightMode } from "@mui/icons-material";  // 🔥 Dark mode ikonları
import { useThemeStore } from "../../store/themeStore";  // 🔥 Dark mode store’u


const AdminNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Yeni sipariş: #12345" },
    { id: 2, text: "Ürün stoğu azaldı!" },
    { id: 3, text: "Yeni kullanıcı kaydoldu." },
  ]);/* 🚀 Yeni bildirimler ekleyin */

  const open = Boolean(anchorEl);
  const openNotif = Boolean(notifAnchor);

  const { darkMode, toggleDarkMode } = useThemeStore(); // 🔥 Dark mode state'ini Zustand'dan çekiyoruz.

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNotifMenu = (e) => setNotifAnchor(e.currentTarget);
  const handleNotifClose = () => setNotifAnchor(null);

  const markAllAsRead = () => {
    setNotifications([]);
    handleNotifClose();
  };

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="h6">Dashboard</Typography>
        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>

          {/* 🔥 Dark Mode Toggle Butonu */}
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Bildirimler Butonu */}
          <IconButton onClick={handleNotifMenu} color="inherit">
            <Badge badgeContent={notifications.length} color="error">
              <CircleNotificationsIcon />
            </Badge>
          </IconButton>

          {/* Bildirim Menüsü */}
          <Menu anchorEl={notifAnchor} open={openNotif} onClose={handleNotifClose}>
            {notifications.length > 0 ? (
              <>
                <List dense>
                  {notifications.slice(0, 3).map((notif) => (
                    <ListItem key={notif.id}>
                      <ListItemText primary={notif.text} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
                  <Button size="small" onClick={markAllAsRead} color="primary">
                    Okundu Olarak İşaretle
                  </Button>
                  <Button size="small" component={Link} to="/admin/notifications">
                    Tümünü Gör
                  </Button>
                </Box>
              </>
            ) : (
              <MenuItem>Bildirim Yok</MenuItem>
            )}
          </Menu>

          {/* Kullanıcı Menüsü */}
          <IconButton  sx={{ mr: 3 }} onClick={handleMenu} color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profil</MenuItem>
            <MenuItem onClick={handleClose}>Çıkış Yap</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
