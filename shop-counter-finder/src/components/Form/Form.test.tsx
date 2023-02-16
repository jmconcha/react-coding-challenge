import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from './index';

describe('<Form />', () => {
  it('should render the <Form />', () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

    const input = screen.queryByRole('spinbutton');
    const checkoutButton = screen.queryByRole('button', {
      name: /checkout/i,
    });
    expect(input).toBeInTheDocument();
    expect(checkoutButton).toBeInTheDocument();
  });

  it('checks if function prop is called when form is submitted', async () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

    const input = screen.getByRole('spinbutton');
    const checkoutButton = screen.getByRole('button', {
      name: /checkout/i,
    });
    userEvent.type(input, '1');
    userEvent.click(checkoutButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should clear input after form submit', () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

    let input = screen.getByRole('spinbutton');
    const checkoutButton = screen.getByRole('button', {
      name: /checkout/i,
    });

    userEvent.type(input, '32');
    userEvent.click(checkoutButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue(null);
  });

  it('should not send if input is empty or less than 1', () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

    let input = screen.getByRole('spinbutton');
    const checkoutButton = screen.getByRole('button', {
      name: /checkout/i,
    });

    userEvent.click(checkoutButton);
    expect(onSubmit).not.toHaveBeenCalled();
    userEvent.type(input, '0');
    userEvent.click(checkoutButton);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

export {};
