import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import JoinRoom from "../pages/JoinRoom";
import MeetingRoom from "../pages/MeetingRoom";

export default function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/join" element={<JoinRoom />} />

        <Route path="/meeting/:roomId" element={<MeetingRoom />} />

      </Routes>

    </BrowserRouter>
  );
}