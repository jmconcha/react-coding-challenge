import { useState } from 'react';
import styles from './CardImage.module.css';

interface ICartImageProps {
  imageUrl: string;
  title: string;
  componentOverlay?: JSX.Element;
}

export const CardImageWithOverlay: React.FC<ICartImageProps> = (props) => {
  const { imageUrl, title, componentOverlay } = props;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt="item photo" className={styles.image} />
        <div className={styles.overlayWrapper}>{componentOverlay}</div>
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
};
