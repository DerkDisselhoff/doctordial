import { BookDemoForm } from "@/components/BookDemoForm";

const FeaturesHero = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-dark mb-6">
          AI-Powered Features That Transform Your Practice
        </h1>
        <p className="text-xl text-gray max-w-2xl mx-auto mb-8">
          Experience the future of patient communication with our comprehensive solution
        </p>
        <BookDemoForm />
      </div>
    </section>
  );
};

export default FeaturesHero;