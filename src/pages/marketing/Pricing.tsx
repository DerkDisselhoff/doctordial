import React from "react";

const Pricing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-forest">Pricing</h1>
      <p className="mt-4 text-lg text-gray-700">
        Choose a plan that fits your needs.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-forest">Starter</h2>
          <p className="mt-2 text-gray-600">$19/month</p>
          <ul className="mt-4">
            <li>✔️ Basic features</li>
            <li>✔️ Email support</li>
            <li>✔️ Access to community</li>
          </ul>
          <button className="mt-4 bg-mint text-white py-2 px-4 rounded">
            Get Started
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-forest">Growth</h2>
          <p className="mt-2 text-gray-600">$49/month</p>
          <ul className="mt-4">
            <li>✔️ All Starter features</li>
            <li>✔️ Priority support</li>
            <li>✔️ Advanced analytics</li>
          </ul>
          <button className="mt-4 bg-mint text-white py-2 px-4 rounded">
            Get Started
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-forest">Enterprise</h2>
          <p className="mt-2 text-gray-600">Contact us for pricing</p>
          <ul className="mt-4">
            <li>✔️ All Growth features</li>
            <li>✔️ Dedicated account manager</li>
            <li>✔️ Custom solutions</li>
          </ul>
          <button className="mt-4 bg-mint text-white py-2 px-4 rounded">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
