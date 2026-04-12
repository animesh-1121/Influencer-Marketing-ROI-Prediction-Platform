from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# ============================================================================
# CONFIGURATION
# ============================================================================

NICHE_AVERAGES = {
    'Fashion': {'roi': 15.2, 'engagement': 5.4, 'conversion': 2.8},
    'Tech': {'roi': 18.5, 'engagement': 3.2, 'conversion': 3.5},
    'Fitness': {'roi': 12.0, 'engagement': 6.1, 'conversion': 2.2},
    'Food': {'roi': 10.5, 'engagement': 4.8, 'conversion': 1.9},
    'Travel': {'roi': 9.8, 'engagement': 7.2, 'conversion': 1.5},
    'Education': {'roi': 14.1, 'engagement': 4.5, 'conversion': 3.1}
}

NICHE_BENCHMARKS = {
    'Fashion': {'avg_followers': 450000, 'avg_engagement': 24300},
    'Tech': {'avg_followers': 520000, 'avg_engagement': 16640},
    'Fitness': {'avg_followers': 380000, 'avg_engagement': 23180},
    'Food': {'avg_followers': 410000, 'avg_engagement': 19680},
    'Travel': {'avg_followers': 350000, 'avg_engagement': 25200},
    'Education': {'avg_followers': 290000, 'avg_engagement': 13050}
}

GOAL_MULTIPLIERS = {
    'Awareness': {'roi_mult': 0.8, 'engagement_weight': 1.2},
    'Engagement': {'roi_mult': 0.9, 'engagement_weight': 1.4},
    'Conversion': {'roi_mult': 1.3, 'engagement_weight': 1.0},
    'Sales': {'roi_mult': 1.5, 'engagement_weight': 0.9}
}

# ============================================================================
# MODEL LOADING
# ============================================================================

MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')
roi_model = None
conversion_model = None
niche_columns = None

# Try to load models, but have fallback calculations if not available
try:
    roi_model_path = os.path.join(MODEL_DIR, 'roi_model.pkl')
    conversion_model_path = os.path.join(MODEL_DIR, 'conversion_model.pkl')
    niche_columns_path = os.path.join(MODEL_DIR, 'niche_columns.pkl')

    if os.path.exists(roi_model_path):
        with open(roi_model_path, 'rb') as f:
            roi_model = pickle.load(f)
        print("[OK] ROI model loaded")

    if os.path.exists(conversion_model_path):
        with open(conversion_model_path, 'rb') as f:
            conversion_model = pickle.load(f)
        print("[OK] Conversion model loaded")

    if os.path.exists(niche_columns_path):
        with open(niche_columns_path, 'rb') as f:
            niche_columns = pickle.load(f)
        print("[OK] Niche columns loaded")
except Exception as e:
    print(f"Warning: Could not load models - {e}")
    print("Using fallback calculations")

# ============================================================================
# CALCULATION FUNCTIONS
# ============================================================================

def calculate_derived_features(followers, engagement, budget):
    """Calculate derived metrics from base inputs."""
    engagement_per_1000 = (engagement / followers) * 1000
    cost_per_engagement = budget / engagement if engagement > 0 else budget
    engagement_ratio = engagement / followers

    # Simulate likes/comments split (80/20 typical)
    likes = engagement * 0.8
    comments = engagement * 0.2
    interaction_score = (likes * 1) + (comments * 2)  # Comments weighted higher

    return {
        'engagement_per_1000': engagement_per_1000,
        'cost_per_engagement': cost_per_engagement,
        'engagement_ratio': engagement_ratio,
        'interaction_score': interaction_score,
        'likes': likes,
        'comments': comments
    }


