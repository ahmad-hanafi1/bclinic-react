/* eslint-disable react-refresh/only-export-components */
// OdooContext.tsx

import config from "../../../config.ts";

import React, {
  createContext,
  useContext,
  ReactNode,
  ReactElement,
} from "react";
import OdooClient from "../../api/OdooClient";
// Specify your server URL and database name
const GATEWAY_URL: string = config.gatewayUrl;
// const GATEWAY_URL: string = "http://localhost:8000";
// const DB_NAME: string = "dishdash";

// Initialize your OdooClient
const odoo = new OdooClient(GATEWAY_URL);

// Create a context with a default value of null or an OdooClient instance
const OdooContext = createContext<OdooClient | null>(null);

interface OdooProviderProps {
  children: ReactNode | ReactElement | ReactElement[];
}

// Define your OdooProvider component with proper typing for props
export const OdooProvider: React.FC<OdooProviderProps> = ({ children }) => (
  <OdooContext.Provider value={odoo}>{children}</OdooContext.Provider>
);

// Custom hook to use the Odoo context
export const useOdoo = (): OdooClient | null => useContext(OdooContext);
