import { Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-text-primary">What Our Clients Say</h2>
          <p className="text-text-secondary">Trusted by leading GP practices nationwide</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "DoctorDial transformed our practice. We can now manage patient calls efficiently without overwhelming our staff.",
              author: "Dr. Sarah Chen",
              role: "GP Practice Lead",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            },
            {
              quote: "The AI-powered call management system is incredibly accurate. It saved us countless hours of manual work.",
              author: "Dr. Michael Rodriguez",
              role: "Senior GP Partner",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            },
            {
              quote: "Outstanding patient satisfaction and excellent support throughout implementation.",
              author: "Dr. Emily Watson",
              role: "Practice Manager",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-surface-secondary p-8 rounded-xl border border-surface-input relative">
              <Quote className="text-primary w-8 h-8 mb-4" />
              <p className="text-text-primary mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-text-primary">{testimonial.author}</p>
                  <p className="text-sm text-text-secondary">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;