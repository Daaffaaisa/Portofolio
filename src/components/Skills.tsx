import { motion } from 'framer-motion'

const skills = [
  {
    title: 'Data Analytics & Processing',
    icon: '📊',
    description: 'Extracting insights from complex datasets through statistical analysis, data cleaning, and transformation',
    coreTags: ['Pandas & NumPy', 'EDA', 'Feature Engineering', 'Data Imputation', 'Leakage Prevention'],
    familiarTags: ['Cohort Analysis', 'Statistical Analysis']
  },
  {
    title: 'Programming',
    icon: '🐍',
    description: 'Building analytical pipelines, automation scripts, and data-driven applications',
    coreTags: ['Python', 'SQL', 'Excel'],
    familiarTags: []
  },
  {
    title: 'Machine Learning',
    icon: '🤖',
    description: 'Developing predictive models, classification systems, and time series forecasting solutions',
    coreTags: ['Scikit-Learn', 'TensorFlow', 'Time Series', 'Advanced Metrics', 'Model Tuning'],
    familiarTags: ['Tree-Based Models', 'CNN / Deep Learning', 'Regression', 'SHAP']
  },
  {
    title: 'Database Systems',
    icon: '🗄️',
    description: 'Designing, querying, and optimizing relational databases for efficient data management',
    coreTags: ['MySQL', 'PostgreSQL', 'Data Extraction'],
    familiarTags: ['Database Design']
  },
  {
    title: 'Visualization & Reporting',
    icon: '📈',
    description: 'Creating compelling dashboards and visual reports to communicate data stories',
    coreTags: ['Tableau / Power BI', 'Matplotlib & Seaborn', 'Dashboard Creation', 'Data Storytelling'],
    familiarTags: ['SciPy', 'Business Analytics']
  }
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Expertise</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-20 text-white"
        >
          SKILLS
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-[#111111]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(255,255,255,0.06)] flex flex-col h-full"
            >
              {/* Top background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              
              <div className="relative z-10 flex-grow flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-6 bg-white/10">
                  {skill.icon}
                </div>
                
                {/* Title & Desc */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {skill.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow text-justify">
                  {skill.description}
                </p>
                
                {/* Tags - Categorized */}
                <div className="flex flex-col gap-4 mt-auto">
                  {/* Core Stack */}
                  {skill.coreTags && skill.coreTags.length > 0 && (
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2 font-medium">Core Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {skill.coreTags.map(tag => (
                          <span 
                            key={tag}
                            className="text-xs px-3 py-1.5 rounded-full border border-gray-700 bg-white/5 text-gray-200 transition-colors group-hover:border-white/30 group-hover:text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Familiar */}
                  {skill.familiarTags && skill.familiarTags.length > 0 && (
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 font-medium group-hover:text-gray-500 transition-colors">Familiar With</p>
                      <div className="flex flex-wrap gap-2">
                        {skill.familiarTags.map(tag => (
                          <span 
                            key={tag}
                            className="text-xs px-3 py-1.5 rounded-full border border-gray-800/80 bg-black/30 text-gray-500 transition-colors group-hover:border-gray-600 group-hover:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
