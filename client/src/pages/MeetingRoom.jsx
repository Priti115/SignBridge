import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from "../services/socket";

import {
  createPeerConnection,
} from "../services/webrtc";

import VideoCard from "../components/meeting/VideoCard";

export default function MeetingRoom() {

  const { roomId } = useParams();

  // =========================
  // STATES
  // =========================

  const [users, setUsers] = useState([]);

  const [localStream, setLocalStream] =
    useState(null);

  const [remoteStreams, setRemoteStreams] =
    useState([]);

  const [peerConnection, setPeerConnection] =
    useState(null);

  // =========================
  // GET USER MEDIA
  // =========================
  useEffect(() => {

    const getMedia = async () => {

      try {

        // Get webcam + mic
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

        // Save local stream
        setLocalStream(stream);

        // Create peer connection
        const pc = createPeerConnection();

        // Add local tracks to peer connection
        stream.getTracks().forEach((track) => {

          pc.addTrack(track, stream);

        });

        // Receive remote stream
        pc.ontrack = (event) => {

          const remoteStream =
            event.streams[0];

          setRemoteStreams((prev) => {

            const exists = prev.find(
              (stream) =>
                stream.id === remoteStream.id
            );

            if (exists) return prev;

            return [...prev, remoteStream];

          });

        };

        setPeerConnection(pc);

        // =========================
        // CREATE OFFER
        // =========================

        const offer = await pc.createOffer();

        await pc.setLocalDescription(offer);

        socket.emit("offer", {
          offer,
          roomId,
        });

      } catch (error) {

        console.error(
          "Error accessing media devices:",
          error
        );

      }

    };

    getMedia();

  }, []);

  // =========================
  // SOCKET ROOM
  // =========================
 useEffect(() => {

  socket.emit("join-room", roomId);

  // =========================
  // ROOM USERS
  // =========================
  socket.on("room-users", (roomUsers) => {

    setUsers(roomUsers);

  });

  // =========================
  // RECEIVE OFFER
  // =========================
  socket.on("offer", async ({ offer }) => {

    if (!peerConnection) return;

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    // Create answer
    const answer =
      await peerConnection.createAnswer();

    await peerConnection.setLocalDescription(
      answer
    );

    socket.emit("answer", {
      answer,
      roomId,
    });

  });

  // =========================
  // RECEIVE ANSWER
  // =========================
  socket.on("answer", async ({ answer }) => {

    if (!peerConnection) return;

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );

  });

  return () => {

    socket.emit("leave-room", roomId);

    socket.off("room-users");
    socket.off("offer");
    socket.off("answer");

  };

}, [roomId, peerConnection]);

  return (
    <div className="min-h-screen bg-zinc-100 p-6 md:p-10">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl md:text-5xl font-bold mb-2">

          Meeting Room

        </h1>

        <p className="text-zinc-600 text-lg">

          Room ID: {roomId}

        </p>

      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Local Video */}
        {localStream && (
          <VideoCard
            stream={localStream}
            isMuted={true}
          />
        )}

        {/* Remote Videos */}
        {remoteStreams.map((stream) => (

          <VideoCard
            key={stream.id}
            stream={stream}
            isMuted={false}
          />

        ))}

      </div>

      {/* Participants */}
      <div className="mt-10 bg-white rounded-3xl p-8 max-w-2xl">

        <h2 className="text-3xl font-bold mb-6">

          Participants ({users.length})

        </h2>

        <div className="space-y-4">

          {users.map((userId) => (

            <div
              key={userId}
              className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50"
            >

              {userId}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}