import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCredentials } from "../stores/AuthStore";
import { useOdoo } from "../contexts/OdooContext";
import { useSnackbar } from "./SnackbarHook";

interface LoginProps {
  username: string;
  password: string;
  url: string;
  db_name: string;
}

interface SignUpProps {
  name: string;
  password: string;
  login: string;
  url: string;
  db_name: string;
  partner_fields: Record<string, unknown>;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const odoo = useOdoo();
  const { showMessage } = useSnackbar();

  const loginRequest = async (loginData: LoginProps) => {
    return await odoo?.authenticate(loginData);
  };

  const signupRequest = async (signUpData: SignUpProps) => {
    return await odoo?.signUp(signUpData);
  };

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSettled: (response) => {
      // Assuming your requestHandler standardizes responses
      if (response?.code === "success") {
        // Dispatch Redux action with the necessary data
        dispatch(
          setCredentials({
            accessToken: response.data.access_token,
            tokenType: response.data.token_type,
            isAuthenticated: true,
          })
        );

        // Optionally save the uid to sessionStorage or localStorage for persistence
        if (response.data.access_token && response.data.token_type) {
          sessionStorage.setItem("access_token", response.data.access_token);
          sessionStorage.setItem("token_type", response.data.token_type);
          showMessage("Audintecated Successfully!", "success");
        }
      } else if (response?.code === "error") {
        showMessage(response?.error.message, "error");
      }
    },
    onError: (error: Error) => {
      showMessage("Login request failed: " + error.message, "error");
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signupRequest,
    onSettled: (response) => {
      // Assuming your requestHandler standardizes responses
      if (response?.code === "success") {
        // Dispatch Redux action with the necessary data
        dispatch(
          setCredentials({
            accessToken: response.data.access_token,
            tokenType: response.data.token_type,
            isAuthenticated: true,
          })
        );

        // Optionally save the uid to sessionStorage or localStorage for persistence
        if (response.data.access_token && response.data.token_type) {
          sessionStorage.setItem("access_token", response.data.access_token);
          sessionStorage.setItem("token_type", response.data.token_type);
          showMessage("Audintecated Successfully!", "success");
        }
      } else if (response?.code === "error") {
        showMessage(
          (response.error?.response?.data as { detail: string })?.detail ||
            "Registration failed",
          "error"
        );
      }
    },
    onError: (error: Error) => {
      showMessage("Login request failed: " + error.message, "error");
    },
  });

  return { loginMutation, signUpMutation };
};
