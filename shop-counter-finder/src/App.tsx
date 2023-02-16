import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Form from './components/Form';
import ShopCounter, { IShopCounter } from './components/ShopCounter';
import './App.css';

function App() {
  const [shopCounters, setShopCounters] = useState<IShopCounter[]>([
    {
      id: uuidv4(),
      number: 1,
      customersInLine: [],
    },
    {
      id: uuidv4(),
      number: 2,
      customersInLine: [],
    },
    {
      id: uuidv4(),
      number: 3,
      customersInLine: [],
    },
  ]);
  const leastCustomerCounter = useMemo(() => {
    let shopCounterId = shopCounters[0].id;
    let prevCustLen = shopCounters[0].customersInLine.length;

    for (let i = 1; i < shopCounters.length; i++) {
      const currCustLen = shopCounters[i].customersInLine.length;
      shopCounterId =
        prevCustLen > currCustLen ? shopCounters[i].id : shopCounterId;
      prevCustLen = currCustLen;
    }

    return shopCounterId;
  }, [shopCounters]);

  const handleCheckout = (items: number) => {
    setShopCounters((prevState) => {
      return prevState.map((shopCounter) => {
        if (shopCounter.id === leastCustomerCounter) {
          return {
            ...shopCounter,
            customersInLine: [
              ...shopCounter.customersInLine,
              { id: uuidv4(), items },
            ],
          };
        }

        return shopCounter;
      });
    });
  };

  const handleItemDecrement = (shopCounterId: string) => {
    setShopCounters((prevState) => {
      return prevState.map((shopCounter) => {
        if (shopCounter.id === shopCounterId) {
          let newCustomersInLine = [...shopCounter.customersInLine];

          if (newCustomersInLine[0].items - 1 > 0) {
            newCustomersInLine = [
              {
                ...shopCounter.customersInLine[0],
                items: shopCounter.customersInLine[0].items - 1,
              },
              ...shopCounter.customersInLine.slice(1),
            ];
          } else {
            newCustomersInLine = [...shopCounter.customersInLine.slice(1)];
          }

          return {
            ...shopCounter,
            customersInLine: newCustomersInLine,
          };
        }

        return shopCounter;
      });
    });
  };

  return (
    <div className="App">
      <Form onSubmit={handleCheckout} />
      <div className="shopCountersWrapper">
        {shopCounters.map((shopCounter) => (
          <ShopCounter
            key={shopCounter.id}
            {...shopCounter}
            onItemDecrement={handleItemDecrement}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
