import React from "react";

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h3 className="text-6xl text-gray-500 text-center">404 Not Found</h3>
        <p className="text-gray-800 text-center mt-6">
          Your page is not available
        </p>
      </div>
    </div>
  );
}
