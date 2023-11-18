import React from 'react';
import Ubicaciones from "../pages/Ubicaciones";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Graficos from "../pages/Graficos";

export default function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Ubicaciones />} />
          <Route path="/graficos" element={<Graficos />} />
      </Routes>
    </Router>
  );
}
