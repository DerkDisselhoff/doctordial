import React from "react";

const Mission = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent opacity-50" />
      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Why DoctorDial Exists
          </h2>
          <p className="text-lg text-white/80 leading-relaxed">
            We exist to remove the administrative burden from General Practitioners, allowing healthcare providers to focus on what truly matters - their patients. In an era where GP practices face an increasing volume of calls, we understand the critical role of the GP as a social instrument in healthcare.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            Our mission is to ensure that the right patients receive the right treatment at the right time. We recognize that GPs cannot handle the growing volume of calls alone, which is why DoctorDial serves as an essential tool to help them maintain their focus on providing quality care while we manage the communication flow efficiently.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;