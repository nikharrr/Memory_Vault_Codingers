import { useEffect, useRef } from 'react';

function TransitionAnimation() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create shooting stars
    const stars = [];
    const createStar = () => {
      const angle = (135/180) * Math.PI;
      const length = Math.random() * 150 + 100;
      const speed = Math.random() * 5 + 10;
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        angle,
        speed,
        trail: [],
        trailLength: Math.floor(Math.random() * 15) + 15,
        length,
        hue: Math.random() * 60 + 45, // Gold to yellow range
      };
    };
    
    // Create initial stars
    for (let i = 0; i < 2; i++) {
      stars.push(createStar());
    }
    
    const animate = () => {
      // Fade out previous frame
      ctx.fillStyle = 'rgba(5, 10, 31, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      stars.forEach((star, index) => {
        // Move star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        
        // Add current position to trail
        star.trail.push({x: star.x, y: star.y, size: star.size});
        
        // Keep trail at specified length
        if (star.trail.length > star.trailLength) {
          star.trail.shift();
        }
        
        // Draw trail
        ctx.beginPath();
        star.trail.forEach((point, i) => {
          const alpha = i / star.trail.length;
          ctx.strokeStyle = `hsla(${star.hue}, 100%, 75%, ${alpha})`;
          ctx.lineWidth = point.size * (i / star.trail.length);
          
          if (i === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
        
        // Draw star head (brighter)
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 100%, 90%, 1)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${star.hue}, 100%, 75%, 1)`;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Replace star if it moved off screen
        if (
          star.x < -100 || 
          star.x > canvas.width + 100 || 
          star.y < -100 || 
          star.y > canvas.height + 100
        ) {
          stars[index] = createStar();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    const animation = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
}

export default TransitionAnimation;