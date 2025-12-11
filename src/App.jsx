import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Devices from "./pages/Devices";
import DeviceDetail from "./pages/DeviceDetail";
function TopBar() {
  return (
    <div className="app-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="public/App_logo.png"
          alt="Atomberg"
          style={{ width: 32, height: 32 }}
        />
        <span style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b" }}>
          Atomberg Home
        </span>
      </div>
    </div>
  );
}



function Background() {
  return (
    <div className="app-background" aria-hidden>
      {/* watermark — use SVG in public folder */}
      <img className="app-watermark" src="/atomberg-logo.svg" alt="" />

      {/* drifting orbs */}
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />
    </div>
  );
}

function BottomNav() {
  return (
    <div className="bottom-nav" role="navigation" aria-label="Main navigation">
      <Link to="/" className="text-dim">Devices</Link>
      <a className="text-dim" href="#stats">Stats</a>
      <a className="text-dim" href="#settings">Settings</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <img src="public/logo.png" alt="" className="app-watermark" />
      <Background />
      <div className="app-root">
        <div className="app-frame">
          <TopBar />
          <main style={{ marginTop: 12 }}>
            <Routes>
              <Route path="/" element={<Devices />} />
              <Route path="/device/:id" element={<DeviceDetail />} />
            </Routes>
          </main>
        </div>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
