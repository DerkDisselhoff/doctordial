
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

const Test = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight * 0.6; // 60% of screen height for header
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight * 0.6;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create gradient colors based on our design system
    const mainColor = '#1e634e'; // Base green color
    const accentColor1 = '#10B981'; // mint
    const accentColor2 = '#059669'; // mint-dark
    const accentColor3 = '#84CC16'; // sage
    const accentColor4 = '#D1FAE5'; // mint-light
    
    // Create particles for subtle movement
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        
        // Assign colors from our palette
        const colors = [mainColor, accentColor1, accentColor2, accentColor3, accentColor4];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges with smooth transition
        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // Add transparency for softer look
        ctx.globalAlpha = 0.05;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    // Create array of particles
    const particleCount = 40;
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      // Create smooth gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, mainColor);
      gradient.addColorStop(0.3, accentColor2);
      gradient.addColorStop(0.7, mainColor);
      gradient.addColorStop(1, accentColor1);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw and update particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Animated header background */}
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-[60vh] z-0"
        />
        <Navbar />
        <div className="relative z-10 pt-24 pb-12 h-[60vh] flex items-center justify-center">
          {/* Empty content, as requested */}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="container mx-auto px-4 py-12">
        {/* Reserved for future content */}
      </div>
    </div>
  );
};

export default Test;
