import React, { useState, useEffect } from 'react';
import { ItemCard } from '../ItemCard';
import { CardImageWithOverlay } from '../CardImageWithOverlay';
import { IItem } from './types';
import styles from './ItemList.module.css';

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3001/items');
      const data = await response.json();
      setItems(data);
    })();
  }, []);

  return (
    <div className={styles.itemList}>
      {items.map((item) => (
        <CardImageWithOverlay
          key={item.id}
          imageUrl={item.imageUrls[0].url}
          title={item.name}
          componentOverlay={<ItemCard item={item} />}
        />
      ))}
    </div>
  );
};
