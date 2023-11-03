import { Routes as ReactRoutes, Route } from "react-router-dom";
import ProductListPage from "../components/PersistentDrawerLeft/ProductListPage/ProductListPage";

import ProductEditPage from "../components/FormComponents/ProductEditPage/ProductEditPage";
import ProductPage from "../components/FormComponents/ProductPage/ProductPage";
import UserForms from "../components/FormComponents/UserForms/UserForms";
import Login from "../components/Login/Login";
import DataPage from "../components/PersistentDrawerLeft/DataProducts/DataProducts";
import SalesPage from "../components/PersistentDrawerLeft/SalesPage/SalesPage";
import { ProtectedPage } from "../components/Security/ProtectedPage/ProtectedPage";

//todo : arrumar os nomes com o padrao Page

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<ProductListPage />} />

      <Route path="/sales" element={<SalesPage />}/>

      <Route path="/data" element={<DataPage />} />

      <Route path="/produto" element={<ProductPage />} />

      <Route path="/produto/:id" element={<ProductEditPage />} />

      <Route path="/produto/delete/:id" element={<ProductListPage />} />

      <Route path="/cadastro" element={<UserForms />} />

      <Route path="/login" element={<Login />} />
    </ReactRoutes>
  )
}