import React, { useState, useEffect } from "react";
import "./App.css";
import AppBar from "./components/AppBar/AppBar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import MainWindow from "./components/MainWindow/MainWindow.jsx";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { db, auth } from "./firebase-config.js";
import { doc, setDoc } from "firebase/firestore";

function App() {
  const [query, setQuery] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    const setUser = async () => {
      const userUid = auth.currentUser?.uid;
      await setDoc(
        doc(db, "usersandtasks", userUid),
        { tasks: taskItems },
        { merge: true }
      );
    };
    setUser();
  }, [taskItems]);

  return (
    <div>
      <Router>
        <AppBar setQuery={setQuery} setTaskItems={setTaskItems} />

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
