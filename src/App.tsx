import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SongDetail from "./pages/SongDetail"; // song detail page
import FooterNav from "./components/FooterNav";

export default function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen pb-20">
        {/* Routes for pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>

        {/* Footer Navigation */}
        <FooterNav  />
      </div>
    </BrowserRouter>
  );
}
