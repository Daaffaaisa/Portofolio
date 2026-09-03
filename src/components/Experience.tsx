import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
};

const experiences = [
  {
    role: "AI/ML Intern",
    company: "IDSS UDINUS, Semarang",
    period: "Feb 2025 – Jul 2025",
    description: "Conducted comparative analysis of 4 lightweight CNN architectures for 10-class eye disease classification on retinal fundus images, achieving 87.9% test accuracy with MobileNetV3 Small. Evaluated data preprocessing strategies and performed per-class performance analysis using Precision, Recall, F1-Score, and Confusion Matrix.",
    badges: ["Python", "TensorFlow", "CNN", "Computer Vision"]
  },
  {
    role: "Frontend Developer Intern",
    company: "Diskominfo Kota Semarang",
    period: "Jun 2025 – Sep 2025",
    description: "Collected and analyzed user requirements from multiple stakeholder groups to identify pain points and prioritize system improvements. Evaluated usability issues through structured use case analysis and optimized user flow based on findings. Conducted functional testing and provided data-driven recommendations.",
    badges: ["Frontend", "UX Research", "Usability Testing", "User Flow"]
  }
];

const awards = [
  {
    title: "1st Place, Data Analysis Division",
    event: "Basic Training For Next Generation (BTNG), DNCC",
    period: "Oct 2024 – Nov 2024",
    description: "Achieved 1st place as the best work in the Data Analysis division. Selected as the top performer among participants at the university level selection.",
    icon: "🏆"
  }
];

const certifications = [
  {
    title: "Data Scientist Certification (Passed)",
    issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
    year: "2026",
    description: "Successfully passed the national competency assessment for the Data Scientist scheme. Official certificate issuance is currently in progress.",
    icon: "📜"
  },
  {
    title: "TOEFL English Proficiency (Score: 507)",
    issuer: "CFLT, Universitas Dian Nuswantoro",
    year: "2026",
    description: "Demonstrated professional working proficiency in English, encompassing listening comprehension, structure and written expression, and reading comprehension.",
    icon: "🌐",
    link: "/certificates/toefl-certificate.pdf"
  }
];

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-[#0d0d0d] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div {...fadeInUp} className="mb-20">
          <span className="text-sm tracking-widest text-gray-400 flex items-center gap-4">
            CAREER
            <span className="h-px w-12 bg-white/20 block" />
          </span>
          <h2 className="font-display text-[10vw] lg:text-section leading-none tracking-tight mt-4">
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-6 md:pl-10 mb-24 lg:mb-32">
          {/* Gradient Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-white/40 via-gray-500/20 to-transparent" />
          
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Glowing Dot */}
                <div className="absolute -left-[29px] md:-left-[45px] top-2 w-3 h-3 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.6)] z-10 
                  group-hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-shadow duration-300" />
                
                <div className="bg-[#111111] p-6 md:p-8 rounded-2xl border border-gray-800 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-[#151515] relative overflow-hidden">
                  
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4 relative z-10">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white">{exp.role}</h3>
                      <p className="text-gray-400 mt-1">{exp.company}</p>
                    </div>
                    <span className="text-gray-200 text-sm font-medium tracking-wide bg-white/10 px-3 py-1 rounded-full whitespace-nowrap self-start">
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed mb-6 relative z-10 text-justify">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {exp.badges.map((badge, idx) => (
                      <span key={idx} className="text-xs text-gray-300 bg-black/40 border border-gray-700 px-3 py-1.5 rounded-full transition-colors hover:border-white/30 hover:text-white">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <motion.div {...fadeInUp}>
          <div className="mb-10 flex items-center gap-4">
            <h3 className="font-display text-3xl md:text-4xl text-white tracking-wide">
              AWARDS
            </h3>
            <div className="h-px flex-grow bg-gradient-to-r from-gray-800 to-transparent max-w-sm" />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {awards.map((award, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800 transition-all duration-300 hover:border-white/20 hover:bg-white/10 group"
              >
                <div className="text-3xl bg-[#0a0a0a] p-3 rounded-lg border border-gray-800 group-hover:border-white/30 transition-colors">
                  {award.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-100 group-hover:text-white transition-colors text-lg">{award.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{award.event}</p>
                  <p className="text-sm text-gray-500 mt-1">{award.period}</p>
                  <p className="text-sm text-gray-400 mt-3 leading-relaxed text-justify">{award.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div {...fadeInUp} className="mt-16">
          <div className="mb-10 flex items-center gap-4">
            <h3 className="font-display text-3xl md:text-4xl text-white tracking-wide">
              CERTIFICATIONS
            </h3>
            <div className="h-px flex-grow bg-gradient-to-r from-gray-800 to-transparent max-w-sm" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800 transition-all duration-300 hover:border-white/20 hover:bg-white/10 group"
              >
                <div className="text-3xl bg-[#0a0a0a] p-3 rounded-lg border border-gray-800 group-hover:border-white/30 transition-colors">
                  {cert.icon}
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="font-medium text-gray-100 group-hover:text-white transition-colors text-lg">{cert.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 mt-1">{cert.year}</p>
                  <p className="text-sm text-gray-400 mt-3 mb-4 leading-relaxed text-justify flex-grow">{cert.description}</p>
                  {cert.link && (
                    <a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-full transition-all self-start"
                    >
                      View Credential ↗
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
