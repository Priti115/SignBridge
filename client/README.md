# 🌉 SignBridge Frontend

Frontend for the SignBridge accessibility communication platform.

Built using:

- React
- Vite
- Tailwind CSS
- React Router
- Socket.IO Client
- WebRTC (upcoming)

---

# 🚀 Purpose

The frontend handles:

- User Interface
- Meeting pages
- Room joining
- Real-time participant updates
- Video rendering
- Captions display
- Accessibility controls

---

# 📁 Frontend Folder Structure

src/

├── assets/
│   └── logo.png
│
├── components/
│   ├── meeting/
│   │   └── VideoCard.jsx
│   │
│   └── ui/
│
├── pages/
│   ├── Home.jsx
│   ├── JoinRoom.jsx
│   └── MeetingRoom.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── services/
│   └── socket.js
│
├── App.jsx
├── main.jsx
└── index.css

---

# 📂 Folder Explanation

## assets/

Stores:
- images
- logos
- icons
- static files

---

## components/

Reusable UI and meeting components.

### meeting/

Contains:
- video components
- captions
- participant UI
- controls

### ui/

Reusable global UI:
- buttons
- cards
- inputs
- modals

---

## pages/

Application pages.

### Home.jsx
Landing page

### JoinRoom.jsx
Join meeting UI

### MeetingRoom.jsx
Main video meeting interface

---

## routes/

Handles React Router configuration.

---

## services/

Contains external services.

### socket.js

Socket.IO frontend connection.

---

# 🎯 Current Features

✅ Responsive UI  
✅ Real-time room joining  
✅ Participant synchronization  
✅ Webcam access  
✅ Local video stream  

---

# 🚀 Upcoming Features

- Remote video calling
- WebRTC peer connections
- Live captions
- Speech-to-text
- AI sign recognition
- Gesture translation
- Accessibility controls

---

# ⚙️ Installation

```bash
npm install
```

---

# ▶️ Run Frontend

```bash
npm run dev
```

Frontend runs on:

http://localhost:5173

---

# 🌉 Project Vision

SignBridge aims to bridge communication between:

- Deaf/sign-language users
- Speech/text users

through AI-powered real-time communication tools.


# hello
