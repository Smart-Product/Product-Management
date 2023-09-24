import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import GlobalStyle from "../global";
import { Routes } from "./Routes/Routes";


const theme = createTheme();

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <ToastContainer />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
