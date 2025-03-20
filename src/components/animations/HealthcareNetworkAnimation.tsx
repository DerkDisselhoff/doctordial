
import React, { useEffect, useRef } from 'react';

const HealthcareNetworkAnimation = () => {
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
    
    // Create a network of connected nodes representing a healthcare network
    class Node {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      type: 'patient' | 'doctor' | 'hospital' | 'data';
      connections: Node[];
      pulsePhase: number;
      
      constructor(type: 'patient' | 'doctor' | 'hospital' | 'data') {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.type = type;
        
        // Size based on node type
        if (type === 'patient') {
          this.size = Math.random() * 4 + 3;
          this.color = accentColor4; // Light mint for patients
        } else if (type === 'doctor') {
          this.size = Math.random() * 5 + 4;
          this.color = accentColor1; // Mint for doctors
        } else if (type === 'hospital') {
          this.size = Math.random() * 7 + 6;
          this.color = accentColor3; // Sage for hospitals
        } else {
          this.size = Math.random() * 3 + 2;
          this.color = accentColor2; // Mint-dark for data points
        }
        
        // Slower movement for a more subtle effect
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.connections = [];
        
        // For pulse animation
        this.pulsePhase = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += 0.01;
        
        // Bounce off edges with smooth transition
        if (this.x > width || this.x < 0) this.speedX *= -1;
        if (this.y > height || this.y < 0) this.speedY *= -1;
      }
      
      draw() {
        if (!ctx) return;
        
        // Pulse effect on size
        const pulseFactor = Math.sin(this.pulsePhase) * 0.2 + 1;
        const currentSize = this.size * pulseFactor;
        
        ctx.beginPath();
        
        // Use simple circles for all node types instead of using '+' symbols
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.15; // More transparency for softer look
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      
      // Draw connections to other nodes
      drawConnections() {
        if (!ctx) return;
        
        this.connections.forEach(node => {
          // Calculate distance for opacity
          const dx = this.x - node.x;
          const dy = this.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw connections within a certain range
          if (distance < 150) {
            const opacity = 0.03 * (1 - (distance / 150));
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      }
    }
    
    // Create healthcare network
    const nodeCount = {
      patient: 25, 
      doctor: 15, 
      hospital: 5, 
      data: 30
    };
    
    const nodes: Node[] = [];
    
    // Create nodes of each type
    for (let i = 0; i < nodeCount.patient; i++) {
      nodes.push(new Node('patient'));
    }
    for (let i = 0; i < nodeCount.doctor; i++) {
      nodes.push(new Node('doctor'));
    }
    for (let i = 0; i < nodeCount.hospital; i++) {
      nodes.push(new Node('hospital'));
    }
    for (let i = 0; i < nodeCount.data; i++) {
      nodes.push(new Node('data'));
    }
    
    // Create connections between nodes
    nodes.forEach(node => {
      // Connect to nearby nodes
      nodes.forEach(otherNode => {
        if (node !== otherNode) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Create connections based on node types and proximity
          if (distance < 150) {
            if (
              (node.type === 'patient' && otherNode.type === 'doctor') ||
              (node.type === 'doctor' && otherNode.type === 'patient') ||
              (node.type === 'doctor' && otherNode.type === 'hospital') ||
              (node.type === 'hospital' && otherNode.type === 'doctor') ||
              (node.type === 'data' && otherNode.type === 'doctor') ||
              (node.type === 'data' && otherNode.type === 'hospital')
            ) {
              node.connections.push(otherNode);
            }
          }
        }
      });
    });
    
    // Heartbeat pulse animation
    let heartbeatPhase = 0;
    
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
      
      // Occasional subtle pulse over the whole canvas (like a heartbeat)
      heartbeatPhase += 0.01;
      if (Math.sin(heartbeatPhase) > 0.95) {
        ctx.fillStyle = accentColor1;
        ctx.globalAlpha = 0.03;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
      }
      
      // First draw connections
      nodes.forEach(node => {
        node.drawConnections();
      });
      
      // Then draw the nodes on top
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default HealthcareNetworkAnimation;
