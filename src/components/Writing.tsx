import { motion } from 'framer-motion'

const publications = [
  {
    title: 'Beyond Predictive Accuracy: Enhancing Parameter Stability in Multicollinear Time Series Forecasting via Regularisation',
    publication: 'Edumatic: Jurnal Pendidikan Informatika',
    volume: 'Vol. 10 No. 1, 2026',
    year: '2026',
    link: 'https://doi.org/10.29408/edumatic.v10i1.33925',
    description: 'Investigated regularization techniques (Ridge and ElasticNet) for improving parameter stability in feature-based time series regression using electricity consumption data from the UCI Repository.',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Writing() {
  return (
    <section id="writing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Research & Publications</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          PUBLICATIONS
        </motion.h2>

        {/* Publications List */}
        <div className="space-y-0">
          {publications.map((pub, index) => (
            <motion.a
              key={pub.title}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="block border-t border-gray-800 py-8 md:py-10 group hover:bg-gray-900/30 transition-colors px-4 -mx-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                  <h3 className="text-lg md:text-xl lg:text-2xl text-white font-light group-hover:text-gray-300 transition-colors leading-snug max-w-3xl">
                    {pub.title}
                  </h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap">{pub.year}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed max-w-3xl text-justify">
                  {pub.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                  <span className="text-sm text-gray-500">
                    {pub.publication}, {pub.volume}
                  </span>
                  <span className="text-xs text-gray-600 group-hover:text-white transition-colors flex items-center gap-1">
                    DOI ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
