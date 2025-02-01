
import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ChallengeSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6 bg-white rounded-2xl p-8 shadow-sm border border-gray-muted hover:shadow-md transition-all">
      <div className="flex items-center gap-3 text-mint mb-4">
        <Heart className="w-6 h-6" />
        <h3 className="text-2xl font-semibold text-gray-dark">{t('about.challenge.title')}</h3>
      </div>
      <p className="text-gray leading-relaxed">
        {t('about.challenge.text1')}
      </p>
      <p className="text-gray leading-relaxed">
        {t('about.challenge.text2')}
      </p>
      <p className="text-gray leading-relaxed">
        {t('about.challenge.text3')}
      </p>
    </div>
  );
};

export default ChallengeSection;
