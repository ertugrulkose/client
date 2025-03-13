import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import { Box } from "@mui/material";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sol Menü - Sidebar */}
      <Sidebar />


      {/* İçerik Alanı */}
      <Box component="main" sx={{
        flexGrow: 1,
        p: 0
      }}>
        {/* Navbar buraya ekleniyor ki sidebar'ı ezmesin */}
        <AdminNavbar />
        <Box sx={{ padding: 2 }}>
          <Outlet /> {/* 🔥 Burada admin sayfaları render olacak */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
