
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Test = () => {
  return (
    <main className="min-h-screen bg-white space-xl">
      <Navbar />
      <Hero />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-mint-light/30 to-sage-light/20" />
        <div className="relative">
          {/* This empty div helps maintain the same spacing as on the Index page */}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Test;
