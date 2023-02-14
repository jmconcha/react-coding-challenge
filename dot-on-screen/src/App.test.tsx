import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App />', () => {
  test('should place a dot wherever the user clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const app = screen.getByTestId('app');
    // first dot
    await user.pointer([{ coords: { clientX: 10, clientY: 10 } }]);
    await user.click(app);
    let boxes = await screen.findAllByTestId('box');
    expect(boxes.length).toBe(1);
    expect(boxes[0]).toHaveStyle({
      left: '5px',
      top: '5px',
    });

    // second dot
    await user.pointer([{ coords: { clientX: 20, clientY: 20 } }]);
    await user.click(app);
    boxes = await screen.findAllByTestId('box');
    expect(boxes.length).toBe(2);
    expect(boxes[1]).toHaveStyle({
      left: '15px',
      top: '15px',
    });

    // third dot
    await user.pointer([{ coords: { clientX: 100, clientY: 100 } }]);
    await user.click(app);
    boxes = await screen.findAllByTestId('box');
    expect(boxes.length).toBe(3);
    expect(boxes[2]).toHaveStyle({
      left: '95px',
      top: '95px',
    });
  });

  test.each;

  test('should remove the last added dot by clicking undo button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const app = screen.getByTestId('app');

    // first dot
    await user.pointer([{ coords: { clientX: 50, clientY: 80 } }]);
    await user.click(app);

    // second dot
    await user.pointer([{ coords: { clientX: 150, clientY: 280 } }]);
    await user.click(app);

    let boxes = await screen.findAllByTestId('box');
    expect(boxes.length).toBe(2);
    expect(boxes[0]).toHaveStyle({
      left: '45px',
      top: '75px',
    });
    expect(boxes[1]).toHaveStyle({
      left: '145px',
      top: '275px',
    });

    const undoButton = screen.getByRole('button', {
      name: /undo/i,
    });
    await user.click(undoButton);
    boxes = await screen.findAllByTestId('box');
    expect(boxes.length).toBe(1);
    expect(boxes[0]).toHaveStyle({
      left: '45px',
      top: '75px',
    });
  });
  test('should redo the last removed dot by clicking redo button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const app = screen.getByTestId('app');
    // first dot
    await user.pointer([{ coords: { clientX: 310, clientY: 210 } }]);
    await user.click(app);
    // second dot
    await user.pointer([{ coords: { clientX: 210, clientY: 10 } }]);
    await user.click(app);

    let boxes = await screen.findAllByTestId('box');
    expect(boxes.length).toBe(2);

    let undoButton = screen.getByRole('button', {
      name: /undo/i,
    });
    let redoButton = screen.getByRole('button', {
      name: /redo/i,
    });

    //remove last added dot
    await user.click(undoButton);
    boxes = await screen.findAllByTestId('box');
    expect(boxes.length).toBe(1);
    expect(boxes[0]).toHaveStyle({
      left: '305px',
      top: '205px',
    });

    await user.click(redoButton);
    boxes = await screen.findAllByTestId('box');
    expect(boxes.length).toBe(2);
    expect(boxes[0]).toHaveStyle({
      left: '305px',
      top: '205px',
    });
    expect(boxes[1]).toHaveStyle({
      left: '205px',
      top: '5px',
    });
  });
});
