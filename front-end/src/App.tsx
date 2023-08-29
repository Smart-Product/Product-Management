import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./components/Login/Login";
import CreateAccount from "./components/HorizontalLinearStepper/CreateAccount";
import ProductPage from "./components/PersistentDrawerLeft/ProductPage/ProductPage";
import SalesPage from "./components/PersistentDrawerLeft/SalesPage/SalesPage";
import DataProducts from "./components/PersistentDrawerLeft/DataProducts/DataProducts";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { PageLayout } from "./components/PersistentDrawerLeft/PageLayout";

const theme = createTheme();
function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageLayout children={<ProductPage />} />} />
            <Route path="/sales" element={<PageLayout children={<SalesPage />} />} />
            <Route path="/data" element={<PageLayout children={<DataProducts />} />} />
            <Route path="/cadastro" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
