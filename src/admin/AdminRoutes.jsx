import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard"; // Corrected import path
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import AddProduct from "./pages/AddProduct";
import EditProductPage from "./pages/EditProductPage"; // Corrected import path

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<Orders />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="products/:id/edit" element={<EditProductPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
