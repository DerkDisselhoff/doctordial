import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Calendar, Brain, Stethoscope, Clock, Hospital } from "lucide-react";
import { cn } from "@/lib/utils";

const ProcessNode = ({ 
  icon: Icon, 
  label, 
  className 
}: { 
  icon: any; 
  label: string; 
  className?: string;
}) => (
  <div className={cn("process-node", className)}>
    <Icon className="w-6 h-6" />
    <span className="text-sm font-medium mt-2">{label}</span>
  </div>
);

const ProcessArrow = ({ 
  label, 
  className 
}: { 
  label?: string;
  className?: string;
}) => (
  <div className={cn("process-arrow", className)}>
    {label && <span className="process-arrow-label">{label}</span>}
  </div>
);

const ProcessOverview = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            {t("process.title")}
          </h2>
          <p className="max-w-[700px] text-mint/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("process.subtitle")}
          </p>
        </div>
        
        <div className="mt-16 relative w-full min-h-[500px] border border-mint/20 rounded-xl bg-forest-light/5 p-8">
          <div className="process-grid">
            {/* First Row */}
            <div className="process-row">
              <ProcessNode 
                icon={Phone} 
                label="Incoming Patient Call" 
                className="incoming"
              />
              <ProcessArrow />
              <ProcessNode 
                icon={Brain} 
                label="AI Agent DoctorDial" 
                className="assistant"
              />
              <ProcessArrow />
              <ProcessNode 
                icon={Hospital} 
                label="Triage" 
                className="triage"
              />
            </div>

            {/* Second Row - Branching */}
            <div className="process-branches">
              {/* U1/U2 Branch */}
              <div className="process-branch">
                <ProcessArrow label="U1/U2" className="urgent" />
                <ProcessNode 
                  icon={Stethoscope} 
                  label="Doctor's Assistant" 
                  className="assistant"
                />
              </div>

              {/* U3/U4 Branch */}
              <div className="process-branch">
                <ProcessArrow label="U3/U4" className="normal" />
                <ProcessNode 
                  icon={Calendar} 
                  label="Appointment Scheduler" 
                  className="scheduler"
                />
                <ProcessArrow />
                <ProcessNode 
                  icon={Brain} 
                  label="HIS System" 
                  className="his"
                />
              </div>

              {/* U5 Branch */}
              <div className="process-branch">
                <ProcessArrow label="U5" className="low" />
                <ProcessNode 
                  icon={Clock} 
                  label="Advise to call back later" 
                  className="callback"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;