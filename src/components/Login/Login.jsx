import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSnackbar } from "notistack";
import { doc, getDoc } from "firebase/firestore";

export default function LogIn(props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
    showPassword: false,
  };
  const [values, setValues] = React.useState(initialState);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signin = async () => {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "usersandtasks", user.uid);
        const docSnap = await getDoc(docRef);
        props.setTaskItems(docSnap.data()["tasks"]);
        navigate("/");
        enqueueSnackbar("Login successful.", {
          variant: "success",
        });
        setValues(initialState);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      });
  };

  return (
    <Box id="loginBox">
      <div>
        <h1 id="loginHeader">Sign In</h1>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <InputLabel required id="email" htmlFor="outlined-adornment-email">
            E-mail
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            type={"text"}
            value={values.email}
            onChange={handleChange("email")}
            label="E-mail"
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <InputLabel required htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>

      <div>
        <Button variant="outlined" size="large" onClick={signin}>
          Sign In
        </Button>
      </div>
      <div id="needanAccount">
        <p>
          Need an Account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </Box>
  );
}
