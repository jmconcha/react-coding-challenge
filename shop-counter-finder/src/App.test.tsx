import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App />>', () => {
  it('should decrease item value of shop counter first customer in line by one every one second', async () => {
    render(<App />);

    const input = screen.getByRole('spinbutton');
    const checkoutButton = screen.getByRole('button', {
      name: /checkout/i,
    });

    // first customer in shop counter 1
    userEvent.type(input, '100');
    expect(input).toHaveValue(100);
    userEvent.click(checkoutButton);
    // first customer in shop counter 2
    userEvent.type(input, '200');
    expect(input).toHaveValue(200);
    userEvent.click(checkoutButton);
    // first customer in shop counter 3
    userEvent.type(input, '300');
    expect(input).toHaveValue(300);
    userEvent.click(checkoutButton);
    // second customer in shop counter 1
    userEvent.type(input, '400');
    expect(input).toHaveValue(400);
    userEvent.click(checkoutButton);

    await waitFor(() => {
      const customer1InShopCounter1 = screen.queryByText('99');
      expect(customer1InShopCounter1).toBeInTheDocument();
    });
    await waitFor(() => {
      const customer1InShopCounter2 = screen.queryByText('199');
      expect(customer1InShopCounter2).toBeInTheDocument();
    });
    await waitFor(() => {
      const customer1InShopCounter3 = screen.queryByText('299');
      expect(customer1InShopCounter3).toBeInTheDocument();
    });
    await waitFor(() => {
      const customer2InShopCounter1 = screen.queryByText('400');
      expect(customer2InShopCounter1).toBeInTheDocument();
    });
  });

  it('should remove customer in line if items is 0', async () => {
    render(<App />);

    const input = screen.getByRole('spinbutton');
    const checkoutButton = screen.getByRole('button', {
      name: /checkout/i,
    });
    userEvent.type(input, '1');
    expect(input).toHaveValue(1);
    userEvent.click(checkoutButton);

    const customer1 = screen.getByText('1');
    expect(customer1).toBeInTheDocument();

    await waitFor(
      () => {
        expect(customer1).not.toBeInTheDocument();
      },
      {
        timeout: 1100,
      }
    );
  });

  it('should put the new customer on a shop counter line where the least customer', () => {
    render(<App />);

    const input = screen.getByRole('spinbutton');
    const checkoutButton = screen.getByRole('button', {
      name: /checkout/i,
    });
    userEvent.type(input, '10');
    expect(input).toHaveValue(10);
    userEvent.click(checkoutButton);
    const shopCounter1 = screen.getByTestId('ShopCounter-1');
    const shopCounter1Customer1 = within(shopCounter1).queryByText('10');
    expect(shopCounter1Customer1).toBeInTheDocument();

    userEvent.type(input, '5');
    expect(input).toHaveValue(5);
    userEvent.click(checkoutButton);
    const shopCounter2 = screen.getByTestId('ShopCounter-2');
    const shopCounter2Customer1 = within(shopCounter2).queryByText('5');
    expect(shopCounter2Customer1).toBeInTheDocument();
  });
});
