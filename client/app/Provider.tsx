"use client"; // Ensure this is a Client Component

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ReactNode } from "react"; // Import ReactNode for typing children

interface ProviderProps {
  children: ReactNode; // Properly type the children prop
}

export function Providers({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}