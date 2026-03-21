import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { AdminLogin } from "../AdminLogin";

export default function AdminPage({ onBack }) {
  // Persist login across refreshes using sessionStorage.
  // Session clears automatically when the browser tab is closed.
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem("admin_authed") === "true";
    } catch {
      return false;
    }
  });

  const login = () => {
    try {
      sessionStorage.setItem("admin_authed", "true");
    } catch {}
    setAuthed(true);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem("admin_authed");
    } catch {}
    setAuthed(false);
  };

  return authed ? (
    <AdminDashboard onLogout={logout} onGoHome={onBack} />
  ) : (
    <AdminLogin onSuccess={login} onBack={onBack} />
  );
}
