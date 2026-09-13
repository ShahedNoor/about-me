"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getApps } from "../../lib/firestore-service";

function AppCardSkeleton() {
  return (
    <article className="tech-card app-card app-skeleton-card">
      <div className="app-card-main" style={{ pointerEvents: "none" }}>
        <div className="app-card-body">
          <div className="app-card-head" style={{ marginBottom: "16px" }}>
            <div className="shimmer-block" style={{ width: "44px", height: "44px", borderRadius: "14px" }} />
            <div className="shimmer-block" style={{ width: "24px", height: "16px", borderRadius: "6px" }} />
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
            <div className="shimmer-block" style={{ width: "40px", height: "12px", borderRadius: "4px" }} />
            <div className="shimmer-block" style={{ width: "80px", height: "12px", borderRadius: "4px" }} />
          </div>

          <div className="shimmer-block" style={{ width: "65%", height: "24px", borderRadius: "8px", marginBottom: "12px" }} />
          <div className="shimmer-block" style={{ width: "95%", height: "14px", borderRadius: "4px", marginBottom: "6px" }} />
          <div className="shimmer-block" style={{ width: "80%", height: "14px", borderRadius: "4px" }} />
        </div>

        <div className="app-card-media" style={{ minHeight: "260px", background: "transparent" }}>
          <div className="shimmer-block" style={{ width: "100%", height: "100%", borderRadius: "18px" }} />
        </div>
      </div>

      <div className="app-card-stores" style={{ marginTop: "16px" }}>
        <div className="shimmer-block" style={{ width: "90px", height: "30px", borderRadius: "9999px" }} />
        <div className="shimmer-block" style={{ width: "95px", height: "30px", borderRadius: "9999px" }} />
      </div>
    </article>
  );
}

