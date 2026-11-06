import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import ProductForm from "./pages/adminpages/ProductForm";
import ProductEdit from "./pages/adminpages/ProductEdit";
import AdminLayout from "./layouts/AdminLayout";
import { ProductProvider } from "./utils/ProductContext";
import CategoryManagement from "./pages/adminpages/CategoryManagement";
import StoreSettings from "./pages/adminpages/StoreSettings";
import AboutPage from "./pages/adminpages/AboutPage";

export default function App() {
  return (
    <ProductProvider>
      <Routes>
        {/* Route Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="add-product" element={<ProductForm />} />
          <Route path="edit-product/:id" element={<ProductEdit />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="settings" element={<StoreSettings />} />
        </Route>
      </Routes>
    </ProductProvider>
  );
}