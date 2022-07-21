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
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";

export default function Register() {
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();

  const initialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  };
  const [values, setValues] = React.useState(initialValues);

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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const signup = async () => {
    if (values.password !== "" && values.confirmPassword !== "") {
      if (values.password === values.confirmPassword) {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )
          .then(async (userCredential) => {
            const user = userCredential.user;
            const userRef = doc(db, "usersandtasks", user.uid);
            await setDoc(
              userRef,
              { name: values.name, surname: values.surname, tasks: [] },
              { merge: true }
            );
            navigate("/");
            enqueueSnackbar("Registration successful.", {
              variant: "success",
            });
            setValues(initialValues);
          })
          .catch((error) => {
            enqueueSnackbar(error.message, {
              variant: "error",
            });
          });
      }
    } else {
      enqueueSnackbar("Registration failed.", {
        variant: "error",
      });
    }
  };

  return (
    <Box id="registerBox">
      <div>
        <h1 id="registerHeader">Register</h1>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <InputLabel required id="name" htmlFor="outlined-adornment-name">
            Name
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            type={"text"}
            value={values.name}
            onChange={handleChange("name")}
            label="Name"
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <InputLabel
            required
            id="surname"
            htmlFor="outlined-adornment-surname"
          >
            Surname
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-surname"
            type={"text"}
            value={values.surname}
            onChange={handleChange("surname")}
            label="Surname"
          />
        </FormControl>
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
        <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
          <InputLabel required htmlFor="outlined-adornment-confirmpassword">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirmpassword"
            type={values.showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
      </div>
      <div>
        <Button variant="outlined" size="large" onClick={signup}>
          Sign Up
        </Button>
      </div>
      <div id="alreadyRegistered">
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </Box>
  );
}
