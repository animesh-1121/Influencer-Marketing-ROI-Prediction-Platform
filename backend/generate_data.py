import pandas as pd
import numpy as np
import os

np.random.seed(42)

n_records = 1000

# Niches
niches = ['Fashion', 'Tech', 'Fitness', 'Food', 'Travel', 'Education']
niche_col = np.random.choice(niches, n_records)

# Followers: 10,000 to 1,000,000
followers = np.random.randint(10000, 1000000, n_records)

# Engagement: typically 1% to 10% of followers, with some noise
engagement_rate = np.random.uniform(0.01, 0.10, n_records)
engagement = (followers * engagement_rate).astype(int)

# Avg_Product_Price: $10 to $500
avg_product_price = np.random.uniform(10, 500, n_records)

# Budget: random budget spent on influencer, $500 to $50,000
# loosely correlated with followers
budget = (followers * np.random.uniform(0.01, 0.05, n_records)).astype(int)

# Conversion Rate: 0.1% to 5%
conversion_rate = np.random.uniform(0.001, 0.05, n_records)

# Calculate Revenue based on formula:
# Revenue = Engagement × Conversion Rate × Avg Product Price
revenue = engagement * conversion_rate * avg_product_price

# Calculate ROI based on formula:
# ROI = (Revenue − Budget) / Budget
roi = (revenue - budget) / budget

df = pd.DataFrame({
    'Influencer_Name': [f'Influencer_{i}' for i in range(1, n_records + 1)],
    'Niche': niche_col,
    'Followers': followers,
    'Engagement': engagement,
    'Avg_Product_Price': avg_product_price,
    'Budget': budget,
    'Conversion_Rate': conversion_rate,
    'Revenue': revenue,
    'ROI': roi
})

# Save to data directory
os.makedirs('data', exist_ok=True)
df.to_csv('data/influencer_dataset.csv', index=False)
print("Dataset created successfully at data/influencer_dataset.csv")
