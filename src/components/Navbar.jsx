import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { useThemeStore } from "../store/themeStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <AppBar position="fixed" sx={{ width: "100%", left: 0, right: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", maxWidth: "1200px", margin: "auto", width: "100%", paddingY: 2 }}>
        <Typography variant="h6">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Fashion Store
          </Link>
        </Typography>
        <Box>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton component={Link} to="/cart" color="inherit">
            <ShoppingCart />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
