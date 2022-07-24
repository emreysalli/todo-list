import React, { useState, useEffect } from "react";
import "./Profile.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import avatar from "./avatar.jpg";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

function Profile() {
  const [userInfo, setUserInfo] = useState({ name: "", surname: "", mail: "" });

  useEffect(() => {
    const getUserInfo = async () => {
      var userUid = auth.currentUser.uid;
      const docRef = doc(db, "usersandtasks", userUid);
      const docSnap = await getDoc(docRef);
      setUserInfo({
        name: docSnap.data()["name"],
        surname: docSnap.data()["surname"],
        mail: auth.currentUser.email,
      });
    };
    getUserInfo();
  });
  return (
    <Box id="profile-container">
      <Card id="profile-card" sx={{ maxWidth: 345, maxHeight: 450 }}>
        <CardMedia
          component="img"
          image={avatar}
          alt="avatar"
          id="card-media"
        />
        <CardContent sx={{ width: 300 }}>
          <Typography gutterBottom variant="h5" component="div">
            {userInfo.name} {userInfo.surname}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {userInfo.mail}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;
