import React from "react";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-forest">Welcome to Our Marketing Site</h1>
      <p className="mt-4 text-lg text-gray-600">Discover our features and pricing.</p>
      <div className="mt-6">
        <a href="/features" className="px-4 py-2 text-white bg-mint rounded hover:bg-mint/80">Features</a>
        <a href="/pricing" className="ml-4 px-4 py-2 text-white bg-mint rounded hover:bg-mint/80">Pricing</a>
        <a href="/login" className="ml-4 px-4 py-2 text-white bg-mint rounded hover:bg-mint/80">Login</a>
      </div>
    </div>
  );
};

export default Index;
