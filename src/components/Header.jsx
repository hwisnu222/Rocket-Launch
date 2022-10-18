import React from "react";

export default function Header() {
  const redirectUrl = (url) => {
    window.location.href = url;
  };
  return (
    <div className="px-6 py-4 shadow-md mb-6 flex justify-between items-center">
      <h4 className="font-bold text-3xl text-green-600">
        R <span className="text-gray-400">Schedule</span>
      </h4>
      <span
        className="text-gray-400 hover:text-green-600"
        onClick={() =>
          redirectUrl("https://github.com/hwisnu222/Rocket-Launch")
        }
      >
        Github
      </span>
    </div>
  );
}
