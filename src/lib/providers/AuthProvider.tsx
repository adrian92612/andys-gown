"use client";

import { createContext, useContext, useState } from "react";
import { TokenPayload } from "../auth";

type AuthContextType = {
  user: TokenPayload | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  initialUser: TokenPayload | null;
  children: React.ReactNode;
};

export const AuthProvider = ({ initialUser, children }: Props) => {
  const [user] = useState<TokenPayload | null>(initialUser);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
