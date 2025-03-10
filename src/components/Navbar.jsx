import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, InputAdornment, TextField } from "@mui/material";
import { DarkMode, LightMode, ShoppingCart, Search as SearchIcon } from "@mui/icons-material";
import { useThemeStore } from "../store/themeStore";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  // 1) Hesap ikonuna tıklayınca menüyü açmak için gerekli state:
  const [anchorEl, setAnchorEl] = useState(null); 
  // anchorEl = menünün hangi öğeye (ikon) göre konumlanacağını tutar

  // Menü açık mı değil mi, anchorEl varsa true
  const open = Boolean(anchorEl);

  // İkon tıklanınca bu fonksiyon çalışır:
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget); 
    // event.currentTarget, tıklanan ikona referanstır
  };

  // Menüyü kapatma işlemi
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Profil / Siparişlerim / Çıkış menü item’ları tıklandığında yapılacak örnek işlemler:
  const handleProfile = () => {
    setAnchorEl(null); // menüyü kapat
  };

  const handleOrders = () => {
    setAnchorEl(null); // menüyü kapat
  };

  const handleLogout = () => {
    setAnchorEl(null); // menüyü kapat
  };

  const handleLogin = () => {
    setAnchorEl(null); // menüyü kapat
  };

  const handleRegister = () => {
    setAnchorEl(null); // menüyü kapat
  };

   // Arama kutusu state
   const [searchQuery, setSearchQuery] = useState("");

   // Arama ikonuna tıklama veya enter'a basılınca çalışacak fonksiyon
   // Şimdilik console.log, ilerde API'ye istek atabilirsin
   const handleSearch = () => {
     console.log("Arama yapılacak:", searchQuery);
   };
 
   // TextField içinde enter'a basınca arama tetikleme
   const handleKeyDown = (e) => {
     if (e.key === "Enter") {
       handleSearch();
     }
   };

   return (
    <AppBar position="fixed" sx={{ width: "100%", left: 0, right: 0 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", 
          // Sol ve sağ kısımları ayırmak için space-between
          maxWidth: "1200px",
          margin: "auto",
          width: "100%",
          paddingY: 2,
        }}
      >
        {/** 
         * 1) Sol Bölüm: Site adı + Arama kutusu 
         */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Site Adı */}
          <Typography variant="h6">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Store
            </Link>
          </Typography>

          {/* Arama Kutusu */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} 
            sx={{
              width: { xs: 120, sm: 300, md: 350 },
              backgroundColor: darkMode ? "#424242" : "#fff",
              borderRadius: 1,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/**
         * 2) Sağ Bölüm: Hesap menüsü ikonu, Dark Mode butonu, Sepet ikonu
         */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Kullanıcı Ikonu */}
          <IconButton
            color="inherit"
            onClick={handleMenu}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircleIcon />
          </IconButton>

          {/* Hesap Menüsü */}
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleProfile}>Profil</MenuItem>
            <MenuItem onClick={handleOrders}>Siparişlerim</MenuItem>
            <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
            <MenuItem onClick={handleLogin}>Giriş Yap</MenuItem>
            <MenuItem onClick={handleRegister}>Kayıt Ol</MenuItem>
          </Menu>

          {/* Dark Mode Toggle */}
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Sepet Ikonu */}
          <IconButton component={Link} to="/cart" color="inherit">
            <ShoppingCart />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
  
};

export default Navbar;
