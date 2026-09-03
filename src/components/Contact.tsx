import { motion } from 'framer-motion'

const contactInfo = [
  { icon: '✉️', label: 'Email', value: 'daffakurama10@gmail.com', link: 'mailto:daffakurama10@gmail.com' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/daffa-kumara', link: 'https://linkedin.com/in/daffa-kumara-78a78b267/' },
  { icon: '📍', label: 'Location', value: 'Semarang, Indonesia', link: '#' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-[#0d0d0d] text-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-10 flex flex-col items-center">
          <span className="text-sm text-gray-500 tracking-widest uppercase mb-4">Contact</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </motion.div>

        {/* Giant Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display text-[12vw] lg:text-hero leading-none tracking-tight mb-6 text-white text-center"
        >
          Get in touch
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-gray-400 text-center max-w-lg mb-16 lg:mb-24 text-sm md:text-base leading-relaxed"
        >
          Currently open for new opportunities. Feel free to reach out for collaborations, discussions, or just a friendly hello.
        </motion.p>

        {/* Contact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {contactInfo.map((info) => (
            <a
              key={info.label}
              href={info.link}
              target={info.link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-10 bg-[#111111]/80 backdrop-blur-sm border border-gray-800 rounded-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.06)] group hover:-translate-y-2 text-center"
            >
              <div className="text-3xl mb-6 bg-black/40 p-4 rounded-full border border-gray-800 group-hover:border-white/30 transition-colors">
                {info.icon}
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-widest mb-3">{info.label}</span>
              <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
                {info.value}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          {...fadeInUp}
          className="mt-32 pt-8 border-t border-gray-900 w-full flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Daffa Kumara. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with React & Tailwind
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