export default function AppsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getApps();
        setApps(data);
      } catch (err) {
        console.error("Error loading apps:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getAppIcon = (iconType, color) => {
    switch (iconType) {
      case "card":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
            <line x1="2.5" y1="10" x2="21.5" y2="10" />
            <line x1="6" y1="15" x2="10" y2="15" />
          </svg>
        );
      case "education":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10L12 5 2 10l10 5 10-5z" />
            <path d="M6 12v5c0 1 3 2.5 6 2.5s6-1.5 6-2.5v-5" />
            <line x1="22" y1="10" x2="22" y2="15" />
          </svg>
        );
      case "gamepad":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="11" rx="3.5" />
            <line x1="6" y1="12.5" x2="10" y2="12.5" />
            <line x1="8" y1="10.5" x2="8" y2="14.5" />
            <circle cx="15.5" cy="11.5" r="0.8" fill={color} stroke="none" />
            <circle cx="18" cy="13.5" r="0.8" fill={color} stroke="none" />
          </svg>
        );
      default: // flame/fire
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
          </svg>
        );
    }
  };

  return (
    <>
      <style jsx global>{`
        .shimmer-block {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
        }
        :root[data-theme="light"] .shimmer-block {
          background: rgba(0, 0, 0, 0.06);
        }
        .shimmer-block::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 50%,
            transparent 100%
          );
          animation: shimmerSlide 1.6s infinite ease-in-out;
        }
        :root[data-theme="light"] .shimmer-block::after {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 100%
          );
        }
        @keyframes shimmerSlide {
          100% {
            transform: translateX(100%);
          }
        }
        .app-skeleton-card {
          border-color: rgba(255, 255, 255, 0.06) !important;
          animation: pulseFade 2s infinite ease-in-out;
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.95; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Top Floating Navigation Pill */}
      <nav className="site-nav" aria-label="Site navigation">
        <div className="site-nav-pill liquid-glass chroma-thick with-lens-sm">
          <Link className="site-nav-chip site-nav-chip-back" aria-label="Back" title="Back" href="/">
            <span className="site-nav-chip-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </span>
          </Link>
          <span className="site-nav-divider" aria-hidden="true" />
          <button
            type="button"
            aria-label="Switch to dark mode"
            className="site-nav-pill-theme"
            style={{ opacity: 1 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4.2" />
              <line x1="12" y1="2.5" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="21.5" />
              <line x1="2.5" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="21.5" y2="12" />
              <line x1="4.9" y1="4.9" x2="6.7" y2="6.7" />
              <line x1="17.3" y1="17.3" x2="19.1" y2="19.1" />
              <line x1="4.9" y1="19.1" x2="6.7" y2="17.3" />
              <line x1="17.3" y1="6.7" x2="19.1" y2="4.9" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="tech-page">
        <div className="tech-shell">
          {/* Header */}
          <header className="page-hero">
            <div className="page-eyebrow">
              <span className="page-eyebrow-slash" aria-hidden="true">//</span>
              <span className="page-eyebrow-label">Apps</span>
            </div>
            <h1 className="page-hero-title">Apps I&#x27;ve Built</h1>
            <p className="page-hero-desc">Indie apps shipped on iOS and Android.</p>
            <div className="page-meta">
              <span className="page-meta-user">
                <img
                  alt="Shahed Noor"
                  width="18"
                  height="18"
                  className="page-meta-avatar"
                  src="/images/shahed_noor.png"
                  onError={(e) => {
                    e.currentTarget.src = "/images/logo.png";
                  }}
                />
                <span>Shahed Noor</span>
              </span>
              <span className="page-meta-dot" aria-hidden="true" />
              <span className="page-meta-item">
                {loading ? "..." : `${apps.length} Apps`}
              </span>
              <span className="page-meta-dot" aria-hidden="true" />
              <Link className="page-meta-link" href="/">Home</Link>
            </div>
          </header>

          {/* Apps Dynamic Grid (or Shimmer Loading) */}
          <section className="apps-grid" aria-label="Apps">
            {loading ? (
              <>
                <AppCardSkeleton />
                <AppCardSkeleton />
                <AppCardSkeleton />
                <AppCardSkeleton />
              </>
            ) : apps.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", padding: "40px", textAlign: "center", color: "var(--text-secondary, #a3a3a3)" }}>
                No apps published yet.
              </div>
            ) : (
              apps.map((app, index) => {
                const accentColor = app.color || "#F97316";
                const appNumber = app.number || String(index + 1).padStart(2, "0");

                return (
                  <article
                    key={app.id || index}
                    className="tech-card app-card group"
                    style={{
                      "--card-accent": `${accentColor}12`,
                      "--section-color": accentColor,
                    }}
                  >
                    <a
                      href={app.websiteUrl || "#"}
                      target={app.websiteUrl?.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="app-card-main"
                    >
                      <div className="app-card-body">
                        <div className="app-card-head">
                          <div className="tech-icon tech-card-icon-lg" style={{ "--icon-color": accentColor }}>
                            {getAppIcon(app.iconType, accentColor)}
                          </div>
                          <span className="stack-card-number">{appNumber}</span>
                        </div>

                        <div className="stack-card-meta-row">
                          <span className="stack-card-verb">{app.verb || "Build"}</span>
                          <span className="stack-card-dot" aria-hidden="true">·</span>
                          <span className="tech-card-meta">{app.category || "App"}</span>
                        </div>

                        <h2 className="tech-card-title">{app.title}</h2>
                        <p className="tech-card-desc">{app.desc}</p>
                      </div>

                      {app.posterUrl && (
                        <div className="app-card-media">
                          <img
                            alt={app.title}
                            className="app-card-poster"
                            style={{
                              position: "absolute",
                              height: "100%",
                              width: "100%",
                              left: 0,
                              top: 0,
                              right: 0,
                              bottom: 0,
                              objectFit: "cover",
                            }}
                            src={app.posterUrl}
                          />
                        </div>
                      )}
                    </a>

                    {(app.appStoreUrl || app.googlePlayUrl) && (
                      <div className="app-card-stores">
                        {app.appStoreUrl && (
                          <a
                            href={app.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tech-pill app-store-pill"
                            aria-label={`${app.title} on the App Store`}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M17.05 12.04c-.03-3.15 2.58-4.67 2.7-4.74-1.47-2.15-3.76-2.45-4.58-2.48-1.95-.2-3.81 1.15-4.8 1.15-1 0-2.52-1.12-4.15-1.09-2.13.03-4.1 1.24-5.2 3.14-2.22 3.85-.57 9.55 1.6 12.68 1.06 1.53 2.32 3.25 3.97 3.19 1.6-.07 2.2-1.03 4.13-1.03 1.93 0 2.48 1.03 4.17.99 1.73-.03 2.82-1.55 3.87-3.09 1.22-1.77 1.72-3.49 1.75-3.58-.04-.02-3.35-1.29-3.38-5.13zM13.8 3.13c.88-1.07 1.48-2.56 1.31-4.03-1.27.05-2.81.85-3.72 1.91-.81.94-1.52 2.45-1.33 3.9 1.42.11 2.86-.72 3.74-1.78z" />
                            </svg>
                            <span>App Store</span>
                          </a>
                        )}

                        {app.googlePlayUrl && (
                          <a
                            href={app.googlePlayUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tech-pill app-store-pill"
                            aria-label={`${app.title} on Google Play`}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M3.5 1.7v20.6L14.7 12 3.5 1.7zm12.5 11.6l3.5 2-15.8 9.1L16 13.3zM20.2 9.4l-3.7 2.1L4.6 1l15.6 8.4zM21.9 12c0 .6-.3 1.2-.9 1.6l-2.5 1.4L15.7 12l2.8-3 2.5 1.4c.6.4.9 1 .9 1.6z" />
                            </svg>
                            <span>Google Play</span>
                          </a>
                        )}
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </section>

          {/* Footer */}
          <footer className="stack-signoff" aria-label="Footer">
            <div className="site-signoff">
              <p className="article-footer-byline">
                Created with <span className="article-footer-heart" aria-hidden="true">♥</span> by Shahed Noor
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
