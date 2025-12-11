// src/components/DeviceCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import FanIcon from "./FanIcon";

export default function DeviceCard({ device }) {
  const navigate = useNavigate();
  const speed = device.speed ?? 0;
  const isActive = device.on && speed > 0;

  const glow = isActive ? `0 0 ${6 + speed * 6}px rgba(109,40,217,${0.12 + speed*0.05})` : "none";

  return (
    <div
      className="glass-card card-inner card-min"
      onClick={() => navigate(`/device/${device.id}`)}
      style={{ borderRadius: 12, boxShadow: "0 8px 20px rgba(2,6,23,0.06), " + glow }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <div style={{width:64, height:64}} className="rounded-md flex items-center justify-center">
          <FanIcon size={56} speed={speed} on={isActive} />
        </div>

        <div style={{ minWidth: 0 }}>
          {/* use theme text classes so color adapts to light/darker theme */}
          <div className="text-normal" style={{fontSize: 'clamp(14px, 1.6vw, 16px)', fontWeight:700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {device.name}
          </div>
          <div className="text-muted text-sm mt-1">Speed: <span className="font-medium">{speed}</span></div>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6}}>
        <div className={isActive ? "glow-badge" : "id-badge"} style={{fontSize:12, padding:'4px 8px'}}>
          {isActive ? "Active" : "Off"}
        </div>
        <div className="id-badge" style={{fontSize:11}}>{device.id}</div>
      </div>
    </div>
  );
}
