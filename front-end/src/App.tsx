import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/Login/Login";
import ProductPage from "./components/PersistentDrawerLeft/ProductPage/ProductPage";
import SalesPage from "./components/PersistentDrawerLeft/SalesPage/SalesPage";
import DataProducts from "./components/PersistentDrawerLeft/DataProducts/DataProducts";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PageLayout } from "./components/PersistentDrawerLeft/PageLayout";
import ProductForms from "./components/FormComponents/ProductForms/ProductForms";
import  GlobalStyle  from "../global";
import { ToastContainer } from 'react-toastify';
import UserForms from "./components/FormComponents/UserForms/UserForms";


const theme = createTheme();
function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastContainer/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageLayout children={<ProductPage />} />} />
            <Route path="/sales" element={<PageLayout children={<SalesPage />} />} />
            <Route path="/data" element={<PageLayout children={<DataProducts />} />} />
            <Route path="/adicionar_produto" element={<ProductForms/>} />
            <Route path="/cadastro" element={<UserForms/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
