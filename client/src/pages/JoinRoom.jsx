import { useState } from "react";
import { useNavigate } from "react-router-dom";

import socket from "../services/socket";

export default function JoinRoom() {

  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const handleJoinRoom = () => {

    if (!roomId) return;


    navigate(`/meeting/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">

      <div className="w-full max-w-md border border-zinc-200 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-zinc-900 mb-3">
          Join Meeting
        </h1>

        <p className="text-zinc-500 mb-8">
          Enter your room ID to continue
        </p>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full px-5 py-4 rounded-2xl border border-zinc-300 outline-none focus:border-cyan-400"
        />

        <button
          onClick={handleJoinRoom}
          className="gradient-button w-full py-4 font-semibold mt-6"
        >

          Join Room

        </button>

      </div>
    </div>
  );
}