import { BookDemoForm } from "./BookDemoForm";

const Mission = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent opacity-50" />
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Why DoctorDial Exists
            </h2>
            <div className="w-20 h-1 bg-mint/30 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4 p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-colors">
              <h3 className="text-xl font-semibold text-mint">The Challenge</h3>
              <p className="text-white/80 leading-relaxed">
                GP practices struggle with managing high call volumes while maintaining quality patient care. Missed calls, long wait times, and overwhelmed staff are common challenges that affect both practice efficiency and patient satisfaction.
              </p>
            </div>
            
            <div className="space-y-4 p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-colors">
              <h3 className="text-xl font-semibold text-mint">Our Solution</h3>
              <p className="text-white/80 leading-relaxed">
                We've developed an AI solution that transforms how practices handle patient communication, ensuring no call goes unanswered while maintaining the highest standards of Dutch healthcare. Our system is trained on NHG-Triage data and compliant with NVDA standards.
              </p>
            </div>
          </div>

          <div className="pt-8">
            <BookDemoForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;