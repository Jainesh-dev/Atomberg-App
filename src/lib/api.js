
const mockDevices = [
  { id: "fan-1", name: "Living Room Fan", speed: 2, on: true },
  { id: "fan-2", name: "Bedroom Fan", speed: 0, on: false },
  { id: "fan-3", name: "Kitchen Fan", speed: 1, on: true }
];

function delay(ms = 250) {
  return new Promise((r) => setTimeout(r, ms));
}

export const api = {
  async listDevices() {
    await delay(220);
    return mockDevices.map((d) => ({ ...d }));
  },

  async getDevice(id) {
    await delay(160);
    const d = mockDevices.find((x) => x.id === id);
    return d ? { ...d } : null;
  },

  async updateDevice(id, patch) {
    await delay(280);
    const idx = mockDevices.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error("Device not found");

    // Apply patch to a copy
    const newObj = { ...mockDevices[idx], ...patch };

    // Server-side rules:
    // - If speed explicitly set to 0 -> force on=false
    if (patch.hasOwnProperty("speed") && Number(newObj.speed) === 0) {
      newObj.on = false;
    }

    // - If turning on but speed is 0 -> bump speed to 1 (so it's actually spinning)
    if (patch.hasOwnProperty("on") && newObj.on === true && Number(newObj.speed) === 0) {
      newObj.speed = 1;
    }

    // Persist
    mockDevices[idx] = { ...newObj };
    return { ...mockDevices[idx] };
  }
};
