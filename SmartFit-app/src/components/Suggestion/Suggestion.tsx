import React from 'react';
import styles from './Suggestion.module.scss';

type SuggestionProps = {
  message: string;
};

function Suggestion({ message }: SuggestionProps) {
  return (
    <div className={styles.SuggestionBox}>
      <p className={styles.SuggestionText}>{message}</p>
    </div>
  );
}

export default Suggestion;
