const users = {};

function socketHandler(io) {

  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    // =========================
    // JOIN ROOM
    // =========================
    socket.on("join-room", (roomId) => {

      socket.roomId = roomId;

      socket.join(roomId);

      if (!users[roomId]) {
        users[roomId] = [];
      }

      if (!users[roomId].includes(socket.id)) {
        users[roomId].push(socket.id);
      }

      console.log(
        `User ${socket.id} joined room ${roomId}`
      );

      io.to(roomId).emit(
        "room-users",
        users[roomId]
      );

    });

    // =========================
    // LEAVE ROOM
    // =========================
    socket.on("leave-room", (roomId) => {

      if (users[roomId]) {

        users[roomId] = users[roomId].filter(
          (id) => id !== socket.id
        );

        if (users[roomId].length === 0) {
          delete users[roomId];
        }

        io.to(roomId).emit(
          "room-users",
          users[roomId] || []
        );

        console.log(
          `User ${socket.id} left room ${roomId}`
        );

      }

    });

    // =========================
    // WEBRTC SIGNALING
    // =========================

    // OFFER
    socket.on("offer", ({ offer, roomId }) => {

      socket.to(roomId).emit("offer", {
        offer,
        senderId: socket.id,
      });

    });

    // ANSWER
    socket.on("answer", ({ answer, roomId }) => {

      socket.to(roomId).emit("answer", {
        answer,
        senderId: socket.id,
      });

    });

    // ICE CANDIDATE
    socket.on(
      "ice-candidate",
      ({ candidate, roomId }) => {

        socket.to(roomId).emit(
          "ice-candidate",
          {
            candidate,
            senderId: socket.id,
          }
        );

      }
    );

    // =========================
    // DISCONNECT
    // =========================
    socket.on("disconnect", () => {

      const roomId = socket.roomId;

      if (roomId && users[roomId]) {

        users[roomId] = users[roomId].filter(
          (id) => id !== socket.id
        );

        if (users[roomId].length === 0) {
          delete users[roomId];
        }

        io.to(roomId).emit(
          "room-users",
          users[roomId] || []
        );

      }

      console.log(
        "User Disconnected:",
        socket.id
      );

    });

  });

}

module.exports = socketHandler;