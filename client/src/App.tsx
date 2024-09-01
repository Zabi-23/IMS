import React from "react";
import ProductList from "./components/ProductList";

const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 via-gray-700 to-blue-500 min-h-screen">
      <h1 className="text-3xl font-bold text-center p-8 text-neutral-100">
        IMS Dashboard
      </h1>
      <main>
        <ProductList />
      </main>
    </div>
  );
};

export default App;
