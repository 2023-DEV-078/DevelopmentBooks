import { render, screen, fireEvent } from '@testing-library/react';
import { booksConstants } from './constants/testConstants';
import App from './App';

const { ONE, THREE, FOUR, CLEAN_CODE, THE_CLEAN_CODER } = booksConstants;

describe("Book price calculator - Tests", () => {

  test('Display title', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: THREE });
    expect(title.innerHTML).toBe('Book price calculator - TDD');
  });

  test("When user buy one book without discount", async () => {
    render(<App />)

    const input = screen.getByLabelText(CLEAN_CODE)
    fireEvent.change(input, { target: { value: ONE } })

    const calculatePrice = screen.getByRole('button', { name: /Calculate Total Price/i });
    fireEvent.click(calculatePrice)

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 50');
  });

  test("When user buy two different books then five percent discount is applied", async () => {
    render(<App />)

    const inputCleanCode = screen.getByLabelText(CLEAN_CODE)
    fireEvent.change(inputCleanCode, { target: { value: ONE } })
    const inputTheCleanCoder = screen.getByLabelText(THE_CLEAN_CODER)
    fireEvent.change(inputTheCleanCoder, { target: { value: ONE } })

    const calculatePrice = screen.getByRole('button', { name: /Calculate Total Price/i });
    fireEvent.click(calculatePrice)

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 95');
  });

});
