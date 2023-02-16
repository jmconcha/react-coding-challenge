import { screen, render, waitFor } from '@testing-library/react';
import ShopCounter from './index';

describe('<ShopCounter />', () => {
  it('should render <ShopCounter />', () => {
    const onItemDecrement = jest.fn();
    const shopCounters = [
      {
        number: 1,
        id: '2fd',
        customersInLine: [
          { id: '3fd', items: 10 },
          { id: '0a0f', items: 1 },
        ],
      },
    ];
    render(
      <ShopCounter {...shopCounters[0]} onItemDecrement={onItemDecrement} />
    );

    const shopCounter = screen.getAllByRole('heading', {
      name: /shop counter number:/i,
    });
    expect(shopCounter).toHaveLength(1);
    expect(shopCounter[0]).toHaveTextContent('1');

    const customersInLine = screen.getAllByTestId('customerInLine');
    expect(customersInLine).toHaveLength(2);
    expect(customersInLine[0]).toHaveTextContent('10');
    expect(customersInLine[1]).toHaveTextContent('1');
  });

  it('should call onItemDecrement every one second', async () => {
    const onItemDecrement = jest.fn();
    const shopCounters = [
      {
        number: 1,
        id: '2fd',
        customersInLine: [{ id: '3fd', items: 10 }],
      },
    ];
    render(
      <ShopCounter {...shopCounters[0]} onItemDecrement={onItemDecrement} />
    );

    await waitFor(() => expect(onItemDecrement).toHaveBeenCalled(), {
      timeout: 2000,
      interval: 1000,
    });
  });
});

export {};
