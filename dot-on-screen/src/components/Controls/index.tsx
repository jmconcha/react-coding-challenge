import styles from './Controls.module.css';

interface IControlsProps {
  onUndo: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  onRedo: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

function Controls(props: IControlsProps) {
  const { onUndo, onRedo } = props;

  return (
    <div className={styles.controls}>
      <button
        className={`${styles.button} ${styles.buttonError}`}
        onClick={onUndo}
        type="button"
      >
        Undo
      </button>
      <button
        className={`${styles.button} ${styles.buttonSuccess}`}
        onClick={onRedo}
        type="button"
      >
        Redo
      </button>
    </div>
  );
}

export default Controls;
