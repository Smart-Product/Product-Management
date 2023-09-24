import { Route, Routes as ReactRoutes, createBrowserRouter } from "react-router-dom";
import type { Router as RemixRouter } from '@remix-run/router';
import ProductListPage from "../components/PersistentDrawerLeft/ProductListPage/ProductListPage";
import { Login } from "@mui/icons-material";
import ProductPage from "../components/FormComponents/ProductPage/ProductPage";
import UserForms from "../components/FormComponents/UserForms/UserForms";
import DataPage from "../components/PersistentDrawerLeft/DataProducts/DataProducts";
import { PageLayout } from "../components/PersistentDrawerLeft/PageLayout";
import SalesPage from "../components/PersistentDrawerLeft/SalesPage/SalesPage";

//todo : arrumar os nomes com o padrao Page

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/data" element={<DataPage />} />
      <Route path="/produto" element={<ProductPage />} />
      <Route path="/produto/:id" element={<ProductPage />} />
      <Route path="/produto/delete/:id" element={<ProductListPage />} />
      <Route path="/cadastro" element={<UserForms />} />
      <Route path="/login" element={<Login />} />
    </ReactRoutes>
  )
}