import { BookDemoForm } from "@/components/BookDemoForm";

const FeaturesCTA = () => {
  return (
    <section className="py-20 px-4 bg-forest-light">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Practice?
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Join the growing number of practices that trust DoctorDial to handle their patient communications
        </p>
        <BookDemoForm />
      </div>
    </section>
  );
};

export default FeaturesCTA;