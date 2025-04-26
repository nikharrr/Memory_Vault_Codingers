import { useRef, useEffect } from "react";

const Fireflies = ({ isDarkMode = true }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Create more fireflies for a richer experience
    const fireflies = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dx: Math.random() * 0.6 - 0.3,
      dy: Math.random() * 0.6 - 0.3,
      intensity: Math.random(), // For pulse effect
      pulse: 0.01 + Math.random() * 0.02,
      color: isDarkMode 
        ? `rgba(255, ${200 + Math.floor(Math.random() * 55)}, ${100 + Math.floor(Math.random() * 55)}, 1)` 
        : `rgba(255, ${220 + Math.floor(Math.random() * 35)}, ${150 + Math.floor(Math.random() * 75)}, 1)`
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      fireflies.forEach(f => {
        // Update intensity for pulsing effect
        f.intensity += f.pulse;
        if (f.intensity > 1 || f.intensity < 0.3) {
          f.pulse *= -1;
        }
        
        // Draw main glow
        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 8);
        gradient.addColorStop(0, f.color.replace('1)', `${f.intensity})`));
        gradient.addColorStop(1, 'rgba(255, 255, 153, 0)');
        
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw brighter center
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + f.intensity + ')';
        ctx.shadowBlur = 20;
        ctx.shadowColor = isDarkMode ? "#facc15" : "#fcd34d";
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const update = () => {
      fireflies.forEach(f => {
        // Add slight randomness to movement for more natural behavior
        f.dx += (Math.random() - 0.5) * 0.05;
        f.dy += (Math.random() - 0.5) * 0.05;
        
        // Limit max speed
        f.dx = Math.max(-0.5, Math.min(0.5, f.dx));
        f.dy = Math.max(-0.5, Math.min(0.5, f.dy));
        
        // Update position
        f.x += f.dx;
        f.y += f.dy;
        
        // Handle boundary behavior with buffer
        const buffer = 50;
        if (f.x < -buffer) f.x = w + buffer;
        if (f.x > w + buffer) f.x = -buffer;
        if (f.y < -buffer) f.y = h + buffer;
        if (f.y > h + buffer) f.y = -buffer;
      });
    };

    const animate = () => {
      draw();
      update();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default Fireflies;