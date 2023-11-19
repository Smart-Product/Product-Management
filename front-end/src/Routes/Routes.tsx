import { Routes as ReactRoutes, Route } from "react-router-dom";
import ProductListPage from "../components/PersistentDrawerLeft/ProductListPage/ProductListPage";

import ProductEditPage from "../components/FormComponents/ProductEditPage/ProductEditPage";
import ProductPage from "../components/FormComponents/ProductPage/ProductPage";
import UserForms from "../components/FormComponents/UserForms/UserForms";
import Login from "../components/Login/Login";
import DataPage from "../components/PersistentDrawerLeft/DataProducts/DataProducts";
import SalesPage from "../components/PersistentDrawerLeft/SalesPage/SalesPage";
import { UserEditPage } from "../components/FormComponents/UserEditPage/userEditPage";
import { ProtectedPage } from "../components/Security/ProtectedPage/ProtectedPage";

//todo : arrumar os nomes com o padrao Page

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={
        <ProtectedPage>
          <ProductListPage />
        </ProtectedPage>
      } />

      <Route path="/sales" element={
        <ProtectedPage>
          <SalesPage />
        </ProtectedPage>
      } />

      <Route path="/data" element={
        <ProtectedPage>
          <DataPage />
        </ProtectedPage>
      } />

      <Route path="/produto" element={
        <ProtectedPage>
          <ProductPage />
        </ProtectedPage>
      } />

      <Route path="/produto/:id" element={
        <ProtectedPage>
          <ProductEditPage/>
        </ProtectedPage>
      } />

      <Route path="/produto/delete/:id" element={
        <ProtectedPage>
          <ProductListPage />
        </ProtectedPage>
      } />

      <Route path="/user/edit"
        element={
          <ProtectedPage>
            <UserEditPage />
          </ProtectedPage>
        } />

      <Route path="/cadastro" element={<UserForms />}/>

      <Route path="/login" element={<Login />}/>
    </ReactRoutes>
  )
}