def calculate_roi_formula(followers, engagement, budget, niche, goal):
    """
    Calculate expected ROI using a realistic formula based on:
    - Engagement rate (higher is better)
    - Cost efficiency (lower cost per engagement is better)
    - Niche performance (some niches convert better)
    - Campaign goal (sales convert higher than awareness)
    """
    eng_ratio = engagement / followers

    # Base conversion rate (industry typical 1-5%)
    base_conversion = 0.02  # 2%

    # Engagement quality multiplier (higher engagement = better conversion)
    # 5% engagement is considered good
    eng_quality = min(eng_ratio / 0.05, 2.0)  # Cap at 2x

    # Cost efficiency factor (lower cost per engagement = better ROI)
    cost_per_eng = budget / engagement if engagement > 0 else budget
    cost_efficiency = min(1000 / cost_per_eng, 3.0) if cost_per_eng > 0 else 1.0

    # Niche multiplier
    niche_mult = NICHE_AVERAGES.get(niche, {}).get('conversion', 2.5) / 2.5

    # Goal multiplier
    goal_mult = GOAL_MULTIPLIERS.get(goal, {}).get('roi_mult', 1.0)

    # Calculate estimated conversion rate
    estimated_conversion = base_conversion * eng_quality * niche_mult * goal_mult

    # Estimated revenue (assuming $50 average order value)
    avg_order_value = 50
    estimated_revenue = engagement * estimated_conversion * avg_order_value

    # ROI calculation: (Revenue - Budget) / Budget
    roi_decimal = (estimated_revenue - budget) / budget if budget > 0 else 0

    # Convert to percentage
    roi_percentage = roi_decimal * 100

    return {
        'roi_percentage': round(roi_percentage, 2),
        'estimated_revenue': round(estimated_revenue, 2),
        'estimated_conversion_rate': round(estimated_conversion * 100, 2),
        'cost_per_engagement': round(cost_per_eng, 2),
        'engagement_ratio': round(eng_ratio * 100, 2)
    }


def predict_roi(followers, engagement, budget, niche, goal):
    """Predict ROI using model or fallback to formula."""
    if roi_model and niche_columns:
        try:
            # Prepare input for ML model
            features = calculate_derived_features(followers, engagement, budget)

            input_dict = {
                'Followers': [followers],
                'Engagement': [engagement],
                'Budget': [budget],
                'Engagement_per_1000': [features['engagement_per_1000']],
                'Cost_per_Engagement': [features['cost_per_engagement']],
                'Engagement_to_Follower_Ratio': [features['engagement_ratio']],
                'Interaction_Score': [features['interaction_score']]
            }

            # One-hot encode niche
            for col in niche_columns:
                if f"Niche_{niche}" == col:
                    input_dict[col] = [1]
                else:
                    input_dict[col] = [0]

            input_df = pd.DataFrame(input_dict)
            predicted_roi = float(roi_model.predict(input_df)[0])

            # Convert to percentage if it's in decimal
            if abs(predicted_roi) < 10:
                predicted_roi = predicted_roi * 100

            return round(predicted_roi, 2)
        except Exception as e:
            print(f"Model prediction failed: {e}, using fallback")

    # Fallback to formula-based calculation
    result = calculate_roi_formula(followers, engagement, budget, niche, goal)
    return result['roi_percentage']


def predict_conversion_class(followers, engagement, budget, roi_percentage):
    """Predict conversion class using model or fallback logic."""
    if conversion_model and niche_columns:
        try:
            features = calculate_derived_features(followers, engagement, budget)

            input_dict = {
                'Followers': [followers],
                'Engagement': [engagement],
                'Budget': [budget],
                'Engagement_per_1000': [features['engagement_per_1000']],
                'Cost_per_Engagement': [features['cost_per_engagement']],
                'Engagement_to_Follower_Ratio': [features['engagement_ratio']],
                'Interaction_Score': [features['interaction_score']]
            }

            for col in niche_columns:
                input_dict[col] = [0]

            input_df = pd.DataFrame(input_dict)
            pred_class_num = int(conversion_model.predict(input_df)[0])
            class_map = {0: 'Low', 1: 'Medium', 2: 'High'}
            return class_map.get(pred_class_num, 'Medium')
        except Exception as e:
            print(f"Conversion model failed: {e}, using fallback")

    # Fallback: Based on ROI percentage
    if roi_percentage > 30:
        return 'High'
    elif roi_percentage > 10:
        return 'Medium'
    else:
        return 'Low'


