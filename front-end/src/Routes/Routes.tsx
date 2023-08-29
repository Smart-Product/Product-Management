import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import CreateAccount from "../components/HorizontalLinearStepper/CreateAccount";
import Login from "../components/Login/Login";
import DataProducts from "../components/PersistentDrawerLeft/DataProducts/DataProducts";
import { PageLayout } from "../components/PersistentDrawerLeft/PageLayout";
import ProductPage from "../components/PersistentDrawerLeft/ProductPage/ProductPage";
import SalesPage from "../components/PersistentDrawerLeft/SalesPage/SalesPage";
const Routes = () => {
  return (
    <>
      {/* <BrowserRouter>
        <Router>
          <Route path="/" element={<PageLayout children={<ProductPage />} />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/data" element={<DataProducts />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
        </Router>
      </BrowserRouter> */}
    </>
  );
};

export default Routes;
