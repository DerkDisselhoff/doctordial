const Pricing2 = () => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side content */}
      <div className="hidden lg:flex lg:w-[60%] p-12 flex-col">
        <div className="mb-12">
          <img src="/lovable-uploads/cb3c4bbf-4e87-44de-856b-59e135958c65.png" alt="DoctorDial Logo" className="w-24" />
          <div className="mt-8">
            <h1 className="text-4xl font-bold text-[#1a1f2c] mb-4">Get a custom quote</h1>
            <p className="text-gray-600 max-w-xl">
              DoctorDial's pricing model depends on a few factors specific to your practice, so we'll need to get in touch to give you accurate pricing information.
            </p>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-[40%] bg-[#F8FAFF] min-h-screen">
        <div className="max-w-xl mx-auto p-8">
          <MultiStepPricingForm />
        </div>
      </div>
    </div>
  );
};

export default Pricing2;