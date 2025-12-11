# 📱 Atomberg Smart Fan Control App (Assignment)

A modern, mobile-first React application that simulates a **smart fan control system**, built as part of the **Atomberg App Development Internship Assignment**.

The app provides:

* Device listings (Hall, Kitchen, Bedroom, etc.)
* Individual device control screen
* Fan on/off control
* Speed slider (0–3)
* Auto-behavior (speed 0 → fan off, turning on with speed = 1, etc.)
* Animated fan icon with speed-based rotation
* Clean Atomberg-inspired UI with engraved logo, glassmorphism, and smooth transitions

---

# 🚀 Features

### ✔ **Home Screen – Device List**

* Displays all fans with:

  * Name (Hall / Kitchen / etc.)
  * Current speed
  * On/Off status
  * Dynamic badges
* Glassmorphic cards with subtle animations
* Fan icon spins according to speed

### ✔ **Device Detail Screen**

* Large center fan with real rotation animation
* Toggle power button with neon gradient
* Speed slider (0–3)
* Auto behavior:

  * Speed = 0 → fan automatically turns off
  * Fan turned ON → speed resets to 1 if previously 0
* Telemetry (battery, last checked, quick actions)

### ✔ **Beautiful UI / UX**

* Light, premium theme (Atomberg style)
* Engraved Atomberg watermark in the background
* Responsive mobile-first layout
* Smooth transitions + motion reduction for accessibility
* Looks like a real smart-home app, not a website

---

# 🛠 Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Frontend         | React (Vite)                        |
| Styling          | TailwindCSS + custom CSS            |
| Icons            | Custom SVG-based animated fan       |
| State Management | React hooks                         |
| Mock API         | Local JSON-based service (`api.js`) |

---

# 📂 Project Structure

```
src/
├── components/
│   ├── DeviceCard.jsx          # Device tile component
│   └── FanIcon.jsx             # SVG animated fan component
│
├── pages/
│   ├── Home.jsx                # Device list
│   └── DeviceDetail.jsx        # Fan control page
│
├── lib/
│   └── api.js                  # Mock API service (get/update devices)
│
├── assets/
│   └── atomberg-logo.svg       # Background watermark
│
├── index.css                   # Tailwind + custom theme
├── App.jsx                     # Routes + layout
└── main.jsx                    # Entry point
```

---

# ▶️ Getting Started

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start the development server

```
npm run dev
```

### 3️⃣ Open in browser

```
http://localhost:5173
```

---

# 📡 Mock API

The project uses a simple mock API (`api.js`) that simulates real backend calls:

### `getDevices()`

Fetches all devices.

### `getDevice(id)`

Fetches a single device by ID.

### `updateDevice(id, patch)`

Applies updates to:

* `on`
* `speed`

Auto rules:

* If speed becomes `0` → auto turn off
* If turning fan ON and speed was 0 → set speed to 1

---

# 🎨 UI/UX Highlights

### ⭐ Engraved Atomberg Logo

Rendered using `mix-blend-mode: multiply` for a subtle etched effect on a light background.

### ⭐ Animated Fan Icon

* Pure SVG
* Speed-based rotation
* Drop shadow glow when active

### ⭐ Glassmorphic Cards

* Soft white translucency
* Rounded corners
* Elevated hover effect

### ⭐ Mobile-First Design

* Looks like a real native app
* Responsive media queries
* Safe-area insets for iPhone

---

# 🔧 Future Enhancements (Optional)

* Device rename
* Multi-room layout
* Schedule automation
* Reverse rotation
* Real backend integration

---

# 📸 Screenshots (optional for submission)

<img width="266" height="589" alt="Screenshot 2025-12-12 020605" src="https://github.com/user-attachments/assets/307d9645-7420-44cb-9966-1599d615da24" />

---

