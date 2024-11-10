import React from 'react';
import styles from './ErrorPrevention.module.scss';
import Button from '../Button/Button';

type ErrorPreventionProps = {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ErrorPrevention({ text, onConfirm, onCancel }: ErrorPreventionProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.text}>{text}</p>
        <div className={styles.buttons}>
          <Button label="Yes" onClick={onConfirm} variant="blue" size="small" />
          <Button label="No" onClick={onCancel} variant="outline" size="small" />
        </div>
      </div>
    </div>
  );
}

export default ErrorPrevention;
