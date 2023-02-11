import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ItemDetails.module.css';
import { IItem } from '../ItemList/types';
import { Variant } from '../Variant';

export const ItemDetails: React.FC = () => {
  const [item, setItem] = useState<IItem | null>(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/items/${id}`);
      const data = await response.json();
      setItem(data);
    })();
  }, [id]);

  if (item === null) {
    return null;
  }

  return (
    <div className={styles.itemDetails}>
      <nav className={styles.navbar}>
        <Link to="/">
          {' '}
          <span>&lt;</span>&nbsp;Back to Marketplace
        </Link>
      </nav>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img src={item.imageUrls[0].url} alt="item photo" />
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{item.name}</h3>
          <p className={styles.description}>{item.description}</p>

          <div className={styles.variants}>
            {item.variants.map((variant) => (
              <Variant key={variant.id} variant={variant} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
