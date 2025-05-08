import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./data/store/store.ts";
import { loadTokenFromStorage } from "./data/features/auth/authSlice.ts";

// checks for token in localstorage
store.dispatch(loadTokenFromStorage());

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
