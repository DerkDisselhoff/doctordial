import { BookDemoForm } from "./BookDemoForm";

const Mission = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">Why DoctorDial Exists</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            We believe every GP practice deserves efficient, intelligent call management. Our AI solution transforms how practices handle patient communication, ensuring no call goes unanswered while maintaining the highest standards of Dutch healthcare.
          </p>
          <div className="flex justify-center">
            <BookDemoForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;