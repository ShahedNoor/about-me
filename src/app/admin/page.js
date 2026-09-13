"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function AdminPage() {
  const { user, isAdmin, loading, error, loginWithGoogle, adminEmail } = useAuth();

  // 1. Loading State
  if (loading) {
    return (
      <div
        className="admin-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div className="admin-spinner" style={{ width: "32px", height: "32px", borderTopColor: "#f97316" }} />
          <p style={{ color: "var(--text-secondary, #a3a3a3)", fontSize: "14px", fontWeight: "500" }}>
            Connecting to administrative portal...
          </p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State -> Render Login directly on /admin (URL stays http://localhost:3000/admin)
  if (!user || !isAdmin) {
    return (
      <main className="admin-wrapper admin-login-wrapper">
        <div className="admin-ambient-glow" />

        <div className="admin-login-card">
          {/* Glowing Avatar Ring */}
          <div className="admin-login-avatar-ring">
            <div className="admin-login-avatar">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f97316"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
          </div>

          <div className="admin-badge" style={{ marginBottom: "14px" }}>
            <span className="admin-badge-dot" />
            <span>Admin Portal</span>
          </div>

          <h1 className="admin-login-title">Command Center</h1>
          <p className="admin-login-desc">
            Sign in with your Google account to manage your portfolio content, apps, tech stack, and profile on <strong>shahednoor.me</strong>.
          </p>

          {/* Google Sign-in Button */}
          <button
            onClick={() => loginWithGoogle()}
            disabled={loading}
            className="admin-login-btn-google"
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Clean Human-Readable Error Notification */}
          {error && (
            <div className="admin-login-error">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

        </div>
      </main>
    );
  }

  // 3. Authenticated State -> Render Full Dashboard directly on /admin
  return (
    <main>
      {/* Hero Welcome Section */}
      <section className="admin-hero">
        <div className="admin-eyebrow">
          <span className="admin-eyebrow-slash">//</span>
          <span>Command Center</span>
        </div>
        <h1 className="admin-title">
          Welcome back, {user?.displayName || "Shahed"} 👋
        </h1>
        <p className="admin-subtitle">
          Manage your live apps, tech stack, YouTube episodes, and profile across <strong>shahednoor.me</strong>.
        </p>
      </section>

      {/* Stats Counter Grid */}
      <section className="admin-stats-grid" aria-label="Quick Stats">
        <div className="admin-stat-card">
          <div
            className="admin-stat-icon"
            style={{ "--stat-bg": "rgba(249, 115, 22, 0.12)", "--stat-color": "#f97316" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-val">4</span>
            <span className="admin-stat-label">Shipped Apps</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div
            className="admin-stat-icon"
            style={{ "--stat-bg": "rgba(99, 102, 241, 0.12)", "--stat-color": "#6366f1" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-val">5</span>
            <span className="admin-stat-label">Tech Stack Tools</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div
            className="admin-stat-icon"
            style={{ "--stat-bg": "rgba(34, 197, 94, 0.12)", "--stat-color": "#22c55e" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-val">7</span>
            <span className="admin-stat-label">Road to $1k Episodes</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div
            className="admin-stat-icon"
            style={{ "--stat-bg": "rgba(236, 72, 153, 0.12)", "--stat-color": "#ec4899" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-val" style={{ color: "#22c55e", fontSize: "16px" }}>● Active</span>
            <span className="admin-stat-label">Firebase Cloud Sync</span>
          </div>
        </div>
      </section>

      {/* Main Section Modules Grid */}
      <section className="admin-actions-grid" aria-label="Management Modules">
        {/* Module 1: Apps */}
        <Link href="/admin/apps" className="admin-action-card">
          <div>
            <div className="admin-action-card-header">
              <div
                className="admin-action-icon"
                style={{ background: "rgba(249, 115, 22, 0.12)", color: "#f97316" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="5" y="2" width="14" height="20" rx="2.5" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <svg className="admin-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
            <h2 className="admin-action-title">Apps & Products</h2>
            <p className="admin-action-desc">
              Add new mobile/web apps, update App Store & Google Play links, change screenshots, icons, and pricing.
            </p>
          </div>
          <div className="admin-action-tags">
            <span className="admin-action-tag">Ritualz</span>
            <span className="admin-action-tag">Expensif</span>
            <span className="admin-action-tag">Tuteee</span>
            <span className="admin-action-tag">Micro Warz</span>
          </div>
        </Link>

        {/* Module 2: Tech Stack */}
        <Link href="/admin/stack" className="admin-action-card">
          <div>
            <div className="admin-action-card-header">
              <div
                className="admin-action-icon"
                style={{ background: "rgba(99, 102, 241, 0.12)", color: "#6366f1" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <svg className="admin-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
            <h2 className="admin-action-title">Tech Stack & Guides</h2>
            <p className="admin-action-desc">
              Organize your core tech stack, guide articles, and links (Flutter, Supabase, RevenueCat, Shorebird, Claude).
            </p>
          </div>
          <div className="admin-action-tags">
            <span className="admin-action-tag">Flutter</span>
            <span className="admin-action-tag">Supabase</span>
            <span className="admin-action-tag">RevenueCat</span>
            <span className="admin-action-tag">Shorebird</span>
          </div>
        </Link>

        {/* Module 3: Road to $1k */}
        <Link href="/admin/roadto1k" className="admin-action-card">
          <div>
            <div className="admin-action-card-header">
              <div
                className="admin-action-icon"
                style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <svg className="admin-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
            <h2 className="admin-action-title">Road to $1k Journey</h2>
            <p className="admin-action-desc">
              Publish new episodes, attach YouTube links, revenue graphs, and indie maker milestones.
            </p>
          </div>
          <div className="admin-action-tags">
            <span className="admin-action-tag">7 Episodes</span>
            <span className="admin-action-tag">Ep 0 - Ep 6</span>
          </div>
        </Link>

        {/* Module 4: Profile & Socials */}
        <Link href="/admin/profile" className="admin-action-card">
          <div>
            <div className="admin-action-card-header">
              <div
                className="admin-action-icon"
                style={{ background: "rgba(236, 72, 153, 0.12)", color: "#ec4899" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <svg className="admin-action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
            <h2 className="admin-action-title">Bio & Social Channels</h2>
            <p className="admin-action-desc">
              Update your hero tagline, follower counts, YouTube, X, Instagram, TikTok, GitHub, and Substack handles.
            </p>
          </div>
          <div className="admin-action-tags">
            <span className="admin-action-tag">YouTube</span>
            <span className="admin-action-tag">X / Twitter</span>
            <span className="admin-action-tag">GitHub</span>
            <span className="admin-action-tag">Substack</span>
          </div>
        </Link>
      </section>

      {/* System Status & Live Preview Banner */}
      <footer className="admin-system-card">
        <div className="admin-system-status">
          <span className="admin-system-dot" />
          <span className="admin-system-text">
            Connected to Firebase Project: <strong>shahed-noor</strong> (US-Central)
          </span>
        </div>

        <Link href="/" target="_blank" className="admin-system-link">
          <span>View Live Portfolio</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </Link>
      </footer>
    </main>
  );
}
