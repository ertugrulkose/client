import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box } from "@mui/material";
import { Dashboard, ShoppingCart, People, BarChart, Menu as MenuIcon } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // 🔥 Hook'u fonksiyon içinde çağır
  const sidebarRef = useRef(null); // Sidebar'ı referans almak için
  
  // 🔥 Aktif sayfayı belirleme fonksiyonu
  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setOpen(false);
  };

  // 🔥 Menüdeki öğeler için array kullanımı
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
    { text: "Ürünler", icon: <ShoppingCart />, path: "/admin/products" },
    { text: "Kategoriler", icon: <CategoryIcon />, path: "/admin/categories" },
    { text: "Siparişler", icon: <People />, path: "/admin/orders" },
    { text: "Raporlar", icon: <BarChart />, path: "/admin/reports" },
  ];

  // ✅ **Sidebar dışına tıklanınca kapatma**
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <Drawer
      ref={sidebarRef}
      variant="permanent"
      sx={{
        width: open ? 190 : 50, // 🔥 Açık/kapalı genişliği belirle
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 200 : 60,
          transition: "width 0.3s",
          overflowX: "hidden", // 🔥 İçeriğin taşmasını engelle
          position: "relative", // 🔥 Navbar'ı kapatmaması için
        },
      }}
    >
      {/* 🔥 Sidebar aç/kapat butonu */}
      <Box sx={{ display: "flex", justifyContent: open ? "flex-end" : "center", p: 2 }}>
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: isActive(item.path) ? "rgba(255, 255, 255, 0.1)" : "inherit",
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;