import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Step 1: Load the dataset
# Ensure to specify the delimiter as ';' for semicolon-separated values
data = pd.read_csv('C:\\Users\\Opstart\\Desktop\\squad.csv', sep=';', decimal=',')
# Remove dots used as thousands separators
data = data.replace({r'\.': ''}, regex=True)

# This will ensure any strings or problematic formats are converted correctly.
data = data.apply(pd.to_numeric, errors='coerce')
# Fill NaN values with a default (e.g., 0)
data = data.fillna(0)

# Step 2: Prepare your features (X) and labels (y)
# Assuming that the column 'pose' contains the labels ("squat" and "deadlift") and
# the rest are features, such as MediaPipe landmarks or similar data points.
X = data.drop('label', axis=1)  # Drop the label column 'pose' to get feature data
y = data['label']  # The target labels: "squat" or "deadlift"

# Step 3: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Train the Random Forest model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Step 5: Evaluate the model
y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy * 100:.2f}%')

# Step 6: Save the trained model to a file using joblib
joblib.dump(clf, 'pose_model.pkl')