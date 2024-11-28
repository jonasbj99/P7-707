from counter import ExerciseRepetitionCounter

# Initialize the counter
counter = ExerciseRepetitionCounter()

# Example inputs (could be replaced with data from sensors or another source)
exercise_inputs = ["squat-s", "squat-c", "unknown", "deadlift-s", "deadlift-c"]

# Process each input
for input_state in exercise_inputs:
    counter.update_state(input_state)

# Display final counts
print(f"\nTotal Squat Repetitions: {counter.get_count('squat')}")
print(f"Total Deadlift Repetitions: {counter.get_count('deadlift')}")
