import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import DeviceCard from "../components/DeviceCard";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listDevices().then((d) => {
      setDevices(d);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading devices…</p>;
  if (!devices.length) return <p>No devices found.</p>;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {devices.map((d) => (
        <DeviceCard key={d.id} device={d} />
      ))}
    </div>
  );
}
