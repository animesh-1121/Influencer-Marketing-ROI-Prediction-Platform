import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
import pickle

# --- PHASE 1: Data Understanding (EDA) ---
df = pd.read_csv('data/influencer_dataset.csv')

# Simulate Likes and Comments for Interaction Score if not present
if 'Likes' not in df.columns:
    np.random.seed(42)
    df['Likes'] = (df['Engagement'] * np.random.uniform(0.7, 0.9, len(df))).astype(int)
    df['Comments'] = df['Engagement'] - df['Likes']

os.makedirs('static/eda', exist_ok=True)
os.makedirs('static/models', exist_ok=True)
os.makedirs('models', exist_ok=True)

# 1. Followers distribution
plt.figure()
sns.histplot(df['Followers'], bins=30, kde=True)
plt.title('Followers Distribution')
plt.savefig('static/eda/followers_dist.png')
plt.close()

# 2. Engagement vs followers scatter plot
plt.figure()
sns.scatterplot(x='Followers', y='Engagement', data=df)
plt.title('Engagement vs Followers')
plt.savefig('static/eda/eng_vs_foll.png')
plt.close()

# 3. Budget vs revenue relationship
plt.figure()
sns.scatterplot(x='Budget', y='Revenue', data=df)
plt.title('Budget vs Revenue')
plt.savefig('static/eda/budget_vs_rev.png')
plt.close()

# 4. Niche-wise performance
plt.figure()
sns.boxplot(x='Niche', y='ROI', data=df)
plt.title('Niche-wise ROI Performance')
plt.savefig('static/eda/niche_roi.png')
plt.close()

# 5. Correlation heatmap
numeric_cols = df.select_dtypes(include=[np.number])
plt.figure(figsize=(10, 8))
sns.heatmap(numeric_cols.corr(), annot=True, cmap='coolwarm', fmt=".2f")
plt.title('Correlation Heatmap')
plt.savefig('static/eda/corr_heatmap.png')
plt.close()


# --- PHASE 2: Feature Engineering + Modeling ---
# Features
df['Engagement_per_1000'] = (df['Engagement'] / df['Followers']) * 1000
df['Cost_per_Engagement'] = df['Budget'] / df['Engagement'].replace(0, 1) # Avoid div by zero
df['Engagement_to_Follower_Ratio'] = df['Engagement'] / df['Followers']
df['Interaction_Score'] = (df['Likes'] * 1 + df['Comments'] * 2) # Weighted

# Targets
def categorize_roi(roi):
    if roi > 0.30:
        return 'High'
    elif roi >= 0.10:
        return 'Medium'
    else:
        return 'Low'

df['ROI_Class'] = df['ROI'].apply(categorize_roi)
class_mapping = {'Low': 0, 'Medium': 1, 'High': 2}
df['ROI_Class_Num'] = df['ROI_Class'].map(class_mapping)

# One-hot encoding for Niche
df_encoded = pd.get_dummies(df, columns=['Niche'], drop_first=True)
niche_features = [col for col in df_encoded.columns if col.startswith('Niche_')]

# Save columns for deployment
with open('models/niche_columns.pkl', 'wb') as f:
    pickle.dump(niche_features, f)

# Save processed data
os.makedirs('data', exist_ok=True)
df_encoded.to_csv('data/processed_dataset.csv', index=False)

# Prepare Data
features = ['Followers', 'Engagement', 'Budget', 
            'Engagement_per_1000', 'Cost_per_Engagement', 'Engagement_to_Follower_Ratio', 'Interaction_Score'] + niche_features
X = df_encoded[features]

y_reg = df_encoded['ROI']
y_clf = df_encoded['ROI_Class_Num']

X_train, X_test, yr_train, yr_test, yc_train, yc_test = train_test_split(X, y_reg, y_clf, test_size=0.2, random_state=42)

# ========== ROI Model (Regression) ==========
print("--- Training Regression Models ---")
lr = LinearRegression()
lr.fit(X_train, yr_train)
yr_pred_lr = lr.predict(X_test)
print(f"Linear Reg R2: {r2_score(yr_test, yr_pred_lr):.4f}, RMSE: {np.sqrt(mean_squared_error(yr_test, yr_pred_lr)):.4f}")

rf_reg = RandomForestRegressor(random_state=42)
rf_reg.fit(X_train, yr_train)
yr_pred_rf = rf_reg.predict(X_test)
print(f"RF Reg R2: {r2_score(yr_test, yr_pred_rf):.4f}, RMSE: {np.sqrt(mean_squared_error(yr_test, yr_pred_rf)):.4f}")

best_reg = rf_reg if r2_score(yr_test, yr_pred_rf) > r2_score(yr_test, yr_pred_lr) else lr

# ========== Conversion Model (Classification) ==========
print("\n--- Training Classification Models ---")
log_reg = LogisticRegression(max_iter=1000)
log_reg.fit(X_train, yc_train)
yc_pred_log = log_reg.predict(X_test)
print(f"Log Reg Accuracy: {accuracy_score(yc_test, yc_pred_log):.4f}")

rf_clf = RandomForestClassifier(random_state=42)
rf_clf.fit(X_train, yc_train)
yc_pred_rf = rf_clf.predict(X_test)
print(f"RF Clf Accuracy: {accuracy_score(yc_test, yc_pred_rf):.4f}")

best_clf = rf_clf if accuracy_score(yc_test, yc_pred_rf) > accuracy_score(yc_test, yc_pred_log) else log_reg

# Metrics
metrics = {
    'Accuracy': accuracy_score(yc_test, best_clf.predict(X_test)),
    'Precision': precision_score(yc_test, best_clf.predict(X_test), average='macro', zero_division=0),
    'Recall': recall_score(yc_test, best_clf.predict(X_test), average='macro'),
    'F1': f1_score(yc_test, best_clf.predict(X_test), average='macro')
}
print("\nBest Classifier Metrics:")
for k, v in metrics.items():
    print(f"{k}: {v:.4f}")

# Feature importance
if isinstance(best_clf, RandomForestClassifier):
    plt.figure()
    features_importance = best_clf.feature_importances_
    sns.barplot(x=features_importance, y=features)
    plt.title('Feature Importance (RF Classifier)')
    # Rotate x labels if necessary
    plt.xticks(rotation=90)
    plt.tight_layout()
    plt.savefig('static/models/feature_importance.png')
    plt.close()

# Save models
with open('models/roi_model.pkl', 'wb') as f:
    pickle.dump(best_reg, f)
with open('models/conversion_model.pkl', 'wb') as f:
    pickle.dump(best_clf, f)
    
print("\nModels and charts saved successfully.")
