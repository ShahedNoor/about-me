"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getApps, saveApp, deleteApp, seedInitialApps } from "../../../lib/firestore-service";

const COLOR_PRESETS = [
  { name: "Orange", hex: "#F97316" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Purple", hex: "#8B5CF6" },
  { name: "Rose", hex: "#F43F5E" },
  { name: "Blue", hex: "#3B82F6" },
  { name: "Amber", hex: "#F59E0B" },
  { name: "Cyan", hex: "#06B6D4" },
];

export default function AdminAppsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const loadApps = async () => {
    setLoading(true);
    try {
      const data = await getApps();
      setApps(data);
    } catch (err) {
      console.error("Failed to load apps:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApps();
  }, []);

  const handleOpenAdd = () => {
    setCurrentApp({
      id: "",
      title: "",
      verb: "Build",
      category: "Mobile App",
      number: String(apps.length + 1).padStart(2, "0"),
      order: apps.length + 1,
      desc: "",
      color: "#F97316",
      iconType: "flame",
      posterUrl: "",
      websiteUrl: "",
      appStoreUrl: "",
      googlePlayUrl: "",
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (app) => {
    setCurrentApp({ ...app });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteApp(id);
        setApps(apps.filter((a) => a.id !== id));
        showToast(`App "${title}" deleted successfully!`);
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete app from Firestore.");
      }
    }
  };

  const handleSeed = async () => {
    if (confirm("Populate Firestore with the 4 default portfolio apps?")) {
      setSaving(true);
      try {
        await seedInitialApps();
        await loadApps();
        showToast("Default apps successfully synchronized with Firestore!");
      } catch (err) {
        console.error("Seed error:", err);
        alert("Failed to sync defaults. Please ensure your Firestore rules allow write access.");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentApp.title.trim()) {
      alert("Please provide an app title.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...currentApp,
        id: currentApp.id || currentApp.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        order: Number(currentApp.order) || 1,
      };

      await saveApp(payload);
      await loadApps();
      setIsModalOpen(false);
      showToast(`App "${payload.title}" saved successfully!`);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save app: " + (err.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <main>
      {toast && (
        <div className="admin-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toast}</span>
        </div>
      )}

      {/* Header Actions */}
      <div className="admin-header-actions">
        <div>
          <div className="admin-eyebrow">
            <span className="admin-eyebrow-slash">//</span>
            <span>Products & Portfolio</span>
          </div>
          <h1 className="admin-title">Apps Manager</h1>
          <p className="admin-subtitle">
            Create, update, reorder, and link your live mobile & web applications.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleSeed}
            disabled={saving}
            className="admin-btn-secondary"
            type="button"
            title="Populate with initial 4 apps"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>Sync Default Apps</span>
          </button>

          <button onClick={handleOpenAdd} className="admin-btn-primary" type="button">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add New App</span>
          </button>
        </div>
      </div>

      {/* Apps List */}
      {loading ? (
        <div style={{ padding: "60px 0", textAlign: "center" }}>
          <div className="admin-spinner" style={{ margin: "0 auto 16px auto", width: "28px", height: "28px", borderTopColor: "#f97316" }} />
          <p style={{ color: "var(--text-secondary, #a3a3a3)", fontSize: "14px" }}>Loading apps from Firestore...</p>
        </div>
      ) : apps.length === 0 ? (
        <div style={{ padding: "60px 20px", textAlign: "center", background: "var(--surface, rgba(26,26,26,0.5))", borderRadius: "24px", border: "1px dashed var(--border, rgba(255,255,255,0.1))" }}>
          <p style={{ color: "var(--text-primary, #f5f5f5)", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>No Apps Found</p>
          <p style={{ color: "var(--text-secondary, #a3a3a3)", fontSize: "13px", marginBottom: "20px" }}>Click "Sync Default Apps" to initialize with your 4 starter apps or create one from scratch.</p>
          <button onClick={handleSeed} className="admin-btn-primary" type="button">
            Sync Default Apps
          </button>
        </div>
      ) : (
        <div className="admin-items-list">
          {apps.map((app) => (
            <div key={app.id} className="admin-item-row">
              <div className="admin-item-left">
                {app.posterUrl ? (
                  <img src={app.posterUrl} alt={app.title} className="admin-item-thumb" />
                ) : (
                  <div
                    className="admin-item-thumb"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: app.color ? `${app.color}20` : "#1e1e1e",
                      color: app.color || "#f97316",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    {app.title?.charAt(0) || "A"}
                  </div>
                )}

                <div className="admin-item-info">
                  <div className="admin-item-meta">
                    <span style={{ color: app.color || "#f97316", fontWeight: "700" }}>
                      #{app.number || app.order}
                    </span>
                    <span>·</span>
                    <span>{app.verb || "Build"}</span>
                    <span>·</span>
                    <span style={{ color: "var(--text-primary, #f5f5f5)" }}>{app.category}</span>
                  </div>
                  <h3 className="admin-item-title">{app.title}</h3>
                  <p className="admin-item-desc">{app.desc}</p>
                </div>
              </div>

              <div className="admin-item-actions">
                {app.websiteUrl && (
                  <a
                    href={app.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="admin-btn-secondary"
                    style={{ padding: "6px 12px", fontSize: "12px" }}
                    title="Visit App Website"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span>View</span>
                  </a>
                )}

                <button
                  onClick={() => handleOpenEdit(app)}
                  className="admin-btn-secondary"
                  style={{ padding: "6px 14px", fontSize: "12px" }}
                  type="button"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(app.id, app.title)}
                  className="admin-btn-danger"
                  type="button"
                  title="Delete App"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit App */}
      {isModalOpen && currentApp && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {currentApp.id ? `Edit ${currentApp.title}` : "Add New App"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="admin-btn-secondary"
                style={{ padding: "6px 10px", borderRadius: "50%" }}
                type="button"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label className="admin-label">App Title *</label>
                  <input
                    type="text"
                    required
                    value={currentApp.title}
                    onChange={(e) => setCurrentApp({ ...currentApp, title: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. Ritualz"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Action Verb</label>
                  <input
                    type="text"
                    value={currentApp.verb}
                    onChange={(e) => setCurrentApp({ ...currentApp, verb: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. Track, Budget, Learn"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Category / Subtitle</label>
                  <input
                    type="text"
                    value={currentApp.category}
                    onChange={(e) => setCurrentApp({ ...currentApp, category: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. Habit Tracker"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Display Order / Number</label>
                  <input
                    type="number"
                    value={currentApp.order}
                    onChange={(e) =>
                      setCurrentApp({
                        ...currentApp,
                        order: e.target.value,
                        number: String(e.target.value).padStart(2, "0"),
                      })
                    }
                    className="admin-input"
                    placeholder="1"
                  />
                </div>

                <div className="admin-form-group full-width">
                  <label className="admin-label">Description</label>
                  <textarea
                    value={currentApp.desc}
                    onChange={(e) => setCurrentApp({ ...currentApp, desc: e.target.value })}
                    className="admin-textarea"
                    placeholder="Short punchy description for the card..."
                  />
                </div>

                <div className="admin-form-group full-width">
                  <label className="admin-label">Brand Color Accent</label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginTop: "4px" }}>
                    {COLOR_PRESETS.map((p) => (
                      <button
                        key={p.hex}
                        type="button"
                        onClick={() => setCurrentApp({ ...currentApp, color: p.hex })}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: p.hex,
                          border: currentApp.color === p.hex ? "3px solid #ffffff" : "1px solid rgba(255,255,255,0.2)",
                          cursor: "pointer",
                        }}
                        title={p.name}
                      />
                    ))}
                    <input
                      type="text"
                      value={currentApp.color}
                      onChange={(e) => setCurrentApp({ ...currentApp, color: e.target.value })}
                      className="admin-input"
                      style={{ width: "110px", padding: "6px 10px" }}
                      placeholder="#F97316"
                    />
                  </div>
                </div>

                <div className="admin-form-group full-width">
                  <label className="admin-label">Poster / Screenshot Image URL</label>
                  <input
                    type="url"
                    value={currentApp.posterUrl}
                    onChange={(e) => setCurrentApp({ ...currentApp, posterUrl: e.target.value })}
                    className="admin-input"
                    placeholder="https://.../screenshot.png"
                  />
                </div>

                <div className="admin-form-group full-width">
                  <label className="admin-label">Website / Landing Page URL</label>
                  <input
                    type="text"
                    value={currentApp.websiteUrl}
                    onChange={(e) => setCurrentApp({ ...currentApp, websiteUrl: e.target.value })}
                    className="admin-input"
                    placeholder="https://yourapp.com"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Apple App Store URL</label>
                  <input
                    type="url"
                    value={currentApp.appStoreUrl}
                    onChange={(e) => setCurrentApp({ ...currentApp, appStoreUrl: e.target.value })}
                    className="admin-input"
                    placeholder="https://apps.apple.com/app/..."
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Google Play Store URL</label>
                  <input
                    type="url"
                    value={currentApp.googlePlayUrl}
                    onChange={(e) => setCurrentApp({ ...currentApp, googlePlayUrl: e.target.value })}
                    className="admin-input"
                    placeholder="https://play.google.com/store/apps/..."
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="admin-btn-secondary"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary" disabled={saving}>
                  {saving ? (
                    <>
                      <span className="admin-spinner" style={{ borderTopColor: "#fff" }} />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save App</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
