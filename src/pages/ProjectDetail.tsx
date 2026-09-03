import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GrainOverlay } from '@/components/GrainOverlay'

// --- Project data types ---
interface ProjectData {
  title: string
  category: string
  heroImage: string
  overview: string
  problem: string
  approach: string[]
  techStack: { name: string; role: string }[]
  keyFindings: { stat: string; label: string }[]
  insights: { title: string; description: string }[]
  visualizations: { image: string; caption: string }[]
  results: string[]
  conclusion: string
  limitations?: string[]
  githubUrl?: string
}

// --- Project data registry ---
const projectDetails: Record<string, ProjectData> = {
  'repeat-purchase-paradox': {
    title: 'Repeat Purchase Paradox: Finding High-Value Customers in Declining Revenue',
    category: 'Analysis',
    heroImage: '/project1/viz_1.png',
    overview:
      'Analyzed 993 orders from 616 unique customers of an Australian e-commerce fashion business (Shirt, Jacket, Trousers) across January–October 2021. Discovered that while customer acquisition appeared healthy, the real story lay beneath the surface: average customers only transacted 1.6 times, and monthly revenue was steadily declining in the second half of the year. signaling a critical retention problem hidden behind seemingly good total order numbers.',
    problem:
      'The company lacked visibility into who their truly valuable customers were (loyal, repeat buyers) versus one-time buyers. Without this segmentation, retention and loyalty budgets risked being spread evenly across all customers, instead of being focused on the segments with the highest revenue impact. Raw data was scattered across 4 separate tables (customers, orders, products, sales), each carrying real-world data quality issues: duplicate rows, missing values in gender and total_price, inaccurate age values, and date columns stored as text instead of datetime.',
    approach: [
      'Cleaned and preprocessed data across 4 tables: imputed missing gender values as "Prefer not to say", reconstructed missing total_price from price_per_unit × quantity, corrected inaccurate age outliers, and deduplicated all tables before merging',
      'Engineered derived features: delivery_time (order-to-shipping gap), customer status (Active/Non Active based on order history), and age_group segmentation (Youth/Adults/Seniors)',
      'Merged all 4 cleaned tables into a single master analysis table',
      'Conducted Exploratory Data Analysis targeting 4 key business questions: repeat buyer revenue contribution, revenue trend analysis, product portfolio performance, and demographic breakdown',
      'Applied RFM Analysis (Recency, Frequency, Monetary) to identify and rank the highest-value customer segments for targeted retention strategies',
    ],
    techStack: [
      { name: 'Python', role: 'Primary analysis language' },
      { name: 'Pandas', role: 'Data wrangling & feature engineering' },
      { name: 'NumPy', role: 'Numerical computation' },
      { name: 'Matplotlib', role: 'Data visualization' },
      { name: 'Seaborn', role: 'Statistical visualization & storytelling' },
    ],
    keyFindings: [
      { stat: '58.1%', label: 'One-time buyers' },
      { stat: '63.3%', label: 'Revenue from repeat buyers' },
      { stat: '527', label: 'Denim units sold (top product)' },
      { stat: '75%', label: 'Gender data unreliable' },
    ],
    insights: [
      {
        title: 'Repeat Buyers are the Minority, But the Revenue Engine',
        description: '58.1% (358 of 616) customers only transacted once. Yet repeat buyers contributed 63.3% of total revenue. The most loyal segment (frequency ≥4, only 3.1% of customers) alone contributed 8.4% of revenue. proving that retention, not just acquisition, is the more efficient revenue lever.',
      },
      {
        title: 'Revenue Declining in H2',
        description: 'Monthly revenue peaked in March (Rp131,364, 117 orders) then steadily weakened to its lowest point in October (Rp84,266, 80 orders). This pattern directly aligns with the repeat buyer insight. without a retention mechanism, early-year acquisition momentum naturally deflates over time.',
      },
      {
        title: 'Denim Dominates, Mandarin Collar Struggles',
        description: 'While all three product categories (Jacket, Trousers, Shirt) contributed relatively evenly to revenue (~Rp333–357K each), Denim sold 527 units. nearly double the second-best product (Joggers, 334 units). Meanwhile, Mandarin Collar (236 units) and Dress (243 units) are candidates for strategic evaluation.',
      },
      {
        title: 'Adults Dominate, Gender Data is Unreliable',
        description: 'The Adults age segment dominates transaction volume across all product categories. However, 75% of customers (461 of 616) selected "Prefer not to say" for gender, making gender-based insights unreliable for business decisions. a data limitation that must be acknowledged, not forced into conclusions.',
      },
    ],
    visualizations: [
      { image: '/project1/viz_1.png', caption: 'Monthly revenue trend showing peak in March and steady decline through October 2021' },
      { image: '/project1/viz_2.png', caption: 'Best vs. worst performing products. Denim leads at 527 units, Mandarin Collar trails' },
      { image: '/project1/viz_6.png', caption: 'Top RFM customers by Recency, Frequency, and Monetary value' },
      { image: '/project1/viz_4.png', caption: 'Customer distribution by age group. Adults segment dominates' },
      { image: '/project1/viz_5.png', caption: 'Customer distribution by Australian state' },
    ],
    results: [
      'Focus retention programs (email re-engagement, loyalty points, personalized offers) on top-RFM customers (frequency ≥4, e.g., customer_id 571, 282, 664) rather than spreading marketing budget evenly.',
      'Strengthen stock availability and cross-promotions for Denim while re-evaluating strategy for underperforming products (Mandarin Collar, Dress).',
      'The analysis proved quantitatively that shifting focus from pure acquisition to high-value retention could reverse the revenue decline trend.',
    ],
    conclusion:
      'Retaining existing customers is far more cost-efficient than acquiring new ones to replace those who leave. This project demonstrated that surface-level metrics (total orders) can mask critical retention problems. The key takeaway: always segment before strategizing. the average hides the truth.',
    limitations: [
      'Gender data is dominated by "Prefer not to say" (75%), making gender-based analysis unreliable for business decisions.',
      'Data covers only 1 country (Australia) and 10 months (2021), so long-term seasonal patterns cannot be conclusively determined.',
    ],
    githubUrl: 'https://github.com/Daaffaaisa/Store-Performance-Analysis-Using-Multiple-DataSets'
  },
  'bike-sharing-demand': {
    title: 'Bike Sharing Demand Analysis: Weather, Seasons & User Behavior',
    category: 'Analysis',
    heroImage: '/project2/dashboard.png',
    overview:
      'Analyzed 731 days of Capital Bikeshare rental data (2011–2012) covering 3.29 million total transactions to understand what drives daily demand. Uncovered that weather conditions can swing demand by up to 63%, that the business grew 64.9% year-over-year with genuine trend growth (not just seasonal), and that casual vs. registered users behave in fundamentally opposite patterns across workdays and weekends.',
    problem:
      'Capital Bikeshare serves two user types. casual (one-time renters) and registered (members). across a business highly dependent on external factors like weather, season, and calendar. Without data-driven understanding of which factors most influence demand, the company risked inefficient fleet allocation, missed growth opportunities, and one-size-fits-all marketing that ignores the different behaviors of their two user segments.',
    approach: [
      'Validated data quality: confirmed 0 missing values and 0 duplicates across 16 columns and 731 rows, shifting focus to enrichment rather than repair',
      'Converted date column to datetime format and mapped numeric codes (season 1–4, weathersit 1–3, workingday 0–1) to descriptive labels for interpretable analysis',
      'Standardized numerical features (cnt, temp, hum, windspeed) using StandardScaler for K-Means clustering, as original scales varied dramatically',
      'Performed time series decomposition (trend, seasonal, residual) to separate genuine growth from seasonal fluctuation',
      'Applied K-Means clustering (k=3 via elbow method) to segment days into demand profiles based on weather and rental volume',
      'Compared casual vs. registered user behavior across workdays and weekends using grouped aggregation and visualization',
    ],
    techStack: [
      { name: 'Python', role: 'Primary analysis language' },
      { name: 'Pandas', role: 'Data wrangling & aggregation' },
      { name: 'Seaborn / Matplotlib', role: 'Statistical visualization & storytelling' },
      { name: 'Scikit-learn', role: 'K-Means clustering & StandardScaler' },
      { name: 'Statsmodels', role: 'Time series decomposition' },
      { name: 'Streamlit', role: 'Interactive dashboard deployment' },
    ],
    keyFindings: [
      { stat: '64.9%', label: 'Year-over-year growth' },
      { stat: '63%', label: 'Demand drop in bad weather' },
      { stat: '3.29M', label: 'Total transactions analyzed' },
      { stat: '3', label: 'Demand segments discovered' },
    ],
    insights: [
      {
        title: 'Genuine Growth, Not Just Seasonal Cycles',
        description: 'Total rentals grew from 1.24M (2011) to 2.05M (2012). a 64.9% increase. Time series decomposition confirmed a consistently rising trend component, separate from seasonal patterns. This is real demand growth that can be capitalized through capacity expansion.',
      },
      {
        title: 'Weather is the Strongest Demand Lever',
        description: 'Temperature correlates positively with rentals (+0.63), while wind speed and humidity correlate negatively. Rain/light snow drops average daily rentals by ~63% compared to clear weather (1,803 vs 4,877 rentals/day). a direct operational signal for dynamic fleet allocation.',
      },
      {
        title: 'Three Natural Demand Segments Emerge',
        description: 'K-Means clustering revealed: "Busy" days (warm, moderate humidity → avg 5,982 rentals), "Moderate" days (cold, windy → 3,341/day), and "Quiet" days (highest humidity → 3,113/day). Warm temperature + low humidity is the optimal demand condition.',
      },
      {
        title: 'Casual and Registered Users are Opposites',
        description: 'On workdays, registered users dominate (3,978 vs 607 casual/day). a commuting pattern. On weekends, casual users surge 2x (1,371/day) while registered slightly decline. a recreational shift. These two segments need completely different strategies.',
      },
    ],
    visualizations: [
      { image: '/project2/dashboard.png', caption: 'Interactive Streamlit dashboard showing seasonal peaks and casual vs. registered comparison' },
      { image: '/project2/viz_1.png', caption: 'Seasonal distribution of bike rentals. Season 3 (summer/fall) leads in demand' },
      { image: '/project2/viz_2.png', caption: 'Top rental days comparison between casual (general) and registered (member) users' },
    ],
    results: [
      'Dynamic fleet allocation based on weather forecasts to reduce idle costs by up to 63% on bad-weather days.',
      'Split marketing strategy: retention programs for registered users on workdays, acquisition campaigns for casual users on weekends.',
      'Capacity expansion planning based on the confirmed 64.9% growth trend, prioritizing summer-fall peak periods.',
      'Operational planning using the 3 demand segments: schedule maintenance on "Quiet" days, maximize availability on "Busy" days.',
    ],
    conclusion:
      'The most valuable insight was not any single number, but the realization that "average demand" is a misleading metric for this business. Demand is shaped by a specific combination of weather, calendar, and user type. and each combination requires a different operational response. Segmentation before strategy is not optional; it is the strategy.',
    limitations: [
      'Only 2 years of data (24 monthly points). time series decomposition is indicative, not statistically robust. Ideally need 3+ years.',
      'Daily granularity only (day.csv). cannot analyze hourly commuting patterns. "Commuting" interpretation is inferred from workday vs. weekend, not directly observed.',
      'K-Means segmentation depends on feature selection and k=3 choice. Different features or k values may yield different clusters.',
      'No individual user-level data. RFM analysis impossible. Casual vs. registered insights are aggregate trends only.',
      'External factors not included: special events, pricing changes, or marketing campaigns that may also influence demand.',
    ],
    githubUrl: 'https://github.com/Daaffaaisa/Bicycle-Rental-Activity-Analysis'
  },
  'water-quality-hypoxia': {
    title: 'When Water Warms, Oxygen Vanishes: Predicting Hypoxia Risk from Temperature & Seasonal Patterns',
    category: 'ML',
    heroImage: '/project3/viz_5.png',
    overview:
      'Built a machine learning classification model to predict hypoxia risk (Safe vs At-Risk) in estuary waters using 31 years of water quality monitoring data (1989–2019) across 5 monitoring stations. The core challenge: Dissolved Oxygen. the most critical parameter for detecting hypoxia. was missing in 35.9% of observations. The model enables risk estimation even when direct DO measurements are unavailable, using more consistently measured parameters like water temperature, depth, clarity, and season.',
    problem:
      'Dissolved Oxygen is the single most critical parameter for detecting hypoxia (oxygen-depleted water that kills aquatic life), yet it was the most inconsistently measured variable. missing in 35.9% of all observations, far above any other parameter. This created a dangerous blind spot: at the times and locations where DO was not measured, there was no way to know if conditions were safe or dangerous. Ironically, the highest-risk periods (summer months with warm water temperatures) were also the periods with the most missing DO data.',
    approach: [
      'Made the deliberate decision NOT to impute the target variable (DO). rows without DO were excluded from modeling to preserve label integrity, accepting smaller data size (1,519 rows) as a trade-off for reliable labels',
      'Applied skewness-based imputation strategy for features: median for highly skewed columns (Salinity skewness=1.97, Secchi Depth skewness=7.06), mean for symmetric columns (pH, Water Temp, Air Temp, Water Depth)',
      'Cleaned data quality issues: standardized Site_Id casing, fixed corrupted column names from encoding issues, dropped duplicate columns with 96% missing data, removed 5 rows with anomalous year 1899',
      'Engineered temporal features: Month and Season from Read_Date to capture cyclical hypoxia risk patterns. Created binary target Risiko_Hipoksia using 5 mg/L threshold (standard aquatic life support limit)',
      'Compared Logistic Regression vs Random Forest Classifier using StratifiedKFold cross-validation. Selected Random Forest based on superior ROC-AUC (0.84)',
      'Evaluated model using confusion matrix, ROC curve, and feature importance analysis to translate model results into actionable monitoring recommendations',
    ],
    techStack: [
      { name: 'Python', role: 'Primary analysis language' },
      { name: 'Pandas / NumPy', role: 'Data wrangling & feature engineering' },
      { name: 'Matplotlib / Seaborn', role: 'EDA & visualization storytelling' },
      { name: 'Scikit-learn', role: 'Random Forest, Logistic Regression, StandardScaler, evaluation metrics' },
      { name: 'Jupyter Notebook', role: 'Exploration & modeling environment' },
    ],
    keyFindings: [
      { stat: '0.84', label: 'ROC-AUC score' },
      { stat: '26.9%', label: 'Observations at hypoxia risk' },
      { stat: '28.5%', label: 'Water temp feature importance' },
      { stat: '31yr', label: 'Monitoring data span' },
    ],
    insights: [
      {
        title: 'Hypoxia is Not Rare. Over a Quarter of Observations are At-Risk',
        description: 'Of 1,519 observations with valid DO data, 26.9% (409 rows) showed oxygen levels below the safe threshold (5 mg/L). More than one in four measurements indicated dangerous conditions. reinforcing the urgency for proactive, not reactive, monitoring.',
      },
      {
        title: 'Water Temperature is the Single Strongest Predictor',
        description: 'Water temperature contributed 28.5% to model predictions. the highest of any feature. Its negative correlation with DO (-0.51) was validated by the model. Peak summer temperatures create the highest hypoxia risk windows, yet historically these are also when DO data is most often missing.',
      },
      {
        title: 'Freshwater Zones Have Dangerously Thin Oxygen Margins',
        description: '60.7% of readings showed 0 ppt salinity (freshwater/tidal zones). Average DO in these zones was 5.88 mg/L vs 7.58 mg/L in saline zones. critically close to the 5 mg/L danger threshold, making freshwater monitoring stations structurally more vulnerable.',
      },
      {
        title: 'When You Measure Matters More Than Where',
        description: 'Season/month contributed 15.9% to predictions, while all location features combined only contributed ~11.2%. Hypoxia risk is relatively uniform across sites but highly uneven across time. monitoring schedules should be seasonal, not uniform year-round.',
      },
    ],
    visualizations: [
      { image: '/project3/viz_5.png', caption: 'Correlation heatmap showing water temperature as the strongest negative correlator with Dissolved Oxygen (-0.50)' },
      { image: '/project3/viz_4.png', caption: 'DO levels per monitoring site (boxplot) and DO vs Water Temperature scatter with 5 mg/L hypoxia threshold' },
      { image: '/project3/viz_7.png', caption: 'Confusion matrix and ROC curve (AUC=0.828) for the Random Forest classifier' },
      { image: '/project3/viz_8.png', caption: 'Feature importance. Water Temperature dominates at 28.5%, followed by Month (15.9%) and Water Depth (12.8%)' },
    ],
    results: [
      'Prioritize DO measurement completeness during peak summer months. Close the blind spot exactly when risk is highest.',
      'Install real-time DO sensors at freshwater monitoring stations where oxygen margins are thinnest.',
      'Use the model to retroactively estimate risk for the 35.9% of historical data missing DO measurements, eliminating blind spots in the monitoring program\'s risk map.',
      'Lower the model\'s decision threshold to increase recall on the "At-Risk" class, accepting more false alarms since the cost of missing a real hypoxia event far outweighs the cost of false caution.',
    ],
    conclusion:
      'The most important decision in this project was what NOT to do: not imputing the target variable. Filling 35.9% of labels with statistical estimates would have created a model that learns to mimic its own imputation patterns rather than real-world risk. Sometimes the most rigorous analytical choice is to accept less data in exchange for more trustworthy answers.',
    limitations: [
      'Geographic source and coverage of the dataset are not officially confirmed. business context is inferred from data patterns consistent with volunteer-based water monitoring programs.',
      'The 5 mg/L hypoxia threshold is a general standard, not validated against the specific environmental regulations of this watershed.',
      'Model recall on the "At-Risk" class is 0.55. approximately 45% of true risk cases are still missed. The model is best positioned as a screening tool, not a replacement for direct measurement.',
      'Time-series autocorrelation (sequential measurements at the same site) is not yet modeled, potentially missing gradually developing risk patterns.',
    ],
    githubUrl: 'https://github.com/Daaffaaisa/Water-Quality-Prediction-Using-Machine-Learning'
  },
  'heart-attack-risk': {
    title: 'Silent Signals: Troponin & CK-MB Proven as the Strongest Heart Attack Risk Markers',
    category: 'ML',
    heroImage: '/project4/viz_11.png',
    overview:
      'Built a classification model to predict heart attack risk from clinical data of 1,319 patients (age 14–103), with a deliberate focus on minimizing false negatives. because in a medical context, missing a high-risk patient is far more costly than a false alarm. The tuned Random Forest model achieved 98.77% recall and 99.25% ROC-AUC, while revealing that cardiac biomarkers (Troponin and CK-MB) are dramatically more predictive than vital signs like blood pressure or pulse rate.',
    problem:
      'In emergency rooms, triage decisions for cardiac patients must be made quickly, but complete lab results (especially biomarkers like Troponin) can take time. The critical business question: which clinical features are actually most reliable for distinguishing high-risk patients, and can a machine learning model assist initial screening so medical staff can prioritize patients more accurately. without letting truly at-risk patients slip through?',
    approach: [
      'Identified and treated 3 rows with impulse=1111 (physiologically impossible heart rate) as data entry errors. imputed with median (74.0) instead of dropping to preserve other valid patient data',
      'Applied IQR capping for clinically plausible outliers (extreme blood pressure, CK-MB values). retained signal variation instead of deleting, since extreme values in medical data are often the most informative',
      'Critically ensured all fitting (outlier bounds, scaling, feature selection) was computed only on training data and applied to test data. preventing data leakage that would inflate evaluation metrics',
      'Conducted independent t-tests on all numerical features to statistically validate which features genuinely differ between positive and negative classes',
      'Selected top 5 features via SelectKBest (F-statistic): Troponin (386.96), CK-MB (172.13), Age (64.07), Gender (8.60), Glucose (5.28)',
      'Compared Random Forest, SVM, and KNN using Pipeline + GridSearchCV with StratifiedKFold, optimizing for recall to minimize false negatives',
    ],
    techStack: [
      { name: 'Python', role: 'Primary analysis language' },
      { name: 'Pandas / NumPy', role: 'Data wrangling & statistical analysis' },
      { name: 'Scikit-learn', role: 'Pipeline, GridSearchCV, Random Forest, SVM, KNN, evaluation' },
      { name: 'SciPy', role: 'Independent t-test for feature significance' },
      { name: 'Matplotlib / Seaborn', role: 'EDA & evaluation visualization' },
    ],
    keyFindings: [
      { stat: '98.8%', label: 'Recall (sensitivity)' },
      { stat: '99.2%', label: 'ROC-AUC score' },
      { stat: '386.9', label: 'Troponin F-score (top feature)' },
      { stat: '1,319', label: 'Patients analyzed' },
    ],
    insights: [
      {
        title: 'Troponin and CK-MB Dominate. Not Blood Pressure or Pulse',
        description: 'Independent t-tests showed only three features with statistically significant differences between classes: Troponin (mean 0.57 positive vs 0.03 negative, p<0.001), CK-MB (23.27 vs 2.56, p<0.001), and Age (58.8 vs 52.1, p<0.001). Blood pressure and pulse rate. intuitively associated with heart risk. showed no significant difference (p=0.450 and p=0.807 respectively).',
      },
      {
        title: 'Cardiac Biomarkers Beat Vital Signs by Orders of Magnitude',
        description: 'Feature importance scores confirmed the hierarchy: Troponin (386.96) and CK-MB (172.13) dwarfed all other features. The enzyme biomarkers are far more discriminative than basic vital signs. a counter-intuitive finding for non-specialists who assume high blood pressure equals heart attack risk.',
      },
      {
        title: 'Age is a Consistent, Cheap Risk Signal',
        description: 'A 6.7-year average age difference between positive and negative classes, with an extremely small p-value (1.86×10⁻¹⁸), confirms age as a strong and consistent risk factor. Unlike lab biomarkers, age is immediately available at triage with zero cost.',
      },
      {
        title: 'Random Forest Dominates All Three Models',
        description: 'After GridSearchCV tuning optimized for recall: Random Forest achieved 98.77% recall and 99.25% AUC, outperforming SVM (93.8% recall, 98.1% AUC) and KNN (90.1% recall, 95.7% AUC). Only 2 out of 162 positive test cases were missed.',
      },
    ],
    visualizations: [
      { image: '/project4/viz_11.png', caption: 'ROC curves comparing all three models. Random Forest (AUC=0.992) leads, followed by SVM (0.981) and KNN (0.957)' },
      { image: '/project4/viz_5.png', caption: 'Troponin distribution by class (log scale). dramatic separation between positive and negative patients' },
      { image: '/project4/viz_4.png', caption: 'Correlation heatmap. Troponin and CK-MB show strongest positive correlation with heart attack class' },
      { image: '/project4/viz_10.png', caption: 'Model performance comparison. Random Forest dominates across all metrics (accuracy, precision, recall, F1, AUC)' },
    ],
    results: [
      'Prioritize Troponin and CK-MB lab processing for cardiac-symptom patients. These biomarkers are proven the strongest signals, far above routine vitals.',
      'Deploy the model as an initial screening aid (not a replacement for clinical diagnosis) to help triage staff prioritize patients when full lab results are pending.',
      'Weight patient age more heavily in initial triage, especially for patients above ~59 years, as a low-cost supplementary risk signal.',
    ],
    conclusion:
      'The most surprising finding was what did NOT matter: blood pressure and pulse rate. the metrics most people associate with heart risk. turned out to be statistically useless for classification in this dataset. The silent biomarkers (Troponin, CK-MB) that patients cannot feel are the ones that actually predict risk. Sometimes the most important signals are the ones you cannot observe without looking deeper.',
    limitations: [
      'Data source and patient population are not explicitly documented. model generalization to other hospitals or demographics requires external validation.',
      'Only 8 basic clinical features available. Important risk factors (cholesterol, ECG, family history, lifestyle) are absent and could improve model performance.',
      'The impulse=1111 anomaly was resolved via median imputation. a reasonable but still estimated approach for 3 affected rows.',
      'Model has not been externally validated on data from different sources or time periods.',
    ],
    githubUrl: 'https://github.com/Daaffaaisa/Heart-Attack-Classification'
  },
  'netflix-content-strategy': {
    title: 'Market Gaps & Localization: Optimizing Netflix Global Content Strategy in a Saturated Market',
    category: 'Dashboard',
    heroImage: '/project5/dashboard.png',
    overview:
      'Analyzed Netflix content performance across genres, durations, and global markets to answer three strategic questions: where are the underserved genre niches with high demand but low supply, does long-form content really fail in the age of short attention spans, and which countries deliver the best quality-to-quantity ratio for local content investment. Built an interactive Power BI dashboard with Netflix corporate identity for executive-level decision making.',
    problem:
      'Netflix\'s domestic streaming market has reached saturation. To reduce churn and secure global growth, the platform allocates billions for local content and new categories. But this massive investment risks becoming waste if production decisions rely on surface-level trends or assumptions. Three specific challenges: difficulty identifying profitable niches with low supply, confusion about ideal content duration due to "short attention span" myths, and the need to map which countries deliver the best quality return on local content funding.',
    approach: [
      'Resolved data corruption (Mojibake) on international actor/director names by forcing UTF-8 encoding ingestion in Excel, not just text formulas',
      'Fixed phantom number formats (e.g., 25.00.00) and cleaned them for Integer casting',
      'Migrated from Excel to PostgreSQL for relational modeling. used STRING_TO_ARRAY + UNNEST to explode multi-valued genre and country columns into separate rows, ensuring each film with 3 genres is fairly counted in all 3 categories',
      'Conducted EDA via SQL aggregation to identify market gaps (high-demand, low-supply genres), duration performance patterns, and country-level content efficiency',
      'Designed Power BI dashboard using Business-First approach: Netflix Dark Mode with red accents, F-Pattern layout for executive scanning, scatter plot for market gap quadrants, dual-axis charts for scale-mismatched metrics, and interactive tooltips to keep the canvas clean',
    ],
    techStack: [
      { name: 'Excel', role: 'Text cleaning, encoding fix (Mojibake), anomaly validation' },
      { name: 'PostgreSQL', role: 'Relational modeling, UNNEST, EDA aggregation' },
      { name: 'Power BI', role: 'Interactive dashboard, F-Pattern UI/UX, dual-axis charts' },
    ],
    keyFindings: [
      { stat: '7.26', label: 'Film-Noir avg rating (hidden gem)' },
      { stat: '49K', label: 'Avg votes for long-form (>2hr)' },
      { stat: '7.10', label: 'UK avg rating (top globally)' },
      { stat: '138', label: 'Total content analyzed' },
    ],
    insights: [
      {
        title: 'Film-Noir is a Hidden Market Gap. News is Just Noise',
        description: 'Film-Noir has only 5 titles on the platform, yet averages 7.26 rating and a massive 187,894 total votes (~37,500 votes/title). Meanwhile, "News". which appears to have the highest rating (8.40). is statistical noise: only 2 titles with 482 total votes. The scatter plot quadrant analysis instantly separates real demand from data anomalies.',
      },
      {
        title: 'The "Short Attention Span" Myth is Dead',
        description: 'Long-form content (>2 hours) not only maintains competitive satisfaction ratings but dominates engagement, averaging 49,038 votes per title. the highest of any duration category. The assumption that modern audiences reject long content is empirically false in this dataset.',
      },
      {
        title: 'United Kingdom: Maximum Quality from Minimum Volume',
        description: 'Among non-US content producers, UK is the most efficient market. With only 30 productions, it achieves the highest average global rating (7.10), outperforming countries with much larger production volumes. Quality over quantity, proven by data.',
      },
    ],
    visualizations: [
      { image: '/project5/dashboard.png', caption: 'Netflix Content Strategy & Performance Dashboard. Market gap scatter plot, duration distribution with dual-axis, and global engagement efficiency map' },
    ],
    results: [
      'Redirect investment from saturated genres toward funding original long-form productions and acquiring independent Film-Noir licenses, securing a niche audience with minimal competition.',
      'Prioritize UK-based creators and local studios as the top target for expansion funding based on proven quality-to-volume efficiency.',
      'These moves optimize Capital Expenditure ROI by concentrating spend in high-efficiency markets while reducing churn through premium quality content.',
    ],
    conclusion:
      'The most counterintuitive finding was that the conventional wisdom about content strategy. short is better, popular genres are safest. was exactly wrong. The real opportunities lie in the overlooked corners: classic niches that nobody is serving, long formats that everybody assumes are dead, and small markets that quietly outperform the giants. Sometimes the best strategy is to look where everyone else isn\'t.',
    limitations: [
      'Engagement metrics use cumulative vote counts and ratings as proxies. not internal Netflix watch time or completion rate data, which would be more accurate for content performance evaluation.',
      'Using median/average aggregation is vulnerable to bias if mega-hit content enters the dataset and skews distributions anomalously.',
    ],
    githubUrl: 'https://github.com/Daaffaaisa/Netflix-Performance-Analysis'
  },
  'ambitionbox-culture': {
    title: 'The Hidden Cost of Over-Expansion: Debunking Startup Culture Myths with 9,900+ Company Reviews',
    category: 'Dashboard',
    heroImage: '/project6/dashboard.png',
    overview:
      'Analyzed employee sentiment data from 9,900+ global companies on AmbitionBox to bust three pervasive corporate myths: that startup culture is inherently better, that company size kills satisfaction, and that aggressive branch expansion signals success. Built a Power BI dashboard that reveals Legacy companies (>50 years) lead satisfaction at 4.03, while startups (<10 years) struggle at 3.71, and that Mumbai\'s hyper-expansion (34,590+ branches) actually depresses employee satisfaction compared to Chennai\'s controlled growth.',
    problem:
      'Many executives and HR teams still make strategic decisions based on untested myths. like assuming startup culture is healthier than established companies, or that massive branch expansion proves success. Decisions built purely on these assumptions risk triggering employee turnover spikes and destroying work culture from within. The challenge: transform messy web-scraped data with structural anomalies into actionable, myth-busting insights.',
    approach: [
      'Tackled the hardest data quality issue first: Dynamic Column Shifting. location text like "Slovak Republic + 5 more" overflowed into adjacent columns, causing a domino effect where numeric columns shifted randomly. Standard Pandas shift functions failed because the pattern was irregular per row',
      'Built a custom Keyword-Based Extraction pipeline using Regex to pull displaced data back to correct columns by searching for keywords like "employees" and "years", not counting column offsets',
      'Engineered new features: hq_main (HQ city/country) and hq_branches (branch count as Nullable Integer) from dirty compound text. Categorized company_generation: Legacy (>50yr), Established (10-50yr), Agile/Startup (<10yr)',
      'Cleaned all noise text ("k", "years old", "+") and converted to Int64 for proper SQL aggregation',
      'Migrated to PostgreSQL for relational aggregation and EDA across 4 business questions',
      'Designed Power BI dashboard with F-Pattern layout, DAX Auto-Formatting Bypass to prevent Power BI from rounding 9,959 to "10K". preserving executive-level numeric precision',
    ],
    techStack: [
      { name: 'Python (Pandas)', role: 'Data wrangling, Regex extraction, feature engineering' },
      { name: 'PostgreSQL', role: 'Relational aggregation & EDA queries' },
      { name: 'Power BI', role: 'Interactive dashboard, F-Pattern UI, DAX measures' },
    ],
    keyFindings: [
      { stat: '9,959', label: 'Companies analyzed' },
      { stat: '4.03', label: 'Legacy company satisfaction' },
      { stat: '3.71', label: 'Startup satisfaction (lowest)' },
      { stat: '140K', label: 'Total global branches mapped' },
    ],
    insights: [
      {
        title: 'The "Scale vs Culture" Paradox. Giants Win',
        description: 'Giant companies (>6,000 employees) lead employee satisfaction at 4.02. Meanwhile, small companies (3,097 of them. the largest segment) score lowest at 3.75. The assumption that big companies have rigid bureaucracy that drives people away is empirically false in this dataset.',
      },
      {
        title: 'Legacy Wins, Startup Agility Struggles',
        description: 'The narrative that "working at a new startup is more comfortable" is a myth. Legacy companies (>50 years old) hold the highest satisfaction at 4.03, while startups (<10 years) sit at the bottom at 3.71. still in a transitional phase searching for their ideal work culture.',
      },
      {
        title: 'Public Company Employees are 2x More Vocal',
        description: 'Among underperforming companies (rating <4.0), public company employees have 8% review participation vs 4% for private companies. 2x more vocal. This suggests private company employees may be bound by NDAs or operate in a culture of silence.',
      },
      {
        title: 'The Cost of Over-Expansion: Mumbai vs Chennai',
        description: 'Mumbai dominates global expansion with 34,590+ branches but its satisfaction drops to a mediocre 3.84. Chennai, with more controlled growth (6,945 branches), maintains healthier satisfaction at 3.87. Aggressive expansion without cultural infrastructure has a measurable cost.',
      },
    ],
    visualizations: [
      { image: '/project6/dashboard.png', caption: 'Corporate Rating Analysis Dashboard. Scale vs Culture, Generation Comparison, Public/Private Polarization, and Global HQ Expansion Map with 140K+ branches' },
    ],
    results: [
      'If targeting hyper-growth or global branch expansion, benchmark your employment framework (SOPs, culture standards) against Legacy veteran companies, not startup culture, which is empirically proven to be unstable.',
      'This controls HRD budget efficiency by enabling expansion without triggering recruitment cost spikes from turnover caused by culture collapse from over-expansion.',
    ],
    conclusion:
      'The biggest misconception in modern corporate strategy is equating youth with innovation and age with stagnation. The data tells the opposite story: the oldest companies have the most satisfied employees, the largest companies beat the small ones, and uncontrolled expansion destroys the very culture it claims to spread. Stability is not the enemy of growth. it is its prerequisite.',
    limitations: [
      'AmbitionBox review data represents self-reported employee sentiment. subject to selection bias (employees with strong opinions are more likely to review).',
      'Web-scraped data required extensive structural repair. while the pipeline was thorough, some edge cases in column shifting may have been missed.',
    ],
    githubUrl: 'https://github.com/Daaffaaisa/Ambitionbox-Analysis'
  },
  'titanic-leakage': {
    title: 'The Data Leakage Myth: Proving How Preprocessing Order Destroys ML Model Reliability',
    category: 'ML',
    heroImage: '/project7/viz_11.png',
    overview:
      'Designed a controlled 3-scenario experiment using the Titanic dataset (891 passengers) to empirically prove how data leakage. computing preprocessing parameters from the full dataset before splitting. consistently degrades model performance, not inflates it as commonly assumed. Compared Logistic Regression, KNN, and Random Forest across clean pipeline, leaked pipeline, and optimized pipeline architectures, achieving 81.6% best accuracy with proper methodology.',
    problem:
      'When building predictive models, many analysts fall into the data leakage trap: fitting preprocessing steps (scaling, imputation) on the entire dataset before train-test split. The common myth is that this always inflates accuracy artificially. But what actually happens? And how much damage does it cause? This project treats the Titanic survival classification as a controlled experiment to answer these questions empirically, not theoretically.',
    approach: [
      'Applied domain-aware preprocessing: preserved Age outliers (elderly passengers on Titanic are historical facts that may have influenced lifeboat priority) while capping Fare outliers via IQR (extreme VIP prices are pure mathematical noise for distance-based algorithms)',
      'Prevented index leakage by cleaning duplicates independently on train and test sets, ensuring no row indices leak across the split boundary',
      'Experiment 1 (Clean Pipeline): Split first → fit preprocessing only on training data → transform test with training parameters',
      'Experiment 2 (Deliberate Leakage): Fit preprocessing on full dataset before splitting → apply to both train and test. intentionally introducing information leakage',
      'Experiment 3 (Optimized): Clean pipeline + GridSearchCV hyperparameter tuning with StratifiedKFold cross-validation',
      'Compared all 3 experiments across Logistic Regression, KNN, and Random Forest to measure the consistent impact of leakage vs proper methodology',
    ],
    techStack: [
      { name: 'Python', role: 'Primary analysis language' },
      { name: 'Pandas / NumPy', role: 'Data wrangling, domain-aware imputation & outlier handling' },
      { name: 'Scikit-learn', role: 'Pipeline, GridSearchCV, Logistic Regression, KNN, Random Forest' },
      { name: 'Matplotlib / Seaborn', role: 'Comparative bar charts & confusion matrix heatmaps' },
    ],
    keyFindings: [
      { stat: '81.6%', label: 'Best accuracy (KNN optimized)' },
      { stat: '3', label: 'Experimental scenarios tested' },
      { stat: '94', label: 'Correct non-survivor predictions' },
      { stat: '891', label: 'Passengers analyzed' },
    ],
    insights: [
      {
        title: 'The Data Leakage Myth. It Doesn\'t Always Inflate Accuracy',
        description: 'The common assumption is that leakage always makes models look better than they are. The experiment proved the opposite: leakage distorted the training data distribution, causing all three algorithms to consistently perform WORSE (Exp 2 vs Exp 1). Logistic Regression dropped from 0.810 to 0.776, KNN from 0.810 to 0.756, Random Forest from 0.805 to 0.795.',
      },
      {
        title: 'KNN is Most Sensitive to Proper Data Scaling',
        description: 'Distance-based algorithms (KNN) benefit the most from clean outlier handling and proper StandardScaler fitting. With a leakage-free pipeline, KNN matched Logistic Regression at 0.810. With optimization (Exp 3), KNN pulled ahead to 0.816. the best of all models and experiments.',
      },
      {
        title: '81% Accuracy Still Means 32 Wrong Predictions',
        description: 'The best model correctly predicted 94 non-survivors and 52 survivors, but still produced 12 "false hope" cases (predicted survived but didn\'t) and 20 missed survivors (predicted died but survived). In maritime safety, each of these errors has life-or-death consequences.',
      },
    ],
    visualizations: [
      { image: '/project7/viz_11.png', caption: 'Comparative bar chart across all 3 experiments. Exp 2 (Leakage) consistently underperforms for every algorithm' },
      { image: '/project7/viz_1.png', caption: 'Feature distribution boxplots. Age, Fare, Pclass, SibSp, Parch showing outlier patterns before treatment' },
    ],
    results: [
      'Always implement strict Pipeline architecture: fit preprocessing exclusively on training data, then transform test data with training parameters, before attempting any hyperparameter optimization.',
      'This prevents deploying "defective" models that look promising in experiments but fail to classify real-world cases with precision.',
      'The cost of a leaked pipeline is not just lower accuracy; it is false confidence in a model that was never tested fairly.',
    ],
    conclusion:
      'The most important lesson from this project is not about the Titanic. it is about methodology. Data leakage is not a theoretical risk that "might" happen. It is a measurable, reproducible phenomenon that consistently degrades model performance. The difference between a reliable model and a "defective" one is not the algorithm. it is the order of operations.',
    limitations: [
      'The best model still has an 18% error rate (12 False Positives + 20 False Negatives). Conventional ML algorithms on limited-feature datasets have a performance ceiling that may require advanced feature engineering or deep learning to break through.',
    ],
    githubUrl: 'https://github.com/Daaffaaisa/Titanic-Victim-Predictions'
  },
  'stroke-risk-posbindu': {
    title: 'Shattering the Accuracy Illusion: Rescuing At-Risk Stroke Patients from Imbalanced Health Data',
    category: 'ML',
    heroImage: '/project8/viz_3.png',
    overview:
      'Developed a leakage-proof ML pipeline for Posbindu PTM (community health screening) to predict stroke risk from 10,000 patient records. Exposed the "ROC Illusion". where all models appear near-perfect on ROC curves (AUC >0.83) but PR curves reveal the real story (PR-AUC ~0.71). Designed a dynamic threshold system (0.35 for mass screening, 0.60 for resource-limited settings) and used SHAP game theory for medical-grade model explainability.',
    problem:
      'Community health centers (Puskesmas) in Semarang struggle with delayed stroke referrals because medical staff are overwhelmed manually triaging high-risk patients in long queues. Building an automated prediction system faces a critical challenge: stroke patients are a severe minority (29.78% vs 70.22%). If the system chases standard "accuracy", it will send genuinely at-risk patients home. a missed diagnosis with life-threatening consequences.',
    approach: [
      'Designed an "Isolation Vault" architecture: stratified 80:20 split at the very beginning, 20% test data locked and never touched during any preprocessing',
      'Built a sealed ColumnTransformer + ImbPipeline: median imputation (safeguard for missing BMI in real-world deployment), One-Hot Encoding for categorical features, and StandardScaler. all fitted exclusively on training data',
      'Injected SMOTE oversampling inside each Cross-Validation fold (not before split) to prevent synthetic data from leaking into validation sets',
      'Compared 5 models: Logistic Regression, Random Forest, XGBoost, LightGBM, and MLP. all with GridSearchCV hyperparameter tuning',
      'Exposed ROC Illusion by side-by-side comparison: ROC curves show AUC >0.83 (looks great) but PR curves reveal PR-AUC ~0.71 (honest metric for imbalanced data)',
      'Applied SHAP (Game Theory) for model explainability. feature interaction analysis reveals that Hypertension + Heart Disease together create exponential (multiplicative) risk, not just additive',
    ],
    techStack: [
      { name: 'Python', role: 'Primary analysis language' },
      { name: 'Scikit-learn', role: 'ColumnTransformer, GridSearchCV, preprocessing pipeline' },
      { name: 'Imbalanced-Learn', role: 'SMOTE oversampling within ImbPipeline' },
      { name: 'XGBoost / LightGBM', role: 'Gradient boosting classifiers' },
      { name: 'SHAP', role: 'Game-theory model explainability & interaction analysis' },
      { name: 'Matplotlib / Seaborn', role: 'ROC vs PR curve comparison, distribution plots' },
    ],
    keyFindings: [
      { stat: '0.85', label: 'Best ROC-AUC (Logistic Regression)' },
      { stat: '0.72', label: 'Best PR-AUC (honest metric)' },
      { stat: '10K', label: 'Patient records analyzed' },
      { stat: '0.35', label: 'Aggressive screening threshold' },
    ],
    insights: [
      {
        title: 'The ROC Illusion. All Models Look Near-Perfect, But They\'re Not',
        description: 'ROC curves show all 5 models scoring above 0.83 AUC. appearing near-perfect. But PR curves tell the honest story: PR-AUC drops to ~0.71, revealing that detecting the minority stroke class is far harder than the ROC metric suggests. For imbalanced medical data, ROC accuracy is a dangerous illusion.',
      },
      {
        title: 'Age Creates a Domino Effect on Comorbidities',
        description: 'Age has a strong positive correlation with hypertension (0.417) and stroke itself (0.362). SHAP analysis confirms: advanced age is only dangerous when it pushes indicators to the right (positive SHAP values), providing the "why" behind each patient\'s risk label. not just a prediction, but an explanation.',
      },
      {
        title: 'Smoking Stigma Debunked. It\'s Not About Wealth',
        description: 'The assumption that lower socioeconomic status correlates with higher smoking rates is empirically false. Active smoker proportions are virtually identical across all economic classes: High (20.9%), Low (20.0%), Medium (20.8%). Risky lifestyle is driven by individual habit, not financial condition.',
      },
      {
        title: 'Hypertension + Heart Disease = Exponential Risk',
        description: 'SHAP interaction analysis proves that hypertension and heart disease together create multiplicative (exponential) risk. far exceeding the sum of their individual risks. This is a critical finding for triage: patients with both conditions should be flagged immediately, regardless of other factors.',
    },
    ],
    visualizations: [
      { image: '/project8/viz_3.png', caption: 'Side-by-side ROC vs PR curves. exposing the ROC Illusion where all models appear near-perfect on ROC but PR reveals the real performance gap' },
      { image: '/project8/viz_4.png', caption: 'SHAP Summary Plot. Hypertension, Heart Disease, and Age dominate risk predictions with clear directional impact' },
      { image: '/project8/viz_1.png', caption: 'Feature distributions. Age, Average Glucose, and BMI showing the patient population profile' },
    ],
    results: [
      'Use aggressive threshold 0.35 during mass screening to maximize Recall so no at-risk patient is sent home.',
      'Shift to threshold 0.60 when clinic resources are limited to maximize Precision and prevent specialist referral queues from collapsing with false alarms.',
      'This enables Puskesmas to drastically reduce delayed stroke referrals, save regional budget (APBD) from expensive secondary medical interventions, while keeping referral hospital capacity from collapsing.',
    ],
    conclusion:
      'The most dangerous thing in medical ML is not a bad model. it is a good-looking metric on the wrong evaluation framework. ROC-AUC of 0.85 sounds impressive until you realize PR-AUC is 0.71, and the gap between those numbers represents real patients who would be sent home with a false sense of safety. The solution is not better algorithms. it is honest metrics, dynamic thresholds, and human-in-the-loop validation.',
    limitations: [
      'Random Forest achieved the best Recall, but its native TreeExplainer does not support SHAP interaction values. interaction analysis was substituted using XGBoost (the runner-up with highest PR-AUC).',
      'The model includes Socioeconomic Status (SES) as a feature. Using wealth profiles in public health screening systems risks algorithmic bias and service discrimination. human-in-the-loop validation by doctors is mandatory if deployed in the field.',
    ],
    githubUrl: 'https://github.com/Daaffaaisa/Stroke-Risk-Predictions'
  },
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = slug ? projectDetails[slug] : undefined
  const [ready, setReady] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    // Delay mount so content renders below the fold first,
    // allowing whileInView to properly detect entering viewport
    const timer = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(timer)
  }, [slug])

  const goBack = () => {
    navigate('/', { state: { scrollTo: 'projects' } })
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Project not found</p>
          <button onClick={goBack} className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors">
            ← Back to projects
          </button>
        </div>
      </div>
    )
  }

  if (!ready) {
    return <div className="min-h-screen bg-[#0a0a0a]" />
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <GrainOverlay />

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed top-0 left-0 z-50 p-6 md:p-10"
      >
        <button
          onClick={goBack}
          className="text-sm text-white mix-blend-difference hover:opacity-60 transition-all duration-300 flex items-center gap-2 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span>Back</span>
        </button>
      </motion.div>

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-gray-900 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto w-full px-6 md:px-12 pb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xs text-gray-400 tracking-widest uppercase mb-4 block"
            >
              {project.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="font-display text-[7vw] md:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-4xl"
            >
              {project.title.toUpperCase()}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="py-16 md:py-24"
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl text-justify mb-10">
              {project.overview}
            </p>
            
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border border-gray-700 rounded-full text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform duration-300">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View Full Project on GitHub
              </a>
            )}
          </motion.section>

        <div className="h-px bg-gray-800" />

        {/* Problem */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-16 md:py-24"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase mb-6 block">The Problem</span>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-8">CONTEXT</h2>
          <p className="text-gray-400 leading-relaxed max-w-3xl text-justify">
            {project.problem}
          </p>
        </motion.section>

        <div className="h-px bg-gray-800" />

        {/* Approach */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-16 md:py-24"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase mb-6 block">Methodology</span>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-12">APPROACH</h2>
          <div className="space-y-0 max-w-3xl">
            {project.approach.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 group py-5 border-b border-gray-800/50 hover:bg-white/[0.02] transition-colors duration-300 px-3 -mx-3 cursor-default"
              >
                <span className="text-gray-600 font-display text-2xl leading-none mt-0.5 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-justify">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="h-px bg-gray-800" />

        {/* Key Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-16 md:py-24"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase mb-6 block">At a Glance</span>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-12">KEY METRICS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.keyFindings.map((finding, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.2)' }}
                className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-center transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)] cursor-default"
              >
                <p className="font-display text-3xl md:text-4xl text-white mb-2">{finding.stat}</p>
                <p className="text-xs text-gray-500 tracking-wider uppercase">{finding.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="h-px bg-gray-800" />

        {/* Insights */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-16 md:py-24"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase mb-6 block">Findings</span>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-12">INSIGHTS</h2>
          <div className="space-y-12 max-w-3xl">
            {project.insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-gray-600 font-display text-lg mt-0.5 flex-shrink-0 group-hover:text-white transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-gray-200 transition-colors duration-300">
                    {insight.title}
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed pl-10 md:pl-12 text-justify">
                  {insight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="h-px bg-gray-800" />

        {/* Visualizations */}
        {project.visualizations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="py-16 md:py-24"
          >
            <span className="text-xs text-gray-500 tracking-widest uppercase mb-6 block">Visual Evidence</span>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-12">VISUALIZATIONS</h2>
            <div className="space-y-16">
              {project.visualizations.map((viz, i) => (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg border border-gray-800 bg-[#111111] p-4 group-hover:border-white/20 transition-colors duration-300">
                    <img
                      src={viz.image}
                      alt={viz.caption}
                      className="w-full h-auto rounded"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-4 text-sm text-gray-500 italic">
                    {viz.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </motion.section>
        )}

        <div className="h-px bg-gray-800" />

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-16 md:py-24"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase mb-6 block">Tools</span>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-12">TECH STACK</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {project.techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center justify-between border-b border-gray-800 py-5 group hover:bg-white/[0.03] transition-all duration-300 px-4 -mx-4 cursor-default"
              >
                <span className="text-white font-medium group-hover:translate-x-1 transition-transform duration-300">
                  {tech.name}
                </span>
                <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">{tech.role}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="h-px bg-gray-800" />

        {/* Results */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-16 md:py-24"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase mb-6 block">Outcome</span>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-12">RESULTS & RECOMMENDATIONS</h2>
          <div className="space-y-0 max-w-3xl">
            {project.results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-6 group py-5 border-b border-gray-800/50 hover:bg-white/[0.02] transition-colors duration-300 px-3 -mx-3 cursor-default"
              >
                <span className="text-gray-600 font-display text-2xl leading-none mt-0.5 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-justify">
                  {result}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="h-px bg-gray-800" />

        {/* Conclusion */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="py-16 md:py-24"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase mb-6 block">Reflection</span>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-8">TAKEAWAY</h2>
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border-l-2 border-white/20 pl-6 md:pl-8 hover:border-white/40 transition-colors duration-500"
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic max-w-3xl text-justify">
              {project.conclusion}
            </p>
          </motion.blockquote>
        </motion.section>

        {/* Limitations */}
        {project.limitations && project.limitations.length > 0 && (
          <>
            <div className="h-px bg-gray-800" />
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="py-16 md:py-24"
            >
              <span className="text-xs text-gray-500 tracking-widest uppercase mb-6 block">Honesty</span>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-8">LIMITATIONS</h2>
              <div className="space-y-0 max-w-3xl">
                {project.limitations.map((limitation, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-6 group py-5 border-b border-gray-800/50 hover:bg-white/[0.02] transition-colors duration-300 px-3 -mx-3 cursor-default"
                  >
                    <span className="text-gray-600 font-display text-2xl leading-none mt-0.5 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-justify">
                      {limitation}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </>
        )}

        {/* GitHub link + Back */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="py-16 md:py-24 border-t border-gray-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            {project.githubUrl && (
                <a
                  href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 border border-gray-700 px-6 py-3 rounded-full hover:border-white/30 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300 group flex items-center gap-2"
              >
                <span>View on GitHub</span>
                <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
              </a>
            )}
            <button
              onClick={goBack}
              className="text-sm text-gray-500 hover:text-white transition-colors duration-300 group flex items-center gap-2"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span>Back to all projects</span>
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Daffa Kumara. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with React & Tailwind
          </p>
        </footer>
      </div>
    </div>
  )
}
