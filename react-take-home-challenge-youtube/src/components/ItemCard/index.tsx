import React from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../ItemList/types';
import styles from './CardImageWithOverlay.module.css';

export interface ItemCardProps {
  item: IItem;
}

export const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { item } = props;
  const variantsToDisplay = item.variants.slice(0, 4);

  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{item.name}</h4>
      {variantsToDisplay.map((variant, index) => (
        <p key={variant.id} className={styles.variant}>
          Item {index + 1} - {variant.name}
        </p>
      ))}
      {item.variants.length > 4 && (
        <small className={styles.plusMore}>
          ... plus {item.variants.length - 4} more
        </small>
      )}
      <Link to={`item/${item.id}`} className={styles.linkBtn}>
        SELECT
      </Link>
    </div>
  );
};
