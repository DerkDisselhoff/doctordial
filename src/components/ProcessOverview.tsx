import React from 'react';
import { Phone, Users, GitMerge, Activity, Calendar, BarChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProcessOverview = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Phone,
      title: t('process.incomingCalls.title'),
      description: t('process.incomingCalls.description'),
    },
    {
      icon: Users,
      title: t('process.flexibility.title'),
      description: t('process.flexibility.description'),
    },
    {
      icon: GitMerge,
      title: t('process.entryPoints.title'),
      description: t('process.entryPoints.description'),
    },
    {
      icon: Activity,
      title: t('process.urgency.title'),
      description: t('process.urgency.description'),
    },
    {
      icon: BarChart,
      title: t('process.overview.title'),
      description: t('process.overview.description'),
    },
    {
      icon: Calendar,
      title: t('process.planning.title'),
      description: t('process.planning.description'),
    },
  ];

  return (
    <section className="py-24 bg-forest-light/5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          {t('process.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group p-6 rounded-xl bg-forest-light/10 backdrop-blur-sm 
                         border border-mint/10 hover:border-mint/20 transition-all duration-300
                         animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-mint/10 text-mint">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-white/70">{step.description}</p>
              <div className="absolute inset-0 bg-gradient-to-r from-mint/0 via-mint/5 to-mint/0 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                            rounded-xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;