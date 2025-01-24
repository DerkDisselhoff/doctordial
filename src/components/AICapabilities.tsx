import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Medical Intelligence",
    description: "Trained on NHG triage standards and medical datasets for accurate patient assessment",
    bgImage: "/lovable-uploads/a53de0d0-4b12-4213-ab96-e580a04350ba.png",
  },
  {
    title: "Full Customization",
    description: "Customize forwarding rules, activation timing, voice, tone, and medical question handling to match your practice needs",
  },
  {
    title: "Human Experience",
    description: "Trained on billions of emotional and empathic interactions for natural, human-like conversations",
  },
  {
    title: "Seamless Integration",
    description: "Easily integrates with your existing call software for smooth implementation",
  },
  {
    title: "Continuous Learning",
    description: "Improves through direct feedback on triage outcomes from medical professionals",
  },
];

const AICapabilities = () => {
  return (
    <section className="w-full bg-gradient-to-b from-mint-light/40 to-blue-light/50 overflow-hidden">
      <div className="container mx-auto py-16 md:py-24 px-4">
        <div className="relative">
          {/* Background with enhanced gradient and overlay */}
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-10 left-10 w-32 h-32 bg-mint/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue/20 rounded-full blur-3xl" />
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
              <motion.path
                d="M100,100 C150,150 250,150 300,100"
                stroke="rgba(16, 185, 129, 0.1)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.path
                d="M300,200 C250,250 150,250 100,200"
                stroke="rgba(37, 99, 235, 0.1)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </svg>
          </motion.div>

          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Digital Workers, Ready to Deploy
            </motion.h2>
            <motion.p 
              className="text-gray max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover how our plug-and-play digital workers seamlessly integrate with your practice
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative px-8"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {capabilities.map((capability, index) => {
                  return (
                    <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="group h-full">
                        <div className="relative h-full p-6 bg-white rounded-xl border border-gray-muted shadow-sm transition-all duration-300 hover:shadow-xl hover:border-mint/20">
                          {/* Connection dots */}
                          <div className="absolute -left-2 top-1/2 w-4 h-4 bg-mint/10 rounded-full" />
                          <div className="absolute -right-2 top-1/2 w-4 h-4 bg-blue/10 rounded-full" />
                          
                          {/* Enhanced content */}
                          <div className="relative z-10">
                            <h3 className="text-xl font-semibold mb-3 text-gray-dark group-hover:text-mint transition-colors">
                              {capability.title}
                            </h3>
                            <p className="text-gray">
                              {capability.description}
                            </p>
                          </div>

                          {/* Decorative background pattern */}
                          <div className="absolute inset-0 opacity-5 pointer-events-none">
                            <div className="absolute right-0 bottom-0 w-20 h-20 bg-gradient-to-br from-mint/10 to-blue/10 rounded-tl-3xl" />
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AICapabilities;