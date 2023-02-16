import React from 'react';
import Customer, { ICustomer } from '../Customer';
import './ShopCounter.css';

export interface IShopCounter {
  id: string;
  number: number;
  customersInLine: ICustomer[];
}

interface IShopCounterProps extends IShopCounter {
  onItemDecrement: (shopCounterId: string) => void;
}

function ShopCounter(props: IShopCounterProps) {
  const {
    id: shopCounterId,
    number: shopCounterNumber,
    customersInLine,
    onItemDecrement,
  } = props;

  return (
    <div
      data-testid={`ShopCounter-${shopCounterNumber}`}
      className="ShopCounter"
    >
      <div>
        <h4>Shop Counter Number: {shopCounterNumber}</h4>
        <small>
          <strong>Shop Counter Id:</strong> {shopCounterId}
        </small>
      </div>

      <div className="customerInLineWrapper">
        {customersInLine.map((customer, index) => (
          <Customer
            key={customer.id}
            id={customer.id}
            items={customer.items}
            onItemDecrement={
              index === 0 ? () => onItemDecrement(shopCounterId) : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

export default ShopCounter;
