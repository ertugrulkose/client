import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/themeStore";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Layout from "./Layout";

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
        <Navbar />
        <Routes>
        <Route path="/" element={<Layout> <ProductList/> </Layout>} />
        <Route path="/cart" element={<Layout> <Cart/> </Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
