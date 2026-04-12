# Complete UI Prompt for Stitch / v0.dev / AI UI Generator

## Project Context
Influencer Marketing ROI Prediction Platform - A SaaS tool that uses ML to predict campaign ROI, assess risk, and provide AI-powered business insights.

---

## Page Structure Required

### 1. LANDING PAGE ("Home")
**Purpose**: Convert visitors into users

**Sections Needed**:
- **Navigation Bar**: Logo "InfluenceAI", nav links (Features, Pricing, Case Studies), Login/Get Started buttons. Sticky, glassmorphism effect.
- **Hero Section**: 
  - Headline: "Predict Campaign Success with AI Precision"
  - Subheadline: "Machine learning-powered ROI prediction for influencer marketing. Know your return before you invest."
  - CTA Button: "Start Predicting" (large, gradient)
  - Stats row: "10M+ Data Points | 95% Accuracy | 6 Niche Categories"
  - Background: Subtle animated gradient or particle effect

- **Social Proof**: "Trusted by marketing teams at" + company logos (Velocity, Nexus, Zenith, Aether)

- **Features Grid** (3x2 cards):
  - AI-Powered ROI Prediction
  - Risk Assessment Engine
  - Niche Performance Analytics
  - Real-time Campaign Insights
  - Competitive Benchmarking
  - Automated Business Reports

- **How It Works** (3 steps with icons):
  1. Input Campaign Data
  2. Get ML Predictions
  3. Receive Actionable Insights

- **Testimonials**: 3 testimonial cards with quotes, names, companies

- **CTA Section**: "Ready to optimize your campaigns?" + Start Now button

- **Footer**: Links, social icons, copyright

---

### 2. PREDICTION FORM PAGE ("Predict")
**Purpose**: Input influencer/campaign data

**Layout**: Centered card with dark/light mode support

**Form Fields** (modern inputs with icons):
- Followers Count (number input, icon: users)
- Total Engagement (number input, icon: heart)
- Campaign Budget USD (currency input, icon: dollar-sign)
- Influencer Niche (dropdown: Fashion, Tech, Fitness, Food, Travel, Education)
- Brand Goal (dropdown: Brand Awareness, Community Engagement, Lead Conversion, Direct Sales)

**Visual Elements**:
- Progress bar or step indicator (if multi-step)
- Real-time validation with success/error states
- Loading animation on submit
- Gradient submit button: "Predict Campaign Success"

---

### 3. ANALYTICS DASHBOARD ("Dashboard")
**Purpose**: Display comprehensive prediction results

**Layout**: Full-width dashboard with sidebar navigation

**Left Sidebar**:
- Logo
- Nav: Dashboard, New Prediction, Campaign History, Settings
- User profile card at bottom

**Main Content Area**:

**Top Stats Row** (4 cards):
1. **Expected ROI** - Large percentage display with trend indicator
2. **Conversion Class** - Badge (Low/Medium/High) with color coding
3. **Risk Level** - Gauge or progress bar (0-100) with color gradient (green→red)
4. **Recommended Action** - Text card with action button

**Middle Section** (2 columns):
- **Left**: AI Business Interpretation card (sparkle icon, 2-3 sentences of AI-generated insight)
- **Right**: Niche Comparison chart (bar chart showing user vs. niche average ROI & engagement)

**Metrics Grid** (4 smaller cards):
- Engagement Rate (%)
- Cost Per Engagement ($)
- Engagement-to-Follower Ratio
- Campaign Budget

**Bottom Section**:
- **What-If Simulator**: Slider to adjust engagement/budget and see projected ROI change
- **Export Report** button

---

## Design System Specifications

### Colors:
- **Primary**: #1152d4 (Blue)
- **Primary Light**: #3b82f6
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)
- **Background Light**: #f6f6f8
- **Background Dark**: #101622
- **Card Light**: #ffffff
- **Card Dark**: #1e293b

### Typography:
- Font Family: Inter, sans-serif
- Headlines: Bold, tight tracking
- Body: Regular, comfortable line height
- Stats: Extra bold, large size

### Effects:
- **Glassmorphism**: backdrop-blur, semi-transparent backgrounds
- **Gradients**: Blue-to-purple subtle gradients for hero/CTA
- **Shadows**: Soft shadows on cards (shadow-lg)
- **Hover States**: Scale up slightly, glow effect on primary buttons
- **Border Radius**: rounded-xl (1.5rem) for cards, rounded-lg for buttons

### Animations:
- Page transitions: Fade in with slight Y translate
- Cards: Stagger entrance animation
- Numbers: Count up animation for stats
- Charts: Animate bars on load

### Icons (Lucide):
- users, heart, dollar-sign, target, trending-up, shield-check, sparkles, activity, bar-chart-3, pie-chart, download, arrow-right, check-circle

---

## Responsive Behavior:
- Desktop: Full sidebar + 3-column grids
- Tablet: Collapsible sidebar + 2-column grids
- Mobile: Bottom nav + stacked cards

---

## Additional UI Elements:
- Loading skeletons while fetching data
- Toast notifications for errors/success
- Dark mode toggle in header
- Smooth scroll between sections
- Interactive tooltips on metrics ("?" icons explaining calculations)

---

## Output Format:
Generate:
1. Home.jsx - Landing page component
2. Predict.jsx - Form page component
3. Dashboard.jsx - Analytics dashboard component
4. Components/ folder with reusable Card, Button, Input components
5. hooks/ folder with useDarkMode, useApi custom hooks

Use React functional components with hooks, Tailwind CSS classes, and Lucide React icons.
