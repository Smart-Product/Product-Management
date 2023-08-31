import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersistentDrawerLeft from "./components/PersistentDrawerLeft/PersistentDrawerLeft";
import Login from "./components/Login/Login";
import CreateAccount from "./components/HorizontalLinearStepper/CreateAccount";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<PersistentDrawerLeft />} />
            <Route path="/cadastro" element={<CreateAccount/>} />
            <Route path="/login" element={<Login/>} /> 
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
