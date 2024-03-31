
// app/page.js
"use client";
import ChatPopup from "../components/ChatPopup";
export default function Component() {

  return (
    <div className="h-screen w-screen">
      <div className="w-1/6">
      <ChatPopup/>
      </div>
    </div>
  );
}
