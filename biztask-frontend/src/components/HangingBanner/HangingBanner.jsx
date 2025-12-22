import { motion } from 'framer-motion';

const HangingBanner = ({ imgage, title, subtitle }) => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        type: "spring",
        stiffness: 100
      } 
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      } 
    }
  };

 
  return (
    <div className="relative w-full h-full font-serif  overflow-hidden">
      {/*  Background Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ 
          scale: [1.1, 1.05, 1.1],
          opacity: [0.8, 0.9, 0.8]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 z-0"
      >
        <img
          src={imgage}
          alt="Banner Background"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
     
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-800/90 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

    
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-blue-950/30 to-black/60 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
   

      {/* Hero Content */}
      <motion.div 
        className="relative font-serif z-10 h-full w-full flex flex-col justify-center items-center text-slate-100 px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.div
          variants={titleVariants}
          className="relative mb-8"
        >
          <motion.h1 
            className="sm:text-5xl text-4xl font-bold bg-gradient-to-r from-cyan-200 via-white to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl leading-tight"
            
          >
            {title}
          </motion.h1>
          
          {/* underline effect */}
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: "60%", 
              opacity: [0, 1, 0.7],
            }}
            transition={{ 
              duration: 1.5, 
              delay: 1.2,
              opacity: { duration: 2, repeat: Infinity, repeatType: "reverse" }
            }}
          />
        </motion.div>
        
        {/*  Subtitle */}
        <motion.div
          variants={subtitleVariants}
          className="relative max-w-3xl"
        >
          <motion.p 
            className="text-xl  font-light text-slate-200/90 drop-shadow-lg leading-relaxed backdrop-blur-sm bg-white/5 px-8 py-4 rounded-2xl border border-white/10"
           
          >
            {subtitle}
          </motion.p>
        </motion.div>

        
      
      </motion.div>

      {/* Bottom  effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent z-[2]" />
    </div>
  );
};

export default HangingBanner;