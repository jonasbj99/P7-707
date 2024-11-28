class ExerciseRepetitionCounter:
    def __init__(self):
        # Initialize counters and state trackers for each exercise
        self.counters = {
            'squat': {'previous_state': None, 'rep_count': 0},
            'deadlift': {'previous_state': None, 'rep_count': 0}
        }

    def update_state(self, exercise_input):
        # Handle 'unknown' input
        if exercise_input == 'unknown':
            print("Unknown state detected, skipping...")
            return  # Skip processing for 'unknown'

        # Parse the input to extract exercise and state
        try:
            exercise, state_code = exercise_input.split('-')
        except ValueError:
            print(f"Invalid input format: {exercise_input}")
            return
        
        # Map short codes to full state names
        state_map = {'s': 'start', 'c': 'contraction'}
        current_state = state_map.get(state_code)
        
        # Validate exercise and state
        if exercise not in self.counters or current_state is None:
            print(f"Invalid input: {exercise_input}")
            return
        
        # Get the current exercise state and counter
        prev_state = self.counters[exercise]['previous_state']
        
        # Logic for tracking repetitions
        if prev_state == "start" and current_state == "contraction":
            self.counters[exercise]['previous_state'] = "contraction"
        elif prev_state == "contraction" and current_state == "start":
            self.counters[exercise]['rep_count'] += 1
            print(f"{exercise.capitalize()} repetition completed! Total count: {self.counters[exercise]['rep_count']}")
            self.counters[exercise]['previous_state'] = "start"
        elif prev_state is None and current_state == "start":
            self.counters[exercise]['previous_state'] = "start"

    def get_count(self, exercise):
        return self.counters[exercise]['rep_count']

# Main loop for real-time input
counter = ExerciseRepetitionCounter()

print("Enter exercise states (e.g., 'squat-s', 'squat-c', 'deadlift-s', 'unknown'). Type 'exit' to stop.")

while True:
    user_input = input("Enter state: ").strip().lower()  # Get user input and normalize it
    if user_input == 'exit':
        break  # Exit the loop when the user types 'exit'
    
    counter.update_state(user_input)

# Display final counts
print(f"\nTotal Squat Repetitions: {counter.get_count('squat')}")
print(f"Total Deadlift Repetitions: {counter.get_count('deadlift')}")
