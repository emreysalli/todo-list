import React, { useState } from "react";
import "./App.css";
import AppBar from "./components/AppBar/AppBar.jsx";
import Profile from "./components/Pages/Profile/Profile.jsx";
import Register from "./components/Pages/Register/Register.jsx";
import Login from "./components/Pages/Login/Login.jsx";
import Datagrid from "./components/Pages/Datagrid/Datagrid.jsx";
import MainWindow from "./components/Pages/MainWindow/MainWindow.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { db } from "./firebase-config.js";
import { doc, setDoc } from "firebase/firestore";

function App() {
  const [query, setQuery] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const setUser = async (uid) => {
    await setDoc(
      doc(db, "usersandtasks", uid),
      { tasks: taskItems },
      { merge: true }
    );
  };

  return (
    <div>
      <Router>
        <AppBar
          setQuery={setQuery}
          setTaskItems={setTaskItems}
          setUser={setUser}
        />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setTaskItems={setTaskItems} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={
              <MainWindow
                query={query}
                taskItems={taskItems}
                setTaskItems={setTaskItems}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/datagrid"
            element={<Datagrid taskItems={taskItems} />}
          />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}
export default App;
