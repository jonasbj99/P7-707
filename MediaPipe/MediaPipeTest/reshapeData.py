import pandas as pd

# Load the data with ';' separator
data = pd.read_csv('C:\\Users\\Opstart\\Desktop\\squad.csv', delimiter=';', skipinitialspace=True)

# Print the first few rows to check if it's loaded correctly
print(data.head())

# Convert numeric columns to numeric type (if necessary)
data[['x', 'y', 'z', 'v']] = data[['x', 'y', 'z', 'v']].apply(pd.to_numeric, errors='coerce')

# Step 1: Create a unique identifier for each frame based on the change in the label
data['Frame_ID'] = (data['label'].shift() != data['label']).cumsum()

# Step 2: Separate numeric and non-numeric columns to handle aggregation correctly
numeric_data = data[['Frame_ID', 'landmark', 'x', 'y', 'z', 'v']]
non_numeric_data = data[['Frame_ID', 'label']].drop_duplicates()

# Step 3: Use pivot_table to aggregate values for each landmark (using mean)
wide_data = numeric_data.pivot_table(
    index='Frame_ID',
    columns='landmark',
    values=['x', 'y', 'z', 'v'],
    aggfunc='mean'  # Use mean to aggregate the data for each landmark
)

# Step 4: Flatten multi-level columns after pivoting
wide_data.columns = [f"{landmark}_{coord}" for coord, landmark in wide_data.columns]

# Step 5: Re-add the labels for each frame
wide_data = wide_data.join(non_numeric_data.set_index('Frame_ID'))

# Step 6: Save the reshaped data to a new CSV file
wide_data.to_csv('C:\\Users\\Opstart\\Desktop\\squad1.csv', index=False)

print(wide_data.head())