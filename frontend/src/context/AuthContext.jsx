import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Dr. Rajesh Sharma",
    role: "Senior Disaster Analyst",
    agency: "National Disaster Response Force (NDRF)",
    email: "r.sharma@ndrf.gov.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    isLoggedIn: true
  });

  const login = (role = "Analyst", email = "analyst@weather.gov.in") => {
    setUser({
      name: role === "Admin" ? "Admin Control" : "Field Analyst",
      role: role === "Admin" ? "Platform Administrator" : "Disaster Field Analyst",
      agency: "NDRF Command Centre",
      email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isLoggedIn: true
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
