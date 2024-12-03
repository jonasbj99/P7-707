class ExerciseRepetitionCounter:
    def __init__(self):
        # Initialize counters and state trackers for each exercise
        self.counters = {
            'squat': {'previous_state': None, 'rep_count': 0},
            'deadlift': {'previous_state': None, 'rep_count': 0}
        }
    

    def get_the_most_rep_count(self):
        # Calculate the maximum rep count across all exercises
        max_rep_count = max(counter['rep_count'] for counter in self.counters.values())
        return max_rep_count
    

    def update_state(self, exercise_input):
        # Handle 'unknown' input
        if exercise_input == 'nothing':
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
