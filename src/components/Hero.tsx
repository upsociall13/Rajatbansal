import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'motion/react';
import { Star } from 'lucide-react';

const CosmicBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const xVelocity = useVelocity(smoothX);
  const yVelocity = useVelocity(smoothY);
  
  const intensity = useSpring(
    useTransform(
      [xVelocity, yVelocity],
      ([vx, vy]: any) => {
        const speed = Math.sqrt(vx * vx + vy * vy);
        return 1 + Math.min(speed / 2000, 0.15); // Up to 15% increase on movement
      }
    ),
    { damping: 50, stiffness: 300 }
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms for different layers with intensity factor
  const neb1X = useTransform([smoothX, intensity], ([x, i]: any) => x * 45 * i);
  const neb1Y = useTransform([smoothY, intensity], ([y, i]: any) => y * 35 * i);
  
  const neb2X = useTransform([smoothX, intensity], ([x, i]: any) => x * -45 * i);
  const neb2Y = useTransform([smoothY, intensity], ([y, i]: any) => y * -35 * i);

  const starX = useTransform([smoothX, intensity], ([x, i]: any) => x * 25 * i);
  const starY = useTransform([smoothY, intensity], ([y, i]: any) => y * 20 * i);

  const dustX = useTransform([smoothX, intensity], ([x, i]: any) => x * 60 * i);
  const dustY = useTransform([smoothY, intensity], ([y, i]: any) => y * 50 * i);

  const bgScale = useTransform(intensity, [1, 1.15], [1, 1.05]);

  const stars = useMemo(() => 
    Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      color: Math.random() > 0.8 ? '#dbb36f' : '#ffffff',
    })), []
  );

  const dust = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.2,
      duration: Math.random() * 10 + 10,
    })), []
  );

  const shootingStars = useMemo(() => 
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 40,
      duration: Math.random() * 0.8 + 0.4, // Quicker: 0.4s to 1.2s
      angle: Math.random() * 40 + 10, // 10 to 50 degrees
      top: Math.random() * 60, // Start in top 60%
      left: Math.random() * 20 - 10, // Start slightly off-screen left
      repeatDelay: Math.random() * 50 + 20, // Infrequent: 20s to 70s
      color: Math.random() > 0.6 ? '#dbb36f' : '#ffffff',
    })), []
  );

  return (
    <motion.div 
      style={{ scale: bgScale }}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Deep Gradient Base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,130,54,0.03),transparent_80%)]" />
      
      {/* Layered Nebulae 1 - Gold/Warm */}
      <motion.div 
        style={{ x: neb1X, y: neb1Y }}
        className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] z-0"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(197,130,54,0.15),transparent_60%)] blur-[140px]"
        />
      </motion.div>

      {/* Layered Nebulae 2 - Blue/Cool */}
      <motion.div 
        style={{ x: neb2X, y: neb2Y }}
        className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] z-0"
      >
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.01, 0.02, 0.01],
          }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.08),transparent_60%)] blur-[140px]"
        />
      </motion.div>

      {/* Starfield with Parallax */}
      <motion.div 
        style={{ x: starX, y: starY }}
        className="absolute inset-[-10%] w-[120%] h-[120%] z-10"
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.7, 0.1],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: star.duration, 
              repeat: Infinity, 
              delay: star.delay,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              borderRadius: '50%',
              boxShadow: `0 0 6px ${star.color === '#ffffff' ? 'rgba(255,255,255,0.4)' : 'rgba(219,179,111,0.4)'}`
            }}
          />
        ))}
      </motion.div>

      {/* Star Dust Particles with higher Parallax */}
      <motion.div 
        style={{ x: dustX, y: dustY }}
        className="absolute inset-[-20%] w-[140%] h-[140%] z-20"
      >
        {dust.map((d) => (
          <motion.div
            key={d.id}
            animate={{ 
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: d.duration, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              position: 'absolute',
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: `${d.size}px`,
              height: `${d.size}px`,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </motion.div>

      {/* Shooting Stars */}
      {shootingStars.map((ss) => (
        <motion.div
          key={ss.id}
          initial={{ x: "-10%", y: `${ss.top}%`, opacity: 0, scaleX: 0 }}
          animate={{ 
            x: ["0%", "150%"],
            y: [`${ss.top}%`, `${ss.top + 40}%`],
            opacity: [0, 0.8, 0],
            scaleX: [0, 1, 0]
          }}
          transition={{ 
            duration: ss.duration, 
            repeat: Infinity, 
            delay: ss.delay,
            repeatDelay: ss.repeatDelay,
            ease: "easeIn"
          }}
          style={{
            rotate: `${ss.angle}deg`,
            top: `${ss.top}%`,
            left: `${ss.left}%`,
            background: `linear-gradient(90deg, transparent 0%, ${ss.color}66 50%, transparent 100%)`
          }}
          className="absolute w-24 h-[1px] origin-left z-30"
        />
      ))}

      {/* Subtle Glows */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gold-500/5 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-blue-500/5 blur-[180px] rounded-full animate-pulse delay-1000" />
    </motion.div>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <CosmicBackground />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
            Strategic Astrology for High Achievers
          </span>
          <h1 className="text-5xl md:text-8xl font-serif leading-[1.1] mb-8">
            Strategic Astrology for Those Who <span className="gold-gradient-text italic">Make Big Decisions</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Harness ancient cosmic intelligence to navigate wealth, business timing, and life direction with absolute clarity. Rajat Bansal provides the strategic blueprint for your next major move.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onOpenModal}
              className="w-full sm:w-auto px-10 py-5 bg-gold-500 text-cosmic-950 font-bold uppercase tracking-widest rounded-full hover:bg-gold-400 transition-all shadow-2xl shadow-gold-500/20 hover:-translate-y-1"
            >
              Book a Call
            </button>
            <a href="#services" className="w-full sm:w-auto px-10 py-5 border border-white/20 hover:border-gold-500/50 transition-all font-bold uppercase tracking-widest rounded-full text-center">
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold-500 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
