import React from "react";

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div className="w-36 h-36 border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

export default Loader;
