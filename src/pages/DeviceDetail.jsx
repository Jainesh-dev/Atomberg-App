// src/pages/DeviceDetail.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import FanIcon from "../components/FanIcon";

export default function DeviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const lastSavedRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    api.getDevice(id)
      .then((d) => {
        if (!mounted) return;
        if (!d) setError("Device not found");
        else {
          setDevice(d);
          lastSavedRef.current = JSON.stringify(d);
        }
      })
      .catch(() => setError("Failed to load device"))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <p className="text-muted">Loading device…</p>;
  if (error) return (
    <div>
      <p style={{ color: "#b91c1c" }}>{error}</p>
      <button className="mt-3 px-3 py-1 bg-white/6 rounded" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
  if (!device) return null;

  async function smartSave(patch) {
    const final = { ...patch };

    if (final.hasOwnProperty("speed") && Number(final.speed) === 0) {
      final.on = false;
    }
    if (final.hasOwnProperty("on") && final.on === true && (device.speed === 0 && !final.hasOwnProperty("speed"))) {
      final.speed = 1;
    }

    const prospective = { ...device, ...final };
    const prospectiveStr = JSON.stringify(prospective);
    if (lastSavedRef.current === prospectiveStr) return;

    setSaving(true);
    const prev = { ...device };
    setDevice(prospective);

    try {
      const updated = await api.updateDevice(device.id, final);
      setDevice(updated);
      lastSavedRef.current = JSON.stringify(updated);
    } catch (err) {
      setDevice(prev);
      setError("Failed to save");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  function onTogglePower() {
    const turningOn = !device.on;
    smartSave({ on: turningOn, ...(turningOn && device.speed === 0 ? { speed: 1 } : {}) });
  }

  function onSpeedChange(value) {
    setDevice((d) => ({ ...d, speed: Number(value), on: Number(value) > 0 ? d.on : false }));
  }

  function onSpeedCommit(value) {
    const speedVal = Number(value);
    smartSave({ speed: speedVal });
  }

  const isActive = device.on && device.speed > 0;

  return (
    <div className="detail-grid">
      <div className="glass-card p-4">
        <button className="text-muted mb-3" onClick={() => navigate(-1)}>← Back</button>

        {/* title uses theme class */}
        <h2 className="text-normal text-2xl font-bold">{device.name}</h2>
        <div className="title-flair mb-4" />

        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <div className="fan-wrapper">
            <div className="fan-hero" aria-hidden>
              <div className="fan-wrapper">
                <FanIcon size={200} speed={device.speed} on={isActive} />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3">
              <p className="text-muted">Power</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={onTogglePower}
                  disabled={saving}
                  aria-pressed={device.on}
                  className={`neon-btn px-4 py-2 rounded-lg ${saving ? "opacity-60 cursor-not-allowed" : "hover:brightness-105"}`}
                >
                  {saving ? "Saving…" : (device.on ? "Turn Off" : "Turn On")}
                </button>
                <div className={isActive ? "glow-badge" : "id-badge"}>{isActive ? "Running" : "Stopped"}</div>
              </div>
            </div>

            <div>
              <p className="text-muted mb-2">Speed: <span className="font-medium">{device.speed}</span></p>
              <input
                type="range"
                min="0" max="3"
                value={device.speed}
                onChange={(e) => onSpeedChange(e.target.value)}
                onMouseUp={(e) => onSpeedCommit(e.target.value)}
                onTouchEnd={(e) => onSpeedCommit(e.target.value)}
                disabled={saving}
                className="w-full"
                aria-valuemin={0}
                aria-valuemax={3}
                aria-valuenow={device.speed}
              />
            </div>
          </div>

          {error && <p style={{ color: "#b91c1c" }} className="mt-3">{error}</p>}
        </div>
      </div>

      <aside className="glass-card p-4">
        <h3 className="text-normal text-lg font-semibold mb-3">Telemetry & Controls</h3>
        <div className="space-y-3 text-muted">
          <div className="flex items-center justify-between">
            <div>Battery</div>
            <div className="font-mono">94%</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Last checked</div>
            <div className="font-mono text-xs">2025-11-11T10:00Z</div>
          </div>

          <hr className="my-3 border-black/6" />

          <div>
            <p className="text-muted mb-2">Quick actions</p>
            <div className="flex gap-3">
              <button className="px-3 py-1 bg-white/6 rounded">Ping</button>
              <button className="px-3 py-1 bg-white/6 rounded">Factory Reset</button>
              <button className="px-3 py-1 bg-white/6 rounded">Schedule Check</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
