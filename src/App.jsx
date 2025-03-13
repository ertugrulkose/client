import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/themeStore";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Layout from "./Layout";
import ProductDetail from "./pages/ProductDetail";
import AdminRoutes from "./admin/AdminRoutes";
import AdminLayout from "./admin/layouts/AdminLayout";

const App = () => {
  const { darkMode } = useThemeStore();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* 🔥 Eğer admin panelindeysek Navbar'ı kullanma */}
        {!window.location.pathname.startsWith("/admin") && <Navbar />}

        <Routes>
          <Route path="/" element={<Layout> <ProductList /> </Layout>} />
          <Route path="/cart" element={<Layout> <Cart /> </Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />

          {/* 🔥 Admin Paneli */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
