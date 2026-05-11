import { useEffect, useRef } from "react";

export default function VideoCard({ stream, isMuted }) {

  const videoRef = useRef();

  useEffect(() => {

    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }

  }, [stream]);

  return (
    <div className="relative bg-zinc-900 rounded-3xl overflow-hidden aspect-video">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMuted}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded-full text-white text-sm">

        {isMuted ? "You" : "Participant"}

      </div>

    </div>
  );
}