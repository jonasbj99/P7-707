class ExerciseRepetitionCounter:
    def __init__(self):
        self.counters = {
            'squat': {'previous_state': None, 'rep_count': 0},
            'deadlift': {'previous_state': None, 'rep_count': 0}
        }

    def update_state(self, exercise_input):
        if exercise_input == 'unknown':
            return  # Skip processing for 'unknown'

        exercise, state_code = exercise_input.split('-')
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
