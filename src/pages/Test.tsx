
import React from 'react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

const Test = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
            Test Page
          </h1>
          <p className="text-lg text-gray mb-8">
            This is a test page to demonstrate navigation and routing.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-dark mb-4">
              Test Content
            </h2>
            <p className="text-gray-600">
              You can add any test content or components to this page as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
