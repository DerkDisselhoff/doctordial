
import React from 'react';
import { Stethoscope } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const VisionSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6 bg-white rounded-2xl p-8 shadow-sm border border-gray-muted hover:shadow-md transition-all">
      <div className="flex items-center gap-3 text-mint mb-4">
        <Stethoscope className="w-6 h-6" />
        <h3 className="text-2xl font-semibold text-gray-dark">{t('about.vision.title')}</h3>
      </div>
      <p className="text-gray leading-relaxed">
        {t('about.vision.text1')}
      </p>
      <p className="text-gray leading-relaxed">
        {t('about.vision.text2')}
      </p>
      <p className="text-gray leading-relaxed">
        {t('about.vision.text3')}
      </p>
    </div>
  );
};

export default VisionSection;
