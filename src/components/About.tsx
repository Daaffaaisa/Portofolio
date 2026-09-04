import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About Me</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        {/* First Block , Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="order-2 lg:order-1"
          >
            <img
              src="/bruce-portrait.png"
              alt="Daffa Kumara Khiar Faisa"
              className="w-full max-w-md h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              UNIVERSITAS DIAN NUSWANTORO, SEMARANG / ID
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center"
          >
            <div>
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-6 text-justify">
                I'm Daffa Kumara Khiar Faisa, a Computer Science student at Universitas Dian Nuswantoro
                with a strong passion for turning raw data into meaningful insights. Currently maintaining
                a 3.75/4.00 GPA while actively pursuing hands-on experience in AI/ML and data analytics.
              </p>
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed text-justify">
                My coursework spans Machine Learning, Data Mining, Database Systems, and Logic
                Informatics, building a solid foundation for solving complex, real-world data problems.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quote Block , Highlight */}
        <motion.div
          {...fadeInUp}
          className="mb-24 lg:mb-32"
        >
          <h2 className="font-display text-[7vw] lg:text-section leading-none tracking-tight text-gray-300">
            "FROM CLASSIFYING<br />
            <span className="text-white underline underline-offset-8">RETINAL EYE DISEASES</span><br />
            TO PUBLISHING<br />
            RESEARCH ON<br />
            TIME SERIES FORECASTING."
          </h2>
          <p className="mt-6 text-sm text-gray-500 tracking-widest uppercase">
            AI/ML INTERN → PUBLISHED<br />
            RESEARCHER
          </p>
        </motion.div>

        {/* Second Block , Experience Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="flex items-center lg:text-right"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed text-justify">
              As an AI/ML Intern at IDSS UDINUS, I worked on comparative analysis of lightweight 
              CNN architectures for medical image classification, achieving 87.9% accuracy on retinal 
              fundus images with MobileNetV3 Small. This experience deepened my understanding of 
              deep learning, data preprocessing strategies, and model evaluation.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <div className="w-full aspect-video border border-gray-800 rounded-lg overflow-hidden group relative">
                <img 
                  src="/IDSS.JPG" 
                  alt="AI/ML Internship at IDSS UDINUS" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
              </div>
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              IDSS UDINUS, SEMARANG / ID<br />
              (2025)
            </p>
          </motion.div>
        </div>

        {/* Third Block , Frontend & Award */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          <motion.div {...fadeInUp}>
            <div className="w-full aspect-video bg-[#111111] border border-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl mb-3">🏆</p>
                <p className="font-display text-2xl text-white mb-2">1ST PLACE</p>
                <p className="text-sm text-gray-500 tracking-widest uppercase">Data Analysis Division</p>
                <p className="text-xs text-gray-600 mt-2">BTNG, DNCC 2024</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              BASIC TRAINING FOR NEXT GENERATION<br />
              (2024)
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed text-justify">
              Beyond data science, I gained frontend development experience at Diskominfo Kota 
              Semarang, collecting user requirements, evaluating usability through structured 
              analysis, and delivering data-driven recommendations. This cross-functional exposure 
              sharpened my ability to communicate insights and build user-centered solutions. 
              I also earned 1st Place in the Data Analysis division at BTNG-DNCC, competing at 
              the university level.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
