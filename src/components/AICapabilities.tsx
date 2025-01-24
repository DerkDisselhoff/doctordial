import { Brain, Settings, Heart, Link, GraduationCap } from "lucide-react";
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
    illustration: (
      <div className="mt-6 relative h-24">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-32 h-32 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 200 80"
              className="w-full h-full text-mint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.path 
                d="M37.5 20h15v40h-15zm30 0h15v40h-15zm30 0h15v40h-15zM20 20h10v40H20zm100 0h-10v40h10zm20 0h10v40h-10z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.text 
                x="100" 
                y="70" 
                textAnchor="middle" 
                fontFamily="Arial" 
                fontSize="14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                NHG
              </motion.text>
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    )
  },
  {
    icon: Settings,
    title: "Full Customization",
    description: "Customize forwarding rules, activation timing, voice, tone, and medical question handling to match your practice needs",
    animation: {
      variants: {
        hidden: { rotate: 0 },
        visible: { 
          rotate: 360,
          transition: {
            duration: 4,
            ease: "linear",
            repeat: Infinity
          }
        }
      }
    },
    illustration: (
      <div className="mt-6 relative h-24">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Workflow Diagram */}
          <div className="flex items-center justify-between w-full px-4">
            <motion.div 
              className="w-12 h-12 rounded-lg bg-mint/20 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-xs text-mint">Rules</span>
            </motion.div>
            <motion.div 
              className="h-1 w-8 bg-blue/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.div 
              className="w-12 h-12 rounded-lg bg-blue/20 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-xs text-blue-dark">Voice</span>
            </motion.div>
            <motion.div 
              className="h-1 w-8 bg-blue/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.div 
              className="w-12 h-12 rounded-lg bg-mint/20 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-xs text-mint">Time</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    icon: Heart,
    title: "Human Experience",
    description: "Trained on billions of emotional and empathic interactions for natural, human-like conversations",
    animation: {
      variants: {
        hidden: { scale: 1 },
        visible: { 
          scale: 1.2,
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse" as const
          }
        }
      }
    },
    illustration: (
      <div className="mt-6 relative h-24">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Conversation Flow */}
          <div className="relative w-full">
            <motion.div 
              className="absolute left-4 top-0 px-3 py-1 rounded-full bg-mint/20 text-xs text-mint"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Hello!
            </motion.div>
            <motion.div 
              className="absolute right-4 top-8 px-3 py-1 rounded-full bg-blue/20 text-xs text-blue-dark"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              How can I help?
            </motion.div>
            <motion.div 
              className="absolute left-4 bottom-0 px-3 py-1 rounded-full bg-mint/20 text-xs text-mint"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Thank you!
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    icon: Link,
    title: "Seamless Integration",
    description: "Easily integrates with your existing call software for smooth implementation",
    animation: {
      variants: {
        hidden: { x: -20, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: "mirror" as const,
            repeatDelay: 1
          }
        }
      }
    },
    illustration: (
      <div className="mt-6 relative h-24">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Integration Diagram */}
          <div className="relative w-full flex items-center justify-center">
            <motion.div 
              className="absolute w-16 h-16 rounded-full border-2 border-mint/30"
              animate={{
                scale: [1, 1.1, 1],
                borderColor: ["rgba(16, 185, 129, 0.3)", "rgba(37, 99, 235, 0.3)", "rgba(16, 185, 129, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute w-24 h-24 rounded-full border-2 border-blue/30"
              animate={{
                scale: [1.1, 1, 1.1],
                borderColor: ["rgba(37, 99, 235, 0.3)", "rgba(16, 185, 129, 0.3)", "rgba(37, 99, 235, 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-mint to-blue-dark rounded-lg"
              animate={{
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    )
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "Improves through direct feedback on triage outcomes from medical professionals",
    animation: {
      variants: {
        hidden: { y: 0 },
        visible: {
          y: -10,
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse" as const
          }
        }
      }
    },
    illustration: (
      <div className="mt-6 relative h-24">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Learning Progress Visualization */}
          <div className="relative w-full px-4">
            <motion.div 
              className="h-2 w-full bg-gray-muted rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-mint to-blue-dark"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="mt-4 flex justify-between">
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-2 h-2 rounded-full bg-mint mr-2" />
                <span className="text-xs text-mint">Input</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="w-2 h-2 rounded-full bg-blue-dark mr-2" />
                <span className="text-xs text-blue-dark">Growth</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  },
];

const AICapabilities = () => {
  return (
    <section className="w-full bg-gradient-to-b from-mint-light/40 to-blue-light/50 overflow-hidden">
      <div className="container mx-auto py-16 md:py-24 px-4">
        <div className="relative">
          {/* Enhanced floating background elements */}
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
                          
                          {/* Icon with enhanced container */}
                          <div className="mb-4 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-mint-light to-blue-light opacity-20 rounded-lg transform -rotate-6" />
                            <motion.div 
                              className="relative inline-flex p-4 rounded-lg bg-gradient-to-br from-mint-light/50 to-blue-light/50 text-mint"
                              initial="hidden"
                              animate="visible"
                              variants={capability.animation?.variants}
                            >
                              {capability.illustration}
                            </motion.div>
                          </div>

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
