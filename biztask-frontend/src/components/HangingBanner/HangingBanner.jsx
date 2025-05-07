
import { motion } from 'framer-motion';
const HangingBanner=({imgage,title,subtitle})=>{


  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.6
      } 
    }
  };

  // Particle animation for background
  const ParticleEffect = () => (
    <div className="absolute inset-0 z-[1]">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: Math.random() * 5 + 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
    return (
<>
<motion.div 
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    className="absolute inset-0 z-0"
  >
    <img
      src={imgage}
      alt="Job Banner"
      className="w-full h-full object-cover brightness-75"
    />
  </motion.div>
  
  
  <motion.div 
    className="absolute inset-0 bg-gradient-to-r from-blue-950 via-black/70 to-blue-950 z-0"
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 0.8 }}
    transition={{ duration: 2 }}
  />

  
  <ParticleEffect />

  {/* Hero Content */}
  <motion.div 
    className="relative font-serif z-10 h-full w-full flex flex-col justify-center items-center text-slate-100 px-4 text-center"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1 
      className="md:text-5xl text-4xl font-bold  text-cyan-200  mb-6 drop-shadow-lg"
      variants={textVariants}
    >
      {title}
    </motion.h1>
    
    <motion.p 
      className="text-[20px] font-normal max-w-2xl text-slate-200 drop-shadow-sm mb-8"
      variants={textVariants}
    >
      {subtitle}
    </motion.p>
  </motion.div>
</>
    );
}


export default HangingBanner;