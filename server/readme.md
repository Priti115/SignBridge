# 🌉 SignBridge Backend

Backend server for the SignBridge accessibility communication platform.

Built using:

- Node.js
- Express.js
- Socket.IO
- CORS

---

# 🚀 Purpose

The backend handles:

- Real-time communication
- Room management
- Socket synchronization
- Participant tracking
- WebRTC signaling (upcoming)

---

# 📁 Backend Folder Structure

server/

├── socket/
│   └── socketHandler.js
│
├── utils/
│
├── server.js
└── package.json

---

# 📂 Folder Explanation

## socket/

Contains Socket.IO event handlers.

### socketHandler.js

Handles:
- user connections
- room joining
- room leaving
- participant synchronization

---

## utils/

Helper functions and utilities.

(Currently empty — used later)

---

## server.js

Main backend entry point.

Responsibilities:
- Express server setup
- Socket.IO initialization
- CORS configuration
- Server startup

---

# 🎯 Current Features

✅ Express backend server  
✅ Socket.IO real-time connection  
✅ Room-based communication  
✅ Participant synchronization  
✅ Join/Leave handling  

---

# 🚀 Upcoming Features

- WebRTC signaling
- Chat system
- Captions broadcasting
- Meeting transcripts
- AI translation events
- Authentication
- MongoDB integration

---

# ⚙️ Installation

```bash
npm install
```

---

# ▶️ Run Backend

```bash
npm start
```

Backend runs on:

http://localhost:5000

---

# 🌉 Real-Time Architecture

Frontend ↔ Socket.IO ↔ Backend

The backend manages:
- room synchronization
- live participant updates
- signaling events

for real-time communication systems.

---

# 🌉 Project Vision

SignBridge aims to create an accessible communication platform where:

- sign-language users
- speech users

can communicate seamlessly in real time.
