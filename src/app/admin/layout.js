"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import "./admin.css";

function AdminLayoutShell({ children }) {
  const { user, isAdmin, loading, logout } = useAuth();
  const pathname = usePathname();

  // If loading or unauthenticated, let the children (e.g. login component in page.js) render without the navbar
  if (loading || !isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-ambient-glow" />
      
      <div className="admin-container">
        {/* Top Floating Dashboard Navbar */}
        <header className="admin-navbar">
          <Link href="/admin" className="admin-brand">
            <div className="admin-badge">
              <span className="admin-badge-dot" />
              <span>Admin</span>
            </div>
            <span>Shahed Noor</span>
          </Link>

          <nav className="admin-nav-links">
            <Link
              href="/admin"
              className={`admin-nav-pill ${pathname === "/admin" ? "active" : ""}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/apps"
              className={`admin-nav-pill ${pathname.startsWith("/admin/apps") ? "active" : ""}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span>Apps</span>
            </Link>

            <Link
              href="/admin/stack"
              className={`admin-nav-pill ${pathname.startsWith("/admin/stack") ? "active" : ""}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span>Stack</span>
            </Link>

            <Link
              href="/admin/profile"
              className={`admin-nav-pill ${pathname.startsWith("/admin/profile") ? "active" : ""}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Profile</span>
            </Link>
          </nav>

          {/* User profile info & Logout */}
          <div className="admin-user-pill">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Admin"}
                  className="admin-avatar"
                />
              ) : (
                <div
                  className="admin-avatar"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f97316",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  S
                </div>
              )}
              <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary, #f5f5f5)" }}>
                {user?.displayName?.split(" ")[0] || "Shahed"}
              </span>
            </div>

            <button
              onClick={() => logout()}
              className="admin-btn-logout"
              title="Sign Out"
              type="button"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </AuthProvider>
  );
}
