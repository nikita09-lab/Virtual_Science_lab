import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="p-8 space-y-6 animate-pulse">
      {/* Title placeholder */}
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>

      {/* Content block placeholders */}
      <div className="space-y-4">
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-64 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
