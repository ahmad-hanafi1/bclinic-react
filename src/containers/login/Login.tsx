import {
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FaceIcon from "@mui/icons-material/Face";
import { useEffect } from "react";
import { LoginModel } from "./Types";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthContainer from "./GenericContainer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { loginUser } from "../../data/features/auth/authSlice";

function LoginScreen() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    // If already authenticated, redirect to /home immediately
    if (isAuthenticated) {
      console.log("token if authenticated: ", token);
      navigate("/calender", { replace: true });
    } else {
      console.log("first time login");
      console.log("token should be null: ", token);
    }
  }, [isAuthenticated, navigate]);

  const { register, handleSubmit, formState } = useForm<LoginModel>();

  const onSubmit = async (data: LoginModel) => {
    dispatch(loginUser());
  };

  // useEffect(() => {
  //   fetch(
  //     "https://demo.techleara.net/api/v2/authentication/oauth2/token?db=network",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: new URLSearchParams({
  //         grant_type: "client_credentials",
  //         client_id: "DS7T7KuYHKtTft8wu0xkTEg8vQpqmLYUhojWys4e",
  //         client_secret: "qrWxRQeWK246C6bYnsuHKv7EvL5mZNy0NTzlEqEE",
  //       }),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log("✅ Success:", data))
  //     .catch((err) => console.error("❌ Error:", err));
  // }, []);

  return (
    <AuthContainer title="Login to your account" subtitle="Please login here">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          {...register("username", { required: true })}
          label="Username"
          margin="normal"
          disabled={formState.isSubmitting}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <FaceIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          {...register("password", { required: true })}
          label="Password"
          margin="normal"
          disabled={formState.isSubmitting}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me"
          />
          <NavLink to="" style={{ color: "#22C09B" }}>
            Forget Password?
          </NavLink>
        </Stack>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formState.isSubmitting}
            fullWidth
            size="large"
            sx={{ color: "white" }}
          >
            LOGIN
          </LoadingButton>
        </Box>
      </form>
    </AuthContainer>
  );
}

export default LoginScreen;
