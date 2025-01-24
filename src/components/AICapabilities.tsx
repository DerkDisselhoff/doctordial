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
    illustration: (
      <div className="mb-6 relative h-48">
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Central Doctor Assistant Image with Hexagonal Training Pattern */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
            <img
              src="/lovable-uploads/10ce665a-6bfe-4c46-9ac7-719b3fb123eb.png"
              alt="Dr. Sarah - AI Medical Assistant"
              className="w-full h-full object-cover rounded-full border-2 border-mint/20"
            />
            {/* Hexagonal Pattern */}
            <motion.div
              className="absolute -inset-6 border border-mint/30"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Training Data Points */}
          <div className="absolute inset-0">
            {/* NHG Data Points with Staggered Fade */}
            <motion.div
              className="absolute left-[20%] top-[20%] flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="bg-mint/5 p-2 rounded-lg">
                <div className="w-8 h-8 bg-mint/10 rounded-lg flex items-center justify-center text-mint text-xs font-medium">
                  U1
                </div>
              </div>
              <div className="h-0.5 w-12 bg-gradient-to-r from-mint/20 to-transparent ml-2" />
            </motion.div>

            <motion.div
              className="absolute right-[20%] top-[30%] flex items-center flex-row-reverse"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="bg-blue/5 p-2 rounded-lg">
                <div className="w-8 h-8 bg-blue/10 rounded-lg flex items-center justify-center text-blue-dark text-xs font-medium">
                  U2
                </div>
              </div>
              <div className="h-0.5 w-12 bg-gradient-to-l from-blue/20 to-transparent mr-2" />
            </motion.div>

            <motion.div
              className="absolute left-[25%] bottom-[25%] flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="bg-mint/5 p-2 rounded-lg">
                <div className="w-8 h-8 bg-mint/10 rounded-lg flex items-center justify-center text-mint text-xs font-medium">
                  U3
                </div>
              </div>
              <div className="h-0.5 w-12 bg-gradient-to-r from-mint/20 to-transparent ml-2" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Full Customization",
    description: "Customize forwarding rules, activation timing, voice, tone, and medical question handling to match your practice needs",
    illustration: (
      <div className="mb-6 relative h-48">
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Digital Worker Image with Settings Ring */}
          <div className="relative w-24 h-24 ml-8">
            <img
              src="/lovable-uploads/10ce665a-6bfe-4c46-9ac7-719b3fb123eb.png"
              alt="Dr. Sarah - AI Medical Assistant"
              className="w-full h-full object-cover rounded-full border-2 border-mint/20"
            />
            {/* Settings Ring Animation */}
            <motion.div
              className="absolute inset-0 border-2 border-dashed border-mint rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            {/* Outer Ring with Dots */}
            <div className="absolute -inset-2 border-2 border-mint/10 rounded-full">
              <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-mint rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-mint rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-mint rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-mint rounded-full" />
            </div>
          </div>

          {/* Customization Settings Container */}
          <div className="flex items-center gap-4">
            {/* Settings Bars Container with Fixed Width */}
            <div className="flex flex-col gap-3 min-w-[70px]">
              <motion.div 
                className="h-2 bg-mint/20 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <motion.div 
                  className="h-full bg-mint/40 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </motion.div>
              <motion.div 
                className="h-2 bg-blue/20 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <motion.div 
                  className="h-full bg-blue/40 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </motion.div>
              <motion.div 
                className="h-2 bg-mint/20 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <motion.div 
                  className="h-full bg-mint/40 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "90%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </motion.div>
              <motion.div 
                className="h-2 bg-blue/20 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <motion.div 
                  className="h-full bg-blue/40 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </motion.div>
            </div>

            {/* Settings Labels */}
            <div className="flex flex-col gap-3 text-xs text-gray-light whitespace-nowrap">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Voice Tone
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Response Time
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Medical Terms
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Empathy Level
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Human Experience",
    description: "Trained on billions of emotional and empathic interactions for natural, human-like conversations",
    illustration: (
      <div className="mb-6 relative h-48">
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Floating Badges */}
          <div className="absolute inset-0">
            {/* Emotion Badge - Bottom Left */}
            <motion.div
              className="absolute left-[5%] bottom-[15%] px-4 py-2 bg-mint-light/60 text-mint text-base font-medium rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [-10, 0, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Emotion
            </motion.div>

            {/* Understanding Badge - Top Right Area */}
            <motion.div
              className="absolute right-[15%] top-[25%] px-4 py-2 bg-blue-light/60 text-blue-dark text-base font-medium rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [-8, 2, -8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              Understanding
            </motion.div>

            {/* Empathy Badge - Top Left Area */}
            <motion.div
              className="absolute left-[15%] top-[15%] px-4 py-2 bg-mint-light/60 text-mint text-base font-medium rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              Empathy
            </motion.div>

            {/* Connection Badge - Bottom Right Area */}
            <motion.div
              className="absolute right-[8%] bottom-[25%] px-4 py-2 bg-blue-light/60 text-blue-dark text-base font-medium rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [-12, -2, -12] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              Connection
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Seamless Integration",
    description: "Easily integrates with your existing call software for smooth implementation",
    illustration: (
      <div className="mb-6 relative h-48">
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Central Doctor Assistant Image */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
            <img
              src="/lovable-uploads/10ce665a-6bfe-4c46-9ac7-719b3fb123eb.png"
              alt="Dr. Sarah - AI Medical Assistant"
              className="w-full h-full object-cover rounded-full border-2 border-mint/20"
            />
            {/* Integration Hub Pattern */}
            <motion.div
              className="absolute -inset-8 border border-mint/20 rounded-full"
              style={{
                background: "radial-gradient(circle at center, transparent 50%, rgba(16, 185, 129, 0.05) 80%)",
              }}
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Integration Points with System Names */}
          <div className="absolute inset-0">
            {/* EHR System Integration */}
            <motion.div
              className="absolute left-[15%] top-[25%]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-mint/5 p-2 rounded-lg">
                <div className="w-24 bg-mint/10 rounded-lg flex items-center justify-center py-2 px-3">
                  <span className="text-mint text-xs font-medium">EHR System</span>
                </div>
              </div>
              <motion.div
                className="absolute h-0.5 w-20 bg-gradient-to-r from-mint/20 to-transparent"
                style={{ transform: "rotate(45deg)", transformOrigin: "left center" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </motion.div>

            {/* Phone System */}
            <motion.div
              className="absolute right-[15%] top-[35%]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="bg-blue/5 p-2 rounded-lg">
                <div className="w-24 bg-blue/10 rounded-lg flex items-center justify-center py-2 px-3">
                  <span className="text-blue-dark text-xs font-medium">Phone System</span>
                </div>
              </div>
              <motion.div
                className="absolute h-0.5 w-20 bg-gradient-to-l from-blue/20 to-transparent"
                style={{ transform: "rotate(-45deg)", transformOrigin: "right center" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
            </motion.div>

            {/* Calendar Integration */}
            <motion.div
              className="absolute left-[20%] bottom-[30%]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="bg-mint/5 p-2 rounded-lg">
                <div className="w-24 bg-mint/10 rounded-lg flex items-center justify-center py-2 px-3">
                  <span className="text-mint text-xs font-medium">Calendar</span>
                </div>
              </div>
              <motion.div
                className="absolute h-0.5 w-20 bg-gradient-to-r from-mint/20 to-transparent"
                style={{ transform: "rotate(-45deg)", transformOrigin: "left center" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
            </motion.div>

            {/* Data Flow Indicators */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-mint/10 rounded-full" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-blue/10 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Continuous Learning",
    description: "Improves through direct feedback on triage outcomes from medical professionals",
    illustration: (
      <div className="mb-6 relative h-48">
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Central Doctor Assistant Image with Neural Network Pattern */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
            <img
              src="/lovable-uploads/10ce665a-6bfe-4c46-9ac7-719b3fb123eb.png"
              alt="Dr. Sarah - AI Medical Assistant"
              className="w-full h-full object-cover rounded-full border-2 border-mint/20"
            />
            {/* Neural Network Pattern */}
            <motion.div
              className="absolute -inset-8 border border-mint/20"
              style={{
                background: "radial-gradient(circle at center, transparent 50%, rgba(16, 185, 129, 0.05) 80%)",
              }}
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(16, 185, 129, 0.2)",
                  "0 0 0 10px rgba(16, 185, 129, 0)",
                  "0 0 0 0 rgba(16, 185, 129, 0.2)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Learning Feedback Points */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute left-[20%] top-[30%]"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
            >
              <div className="bg-mint/10 p-1.5 rounded-full">
                <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center text-mint text-xs font-medium">
                  +1
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute right-[25%] top-[40%]"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 1 }}
            >
              <div className="bg-blue/10 p-1.5 rounded-full">
                <div className="w-6 h-6 bg-blue/20 rounded-full flex items-center justify-center text-blue-dark text-xs font-medium">
                  +1
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute left-[30%] bottom-[35%]"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 2, delay: 2.2, repeat: Infinity, repeatDelay: 1 }}
            >
              <div className="bg-mint/10 p-1.5 rounded-full">
                <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center text-mint text-xs font-medium">
                  +1
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
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
                            {capability.illustration}
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
