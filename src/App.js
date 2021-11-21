import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DefaultLayout from "./containers/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path='/*' element={<DefaultLayout/>} />
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