def calculate_risk_score(followers, engagement, budget, roi_percentage):
    """
    Calculate comprehensive risk score (0-100).

    Factors:
    - Engagement Risk (40%): Low engagement rate = higher risk
    - Cost Risk (30%): High cost per engagement = higher risk
    - ROI Risk (30%): Low/negative predicted ROI = higher risk
    """
    eng_ratio = engagement / followers if followers > 0 else 0
    cost_per_eng = budget / engagement if engagement > 0 else budget

    # Engagement Risk (0-100): Penalizes engagement < 5%
    if eng_ratio >= 0.05:
        eng_risk = 0
    elif eng_ratio <= 0.01:
        eng_risk = 100
    else:
        eng_risk = ((0.05 - eng_ratio) / 0.04) * 100

    # Cost Risk (0-100): Penalizes cost > $2 per engagement
    # Benchmark: $0.50 - $1.50 is typical
    if cost_per_eng <= 0.50:
        cost_risk = 0
    elif cost_per_eng >= 3.00:
        cost_risk = 100
    else:
        cost_risk = ((cost_per_eng - 0.50) / 2.50) * 100

    # ROI Risk (0-100): Penalizes low/negative ROI
    if roi_percentage >= 50:
        roi_risk = 0
    elif roi_percentage <= -20:
        roi_risk = 100
    else:
        roi_risk = ((20 - roi_percentage) / 70) * 100

    # Weighted combination
    risk_score = (eng_risk * 0.4) + (cost_risk * 0.3) + (roi_risk * 0.3)
    risk_score = max(0, min(100, risk_score))

    # Determine risk level
    if risk_score <= 33:
        risk_level = 'Low'
    elif risk_score <= 66:
        risk_level = 'Medium'
    else:
        risk_level = 'High'

    return {
        'risk_score': round(risk_score, 2),
        'risk_level': risk_level,
        'engagement_risk': round(eng_risk, 2),
        'cost_risk': round(cost_risk, 2),
        'roi_risk': round(roi_risk, 2),
        'engagement_ratio': round(eng_ratio * 100, 2),
        'cost_per_engagement': round(cost_per_eng, 2)
    }


def get_recommended_action(goal, risk_level, roi_percentage):
    """Generate contextual recommendation based on inputs."""
    actions = {
        'Awareness': {
            'Low': 'Focus on reach expansion and impression-based metrics',
            'Medium': 'Balance reach with engagement quality',
            'High': 'Prioritize authentic engagement over vanity metrics'
        },
        'Engagement': {
            'Low': 'Leverage interactive content and community building',
            'Medium': 'Optimize posting times and content formats',
            'High': 'Review content strategy and audience alignment'
        },
        'Conversion': {
            'Low': 'Scale campaign with optimized landing pages',
            'Medium': 'A/B test CTAs and refine targeting',
            'High': 'Focus on funnel optimization before scaling'
        },
        'Sales': {
            'Low': f'Excellent ROI potential ({roi_percentage}%). Scale immediately.',
            'Medium': 'Improve product positioning and promotional offers',
            'High': 'Reconsider pricing strategy or product-market fit'
        }
    }

    return actions.get(goal, {}).get(risk_level, 'Monitor campaign metrics closely')


def generate_business_justification(budget, niche, goal, roi, risk, action, followers, engagement):
    """Generate AI-powered business justification."""
    api_key = os.environ.get("GEMINI_API_KEY")

    eng_rate = (engagement / followers * 100) if followers > 0 else 0

    if not api_key:
        # Fallback explanation without AI
        if roi > 30:
            return f"Your {niche} campaign targeting {goal} shows exceptional promise with a {roi}% ROI projection. With an engagement rate of {eng_rate:.2f}% and {risk} risk profile, this represents a strong investment opportunity. {action}"
        elif roi > 10:
            return f"This {niche} campaign for {goal} demonstrates solid potential with {roi}% ROI. The {eng_rate:.2f}% engagement rate aligns with industry standards. {action}"
        elif roi > 0:
            return f"While this {niche} campaign shows positive ROI at {roi}%, the returns are modest. Consider optimizing your approach: {action}"
        else:
            return f"This campaign projects negative ROI ({roi}%). Review your strategy carefully. {action}"

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')

        prompt = f"""As a marketing analyst, write a concise 2-sentence business assessment:

Campaign Details:
- Budget: ${budget:,.2f}
- Niche: {niche}
- Goal: {goal}
- Predicted ROI: {roi}%
- Risk Level: {risk}
- Engagement Rate: {eng_rate:.2f}%
- Recommended Action: {action}

Write professionally, highlighting key risks and opportunities. Be direct and actionable."""

        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Campaign analysis for {niche} with {goal} objective: Expected ROI of {roi}% indicates {risk} risk. {action}"


