"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export function AppProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
