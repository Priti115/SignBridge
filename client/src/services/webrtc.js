// WebRTC Configuration
const configuration = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

// Store peer connections per remote user
class WebRTCService {
  constructor() {
    this.peerConnections = new Map(); // key: socketId, value: RTCPeerConnection
    this.localStream = null;
    this.remoteStreams = new Map(); // key: socketId, value: MediaStream
    this.onRemoteStream = null; // Callback when remote stream arrives
    this.onIceCandidate = null; // Callback when ICE candidate is generated
  }

  // Initialize with local stream
  async initLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return this.localStream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      throw error;
    }
  }

  // Create peer connection for a specific remote user
  createPeerConnection(remoteSocketId) {
    if (this.peerConnections.has(remoteSocketId)) {
      console.log("Peer connection already exists for:", remoteSocketId);
      return this.peerConnections.get(remoteSocketId);
    }

    const peerConnection = new RTCPeerConnection(configuration);

    // Add local tracks to this peer connection
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, this.localStream);
      });
    }

    // Handle remote tracks
    peerConnection.ontrack = (event) => {
      console.log("Remote track received from:", remoteSocketId);
      
      // Create or get remote stream for this peer
      let remoteStream = this.remoteStreams.get(remoteSocketId);
      if (!remoteStream) {
        remoteStream = new MediaStream();
        this.remoteStreams.set(remoteSocketId, remoteStream);
      }
      
      // Add tracks to the remote stream
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
      
      // Notify the component about the new remote stream
      if (this.onRemoteStream) {
        this.onRemoteStream(remoteSocketId, remoteStream);
      }
    };

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.onIceCandidate) {
        this.onIceCandidate(remoteSocketId, event.candidate);
      }
    };

    // Handle connection state changes
    peerConnection.onconnectionstatechange = () => {
      console.log(
        `Connection state with ${remoteSocketId}:`,
        peerConnection.connectionState
      );
      
      if (peerConnection.connectionState === "failed") {
        console.error("Connection failed, restarting ICE");
        peerConnection.restartIce();
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      console.log(
        `ICE connection state with ${remoteSocketId}:`,
        peerConnection.iceConnectionState
      );
    };

    this.peerConnections.set(remoteSocketId, peerConnection);
    return peerConnection;
  }

  // Create offer for a specific remote user
  async createOffer(remoteSocketId) {
    const peerConnection = this.createPeerConnection(remoteSocketId);
    
    try {
      const offer = await peerConnection.createOffer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      });
      await peerConnection.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      throw error;
    }
  }

  // Handle incoming offer from remote user
  async handleOffer(remoteSocketId, offer) {
    const peerConnection = this.createPeerConnection(remoteSocketId);
    
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error("Error handling offer:", error);
      throw error;
    }
  }

  // Handle incoming answer from remote user
  async handleAnswer(remoteSocketId, answer) {
    const peerConnection = this.peerConnections.get(remoteSocketId);
    
    if (!peerConnection) {
      console.error("No peer connection found for:", remoteSocketId);
      return;
    }
    
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error("Error handling answer:", error);
      throw error;
    }
  }

  // Handle incoming ICE candidate
  async handleIceCandidate(remoteSocketId, candidate) {
    const peerConnection = this.peerConnections.get(remoteSocketId);
    
    if (!peerConnection) {
      console.error("No peer connection found for ICE candidate:", remoteSocketId);
      return;
    }
    
    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  }

  // Remove peer connection when user leaves
  removePeerConnection(remoteSocketId) {
    const peerConnection = this.peerConnections.get(remoteSocketId);
    if (peerConnection) {
      peerConnection.close();
      this.peerConnections.delete(remoteSocketId);
      this.remoteStreams.delete(remoteSocketId);
      console.log("Removed peer connection for:", remoteSocketId);
    }
  }

  // Close all peer connections
  closeAllConnections() {
    this.peerConnections.forEach((peerConnection) => {
      peerConnection.close();
    });
    this.peerConnections.clear();
    this.remoteStreams.clear();
    
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }
  }
}

export const webRTCService = new WebRTCService();