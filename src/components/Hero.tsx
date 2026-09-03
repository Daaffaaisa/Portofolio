import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image - Responsive */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-16 lg:pr-24">
        <img
          src="/bruce-portrait.png"
          alt="Daffa Kumara Khiar Faisa"
          className="max-h-[80vh] md:max-h-[90vh] max-w-[85%] md:max-w-[55%] w-auto h-auto object-contain object-center"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:from-black/70 md:via-black/20 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-5xl">
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-display leading-none tracking-tighter text-[12vw] sm:text-[10vw] md:text-hero">
              <span className="block text-white">DAFFA</span>
              <span className="block text-white">KUMARA</span>
            </h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 md:mt-8"
            >
              <p className="text-sm sm:text-base text-white/60 tracking-widest uppercase mb-3">
                Data Analyst / Data Scientist
              </p>
              <p className="text-sm sm:text-base text-white/40 max-w-sm md:max-w-md leading-relaxed text-justify">
                Turning raw data into actionable insights through analytics, machine learning, and compelling visualizations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
