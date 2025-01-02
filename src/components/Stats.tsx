const Stats = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-4xl font-bold text-mint">50+</p>
            <p className="text-white/80">Gelijktijdig Beheerde Gesprekken</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-mint">24/7</p>
            <p className="text-white/80">Beschikbaarheid</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-mint">40%</p>
            <p className="text-white/80">Personeelstijd Bespaard</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;