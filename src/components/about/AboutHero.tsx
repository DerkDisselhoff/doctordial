
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutHero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mint-light to-white opacity-50" />
      <div className="container mx-auto text-center relative">
        <span className="inline-block px-4 py-2 rounded-full bg-mint-light text-mint-dark mb-6 animate-fade-up">
          {t('about.location')}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-dark mb-6 animate-fade-up">
          {t('about.title')}
          <br className="hidden md:block" /> {t('about.subtitle')}
        </h1>
        <p className="text-xl text-gray max-w-2xl mx-auto animate-fade-up">
          {t('about.description')}
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
