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
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

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
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(user);
      alert("giris basarili");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      alert("giris basarisiz");
    }
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
