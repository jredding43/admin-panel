import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./components/Products";
import Specials from "./components/Specials";
import Gardens from "./components/Greenhouse";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
      <Route path="/specials" element={user ? <Specials /> : <Navigate to="/login" />} />
      <Route path="/gardens" element={user ? <Gardens /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