# ============================================================================
# API ROUTES
# ============================================================================

@app.route('/api/predict', methods=['POST'])
def predict_api():
    """Main prediction endpoint."""
    try:
        data = request.json

        # Validate required fields
        required = ['followers', 'engagement', 'budget', 'niche', 'goal']
        for field in required:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Parse and validate inputs
        try:
            followers = float(data['followers'])
            engagement = float(data['engagement'])
            budget = float(data['budget'])
            niche = str(data['niche'])
            goal = str(data['goal'])
        except (ValueError, TypeError) as e:
            return jsonify({'error': f'Invalid input format: {str(e)}'}), 400

        # Validation checks
        if followers <= 0:
            return jsonify({'error': 'Followers must be greater than 0'}), 400
        if engagement <= 0:
            return jsonify({'error': 'Engagement must be greater than 0'}), 400
        if budget <= 0:
            return jsonify({'error': 'Budget must be greater than 0'}), 400
        # Note: Engagement can occasionally exceed followers for viral content

        # Get niche benchmarks
        if niche not in NICHE_AVERAGES:
            return jsonify({'error': f'Invalid niche: {niche}'}), 400

        # Calculate predictions
        roi_percentage = predict_roi(followers, engagement, budget, niche, goal)
        conversion_class = predict_conversion_class(followers, engagement, budget, roi_percentage)
        risk_data = calculate_risk_score(followers, engagement, budget, roi_percentage)

        # Get recommendation
        action = get_recommended_action(goal, risk_data['risk_level'], roi_percentage)

        # Generate justification
        justification = generate_business_justification(
            budget, niche, goal, roi_percentage, risk_data['risk_level'],
            action, followers, engagement
        )

        # Get niche data
        niche_data = NICHE_AVERAGES.get(niche, {})

        # Calculate additional metrics
        features = calculate_derived_features(followers, engagement, budget)

        # Calculate estimated revenue based on ROI
        estimated_revenue = budget * (1 + roi_percentage / 100) if roi_percentage else budget

        return jsonify({
            'roi': roi_percentage,
            'estimated_revenue': round(estimated_revenue, 2),
            'engagement_rate': risk_data['engagement_ratio'],
            'conversion_class': conversion_class,
            'risk_score': risk_data['risk_score'],
            'risk_level': risk_data['risk_level'],
            'risk_breakdown': {
                'engagement_risk': risk_data['engagement_risk'],
                'cost_risk': risk_data['cost_risk'],
                'roi_risk': risk_data['roi_risk']
            },
            'recommended_action': action,
            'justification': justification,
            'niche': niche,
            'goal': goal,
            'niche_avg_roi': niche_data.get('roi', 12.0),
            'niche_avg_eng': niche_data.get('engagement', 5.0),
            'followers': followers,
            'engagement': engagement,
            'budget': budget,
            'cost_per_eng': risk_data['cost_per_engagement'],
            'eng_ratio': risk_data['engagement_ratio'],
            'engagement_per_1000': round(features['engagement_per_1000'], 2),
            'interaction_score': round(features['interaction_score'], 2)
        })

    except Exception as e:
        import traceback
        print(f"Error in predict_api: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'models_loaded': {
            'roi': roi_model is not None,
            'conversion': conversion_model is not None
        }
    })


@app.route('/api/niches', methods=['GET'])
def get_niches():
    """Get available niches and their benchmarks."""
    return jsonify({
        'niches': NICHE_AVERAGES,
        'goals': list(GOAL_MULTIPLIERS.keys())
    })


if __name__ == '__main__':
    print("=" * 50)
    print("Influencer ROI Prediction API")
    print("=" * 50)
    print(f"Models directory: {MODEL_DIR}")
    print(f"ROI Model: {'Loaded' if roi_model else 'Not Loaded (using fallback)'}")
    print(f"Conversion Model: {'Loaded' if conversion_model else 'Not Loaded (using fallback)'}")
    print("=" * 50)
    # Disable auto-reloader to avoid encoding issues on Windows
    app.run(debug=True, port=5000, use_reloader=False)
