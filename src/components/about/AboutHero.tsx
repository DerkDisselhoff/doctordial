import React from 'react';

const AboutHero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-light to-white" />
      <div className="container mx-auto text-center relative">
        <span className="inline-block px-4 py-2 rounded-full bg-mint-light text-mint-dark mb-6 animate-fade-up">
          Founded in 2025, Amsterdam
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-dark mb-6 animate-fade-up">
          The next era of Healthcare,
          <br className="hidden md:block" /> driven by AI
        </h1>
        <p className="text-xl text-gray max-w-2xl mx-auto animate-fade-up">
          Empowering healthcare providers to focus on what matters most: patient care
        </p>
      </div>
    </section>
  );
};

export default AboutHero;