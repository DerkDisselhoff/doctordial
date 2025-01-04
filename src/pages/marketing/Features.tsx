import React from 'react';

const Features = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-forest">Features</h1>
      <p className="mt-4 text-lg text-gray-700">
        Discover the amazing features we offer to help you manage your calls and clients effectively.
      </p>
      <ul className="mt-6 space-y-4">
        <li className="flex items-start">
          <span className="text-mint mr-2">✔️</span>
          <span className="text-gray-800">Real-time call analytics</span>
        </li>
        <li className="flex items-start">
          <span className="text-mint mr-2">✔️</span>
          <span className="text-gray-800">Client management tools</span>
        </li>
        <li className="flex items-start">
          <span className="text-mint mr-2">✔️</span>
          <span className="text-gray-800">Customizable dashboards</span>
        </li>
        <li className="flex items-start">
          <span className="text-mint mr-2">✔️</span>
          <span className="text-gray-800">Secure authentication</span>
        </li>
      </ul>
    </div>
  );
};

export default Features;
