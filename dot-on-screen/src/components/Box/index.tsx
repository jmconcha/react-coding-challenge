import styles from './Box.module.css';

interface IBoxProps {
  box: {
    x: number;
    y: number;
  };
}

function Box(props: IBoxProps) {
  const { box } = props;

  return (
    <div
      data-testid="box"
      style={{ left: `${box.x}px`, top: `${box.y}px` }}
      className={styles.box}
    ></div>
  );
}

export default Box;
