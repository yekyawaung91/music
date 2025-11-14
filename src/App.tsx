import { useState } from "react";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import FooterNav from "./components/FooterNav";

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="min-h-screen pb-20">
      {activeTab === "Home" && <Home />}
      {activeTab === "Explore" && <Explore />}

      {/* FIX HERE */}
      <FooterNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

