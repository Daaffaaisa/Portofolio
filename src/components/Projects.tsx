import { useState, useRef, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
};

type Category = 'All' | 'Dashboard' | 'ML' | 'Analysis' | 'Visualization';

interface Project {
  id: string;
  title: string;
  category: Category;
  image: string;
  tech: string[];
  metrics: string[];
  description: string;
  slug?: string;
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Repeat Purchase Paradox: Finding High-Value Customers',
    category: 'Analysis',
    image: '/project1/viz_1.png',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    metrics: ['993 orders', '616 customers'],
    description: 'Analyzed e-commerce fashion data to uncover that 58.1% of customers are one-time buyers, yet repeat buyers drive 63.3% of revenue. Applied RFM Analysis to identify high-value segments for targeted retention.',
    slug: 'repeat-purchase-paradox'
  },
  {
    id: '2',
    title: 'Bike Sharing Demand Analysis: Weather & User Behavior',
    category: 'Analysis',
    image: '/project2/dashboard.png',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit'],
    metrics: ['3.29M rentals', '64.9% YoY growth'],
    description: 'Analyzed 731 days of Capital Bikeshare data to uncover weather impact (63% demand swing), demand segmentation via K-Means, and opposing behavioral patterns between casual and registered users.',
    slug: 'bike-sharing-demand'
  },
  {
    id: '3',
    title: 'Predicting Hypoxia Risk from Water Temperature & Seasons',
    category: 'ML',
    image: '/project3/viz_5.png',
    tech: ['Python', 'Scikit-learn', 'Seaborn', 'Pandas'],
    metrics: ['0.84 AUC', '31 years of data'],
    description: 'Built a Random Forest classifier to predict hypoxia risk in estuary waters using 31 years of monitoring data. Discovered that water temperature alone drives 28.5% of predictions, and that DO, the most critical parameter, was missing in 35.9% of observations.',
    slug: 'water-quality-hypoxia'
  },
  {
    id: '4',
    title: 'Silent Signals: Heart Attack Risk Prediction via Biomarkers',
    category: 'ML',
    image: '/project4/viz_11.png',
    tech: ['Python', 'Scikit-learn', 'SciPy', 'Seaborn'],
    metrics: ['98.8% recall', '99.2% AUC'],
    description: 'Classified heart attack risk from 1,319 patients with 98.8% recall. Revealed that Troponin and CK-MB are dramatically more predictive than blood pressure or pulse: the silent biomarkers patients can\'t feel.',
    slug: 'heart-attack-risk'
  },
  {
    id: '5',
    title: 'Netflix Content Strategy: Market Gaps & Localization',
    category: 'Dashboard',
    image: '/project5/dashboard.png',
    tech: ['PostgreSQL', 'Power BI', 'Excel'],
    metrics: ['138 titles', '49K avg votes (long-form)'],
    description: 'Built a Power BI dashboard to optimize Netflix global content strategy. Discovered Film-Noir as an underserved high-demand niche, debunked the short attention span myth, and identified UK as the most efficient content market.',
    slug: 'netflix-content-strategy'
  },
  {
    id: '6',
    title: 'Hidden Cost of Over-Expansion: Corporate Culture Myths',
    category: 'Dashboard',
    image: '/project6/dashboard.png',
    tech: ['Python', 'PostgreSQL', 'Power BI'],
    metrics: ['9,959 companies', '140K branches'],
    description: 'Analyzed 9,900+ companies from AmbitionBox to debunk corporate myths. Legacy companies (>50yr) lead satisfaction at 4.03 while startups lag at 3.71. Mumbai\'s hyper-expansion depresses culture vs Chennai\'s controlled growth.',
    slug: 'ambitionbox-culture'
  },
  {
    id: '7',
    title: 'Data Leakage Myth: Titanic ML Pipeline Experiment',
    category: 'ML',
    image: '/project7/viz_11.png',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn'],
    metrics: ['81.6% accuracy', '3 experiments'],
    description: 'Designed 3 controlled experiments on Titanic data to prove that data leakage consistently degrades model performance, not inflates it. Compared LR, KNN, and RF across clean, leaked, and optimized pipelines.',
    slug: 'titanic-leakage'
  },
  {
    id: '8',
    title: 'Accuracy Illusion: Stroke Risk Prediction with SHAP',
    category: 'ML',
    image: '/project8/viz_3.png',
    tech: ['Python', 'XGBoost', 'SHAP', 'SMOTE'],
    metrics: ['10K patients', '0.85 ROC-AUC'],
    description: 'Built a leakage-proof ML pipeline for Posbindu PTM stroke screening. Exposed the ROC Illusion (0.85 AUC looks great, but PR-AUC is only 0.71) and designed dynamic thresholds for mass screening vs resource-limited settings.',
    slug: 'stroke-risk-posbindu'
  }
];

const categories: Category[] = ['All', 'Dashboard', 'ML', 'Analysis'];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (project.slug) {
      navigate(`/projects/${project.slug}`);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col bg-[#111111] rounded-lg overflow-hidden border border-gray-800 transition-shadow duration-300 ease-out ${project.slug ? 'cursor-pointer' : ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? '-8px' : '0px'})`,
        boxShadow: isHovered ? '0 20px 40px -10px rgba(0,0,0,0.5)' : '0 4px 6px -1px rgba(0,0,0,0.1)',
      }}
    >
      {/* Animated gradient border glow */}
      <div 
        className={`absolute inset-0 z-0 rounded-lg bg-gradient-to-br from-white/20 via-gray-400/10 to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-20' : ''}`} 
        style={{ padding: '1px', margin: '-1px' }}
      />
      
      <div className="relative z-10 flex flex-col h-full bg-[#111111]">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-900">
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider text-black bg-white rounded-full shadow-lg">
              {project.category.toUpperCase()}
            </span>
          </div>
          <div 
            className="w-full h-full bg-gray-800 transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${project.image})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-white mb-3 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow text-justify">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex gap-4 mb-6 pb-6 border-b border-gray-800">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Metric {i + 1}</span>
                <span className="text-sm font-medium text-gray-300">{metric}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-2.5 py-1 text-xs text-gray-400 border border-gray-700 rounded-full transition-colors duration-300 group-hover:border-white/30 group-hover:text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Case Study Indicator */}
          {project.slug && (
            <div className="mt-6 pt-4 border-t border-gray-800/50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs text-gray-400 tracking-wider uppercase">View Case Study</span>
              <span className="text-white text-sm transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects = projectsData.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="projects" className="section-padding bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="mb-16 flex flex-col items-center text-center"
          {...fadeInUp}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-white/40" />
            <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
              Selected Work
            </span>
            <div className="h-[1px] w-8 bg-white/40" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-white mb-6 tracking-tight relative inline-block">
            PROJECTS
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </h2>
          <p className="text-gray-400 max-w-2xl mt-4">
            A curated selection of recent projects showcasing data-driven solutions, 
            machine learning models, and insightful visualizations.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-300"
            >
              <span className={`relative z-10 ${activeCategory === category ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                {category}
              </span>
              {activeCategory === category && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 border-b-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
