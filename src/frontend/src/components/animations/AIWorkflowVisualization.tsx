import { useEffect, useRef, useState } from 'react';
import { useParallax } from '../../hooks/useParallax';

interface Node {
  x: number;
  y: number;
  label: string;
  radius: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  pathIndex: number;
}

interface DashboardPanel {
  x: number;
  y: number;
  width: number;
  height: number;
  offsetY: number;
  speed: number;
  label: string;
  value: string;
}

export function AIWorkflowVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });
  const parallaxOffset = useParallax(0.15);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const container = canvas.parentElement;
      if (container) {
        const width = container.clientWidth;
        const height = Math.min(600, width * 0.5);
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;

    // Define nodes
    const nodes: Node[] = [
      { x: centerX, y: centerY, label: 'AI Hub', radius: 40, color: '#00E5FF' },
      { x: centerX - 200, y: centerY - 120, label: 'CRM', radius: 28, color: '#00D9FF' },
      { x: centerX + 200, y: centerY - 120, label: 'AI Agent', radius: 28, color: '#00D9FF' },
      { x: centerX + 220, y: centerY + 80, label: 'Chatbot', radius: 28, color: '#00D9FF' },
      { x: centerX + 80, y: centerY + 140, label: 'Email', radius: 28, color: '#00D9FF' },
      { x: centerX - 80, y: centerY + 140, label: 'Analytics', radius: 28, color: '#00D9FF' },
      { x: centerX - 220, y: centerY + 80, label: 'Apps', radius: 28, color: '#00D9FF' },
    ];

    // Connection paths
    const paths = [
      [1, 0], [0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
    ];

    // Particles
    const particles: Particle[] = [];
    for (let i = 0; i < paths.length * 3; i++) {
      const pathIndex = Math.floor(i / 3);
      const [startIdx, endIdx] = paths[pathIndex];
      particles.push({
        x: nodes[startIdx].x,
        y: nodes[startIdx].y,
        targetX: nodes[endIdx].x,
        targetY: nodes[endIdx].y,
        progress: (i % 3) * 0.33,
        speed: 0.003 + Math.random() * 0.002,
        pathIndex,
      });
    }

    // Dashboard panels
    const dashboardPanels: DashboardPanel[] = [
      { x: 60, y: 80, width: 140, height: 80, offsetY: 0, speed: 0.02, label: 'Uptime', value: '99.9%' },
      { x: width - 200, y: 100, width: 140, height: 80, offsetY: 0, speed: 0.025, label: 'Tasks/min', value: '847' },
      { x: 80, y: height - 140, width: 140, height: 80, offsetY: 0, speed: 0.018, label: 'Efficiency', value: '94%' },
    ];

    let time = 0;
    let pulsePhase = 0;

    const animate = () => {
      time += 0.016;
      pulsePhase += 0.02;

      // Clear canvas with dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0A0A0F');
      gradient.addColorStop(1, '#1A1A2E');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update dashboard panel positions
      dashboardPanels.forEach(panel => {
        panel.offsetY = Math.sin(time * panel.speed) * 8;
      });

      // Draw connection lines with pulsing effect
      paths.forEach(([startIdx, endIdx], pathIdx) => {
        const start = nodes[startIdx];
        const end = nodes[endIdx];
        
        const pulseIntensity = 0.3 + Math.sin(pulsePhase + pathIdx * 0.5) * 0.2;
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = `rgba(0, 217, 255, ${pulseIntensity})`;
        ctx.lineWidth = 2 + Math.sin(pulsePhase + pathIdx * 0.5) * 0.5;
        ctx.stroke();

        // Glow effect
        ctx.strokeStyle = `rgba(0, 229, 255, ${pulseIntensity * 0.3})`;
        ctx.lineWidth = 6;
        ctx.stroke();
      });

      // Update and draw particles
      particles.forEach(particle => {
        particle.progress += particle.speed;
        if (particle.progress >= 1) {
          particle.progress = 0;
          const [startIdx, endIdx] = paths[particle.pathIndex];
          particle.x = nodes[startIdx].x;
          particle.y = nodes[startIdx].y;
          particle.targetX = nodes[endIdx].x;
          particle.targetY = nodes[endIdx].y;
        }

        const currentX = particle.x + (particle.targetX - particle.x) * particle.progress;
        const currentY = particle.y + (particle.targetY - particle.y) * particle.progress;

        const fadeIn = Math.min(particle.progress * 3, 1);
        const fadeOut = Math.min((1 - particle.progress) * 3, 1);
        const opacity = Math.min(fadeIn, fadeOut);

        // Draw particle
        const particleGradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 6);
        particleGradient.addColorStop(0, `rgba(0, 255, 255, ${opacity})`);
        particleGradient.addColorStop(0.5, `rgba(0, 229, 255, ${opacity * 0.6})`);
        particleGradient.addColorStop(1, `rgba(0, 229, 255, 0)`);
        
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes with breathing glow
      nodes.forEach((node, idx) => {
        const breathe = Math.sin(pulsePhase + idx * 0.3) * 0.15 + 0.85;
        const glowRadius = node.radius * (1 + breathe * 0.2);

        // Outer glow
        const outerGlow = ctx.createRadialGradient(node.x, node.y, node.radius * 0.5, node.x, node.y, glowRadius);
        outerGlow.addColorStop(0, idx === 0 ? 'rgba(0, 229, 255, 0.6)' : 'rgba(0, 217, 255, 0.4)');
        outerGlow.addColorStop(0.5, idx === 0 ? 'rgba(0, 229, 255, 0.3)' : 'rgba(0, 217, 255, 0.2)');
        outerGlow.addColorStop(1, 'rgba(0, 229, 255, 0)');
        
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        const nodeGradient = ctx.createRadialGradient(
          node.x - node.radius * 0.3,
          node.y - node.radius * 0.3,
          0,
          node.x,
          node.y,
          node.radius
        );
        nodeGradient.addColorStop(0, idx === 0 ? 'rgba(0, 255, 255, 0.9)' : 'rgba(0, 229, 255, 0.8)');
        nodeGradient.addColorStop(1, idx === 0 ? 'rgba(0, 184, 212, 0.6)' : 'rgba(0, 184, 212, 0.5)');
        
        ctx.fillStyle = nodeGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * breathe, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = idx === 0 ? 'rgba(0, 255, 255, 0.9)' : 'rgba(0, 229, 255, 0.7)';
        ctx.lineWidth = idx === 0 ? 3 : 2;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = idx === 0 ? 'bold 14px Inter' : '12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y);
      });

      // Draw dashboard panels with glassmorphism
      dashboardPanels.forEach(panel => {
        const panelY = panel.y + panel.offsetY;

        // Panel background with glassmorphism
        ctx.fillStyle = 'rgba(17, 24, 39, 0.7)';
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.roundRect(panel.x, panelY, panel.width, panel.height, 8);
        ctx.fill();
        ctx.stroke();

        // Inner glow
        const innerGlow = ctx.createLinearGradient(panel.x, panelY, panel.x, panelY + panel.height);
        innerGlow.addColorStop(0, 'rgba(0, 229, 255, 0.1)');
        innerGlow.addColorStop(1, 'rgba(0, 229, 255, 0)');
        ctx.fillStyle = innerGlow;
        ctx.fill();

        // Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '11px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(panel.label, panel.x + 12, panelY + 24);

        // Value
        ctx.fillStyle = '#00E5FF';
        ctx.font = 'bold 20px Orbitron';
        ctx.fillText(panel.value, panel.x + 12, panelY + 52);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div 
      className="relative w-full"
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{ 
          maxHeight: '600px',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
    </div>
  );
}
