import { atom } from 'jotai'


export const responseAtom = atom({
    'predicted_class': 0,
    'confidence': 0,
    'predicted_exercise': "",
    'all_probabilities': [],
    'input_shape': [],

    "weight_prediction": {
        "confidence_scores": [],
        "class_ids": [],
        "class_names": []
    }
})
