import { IVariant } from '../ItemList/types';
import styles from './Variant.module.css';
import { formatCurrency } from './utils';

interface VariantProps {
  variant: IVariant;
}

export const Variant: React.FC<VariantProps> = (props) => {
  const { variant } = props;

  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{variant.name}</h4>
      <p key={variant.id} className={styles.description}>
        {variant.description}
      </p>
      <strong className={styles.price}>{formatCurrency(variant.price)}</strong>
    </div>
  );
};
