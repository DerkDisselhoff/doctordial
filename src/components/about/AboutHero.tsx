import React from 'react';

const AboutHero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent" />
      <div className="container mx-auto text-center relative">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
          Transforming Healthcare Communication
        </h1>
        <p className="text-lg text-mint/80 mb-6 animate-fade-up">
          Founded in 2025, Amsterdam
        </p>
        <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-up">
          Empowering healthcare providers to focus on what matters most: patient care
        </p>
      </div>
    </section>
  );
};

export default AboutHero;