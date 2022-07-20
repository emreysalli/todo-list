import React, { useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar/AppBar.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import MainWindow from "./components/MainWindow/MainWindow.jsx";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  return (
    <div>
      <Router>
        <AppBar setQuery={setQuery} />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <MainWindow
                query={query}
                taskItems={taskItems}
                setTaskItems={setTaskItems}
              />
            }
          />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}
export default App;
