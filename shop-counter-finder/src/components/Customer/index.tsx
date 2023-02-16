import React, { useEffect } from 'react';
import './Customer.css';

export interface ICustomer {
  id: string;
  items: number;
}

interface ICustomerProps extends ICustomer {
  onItemDecrement?: () => void;
}

interface IWithIntervalProps {
  children: JSX.Element;
  onItemDecrement: () => void;
}

function WithInterval(props: IWithIntervalProps) {
  const { children, onItemDecrement } = props;

  // execute this block on mount and unmount
  useEffect(() => {
    const timerId = setInterval(onItemDecrement, 1000);

    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}

function CustomerFactory(props: ICustomerProps) {
  const { onItemDecrement, items } = props;

  const customerJsx = (
    <div data-testid="customerInLine" className="Customer">
      <span>{items}</span>
    </div>
  );

  if (onItemDecrement === undefined) {
    return customerJsx;
  }

  return (
    <WithInterval onItemDecrement={onItemDecrement}>{customerJsx}</WithInterval>
  );
}

export default CustomerFactory;
