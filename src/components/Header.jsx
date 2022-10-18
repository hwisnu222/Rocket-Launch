import React from "react";

export default function Header() {
  return (
    <div className="px-4 py-4 shadow-sm mb-6 flex justify-between items-center">
      <h4 className="font-bold text-3xl text-green-600">
        R <span className="text-gray-400">Schedule</span>
      </h4>
      <span className="text-gray-400 hover:text-green-600">Github</span>
    </div>
  );
}
