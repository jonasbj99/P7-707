class ExerciseRepetitionCounter:
    def __init__(self):
        # Initialize counters and state trackers for each exercise
        self.reset()  # Automatically reset when the object is created

    def reset(self):
        """
        Reset the repetition counters and previous states for all exercises.
        """
        self.counters = {
            'squat': {'previous_state': None, 'rep_count': 0},
            'deadlift': {'previous_state': None, 'rep_count': 0}
        }

    def update_state(self, exercise_input):
        """
        Processes a single input of exercise state (e.g., 'squat-s', 'deadlift-c').
        """
        if exercise_input == 'unknown':
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
        
        if exercise not in self.counters or current_state is None:
            return  # Invalid input
        
        prev_state = self.counters[exercise]['previous_state']
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

    def process_exercise_states(self, exercise_states):
        """
        Takes an array of exercise states (e.g., ['squat-s', 'squat-c', 'deadlift-s'])
        and processes each one.
        """
        for exercise_input in exercise_states:
            self.update_state(exercise_input)
