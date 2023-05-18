import { render, screen, fireEvent } from '@testing-library/react';
import { booksConstants } from './constants/testConstants';
import App from './App';

const { ONE, THREE, FOUR, CLEAN_CODE, THE_CLEAN_CODER, CLEAN_ARCHITECTURE, TEST_DRIVEN_DEVELOPMENT, LEGACY_CODE } = booksConstants;

const addBooksAndCalculatePrice = (orderedBooks) => {

  orderedBooks.forEach(book => {
    const input = screen.getByLabelText(book.title)
    fireEvent.change(input, { target: { value: book.quantity } })
  });

  const calculatePrice = screen.getByRole('button', { name: /Calculate Total Price/i });
  fireEvent.click(calculatePrice)
}

describe("Book price calculator - Tests", () => {

  test('Display title', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: THREE });
    expect(title.innerHTML).toBe('Book price calculator - TDD');
  });

  test("When user buy one book without discount", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: CLEAN_CODE, quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 50');
  });

  test("When user buy two different books then five percent discount is applied", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: CLEAN_CODE, quantity: ONE }, { title: THE_CLEAN_CODER, quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 95');
  });

  test("When user buy three different books then ten percent discount is applied", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: CLEAN_CODE, quantity: ONE }, { title: THE_CLEAN_CODER, quantity: ONE }, { title: CLEAN_ARCHITECTURE, quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 135');
  });

  test("When user buy four different books then twenty percent discount is applied", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: CLEAN_CODE, quantity: ONE }, { title: THE_CLEAN_CODER, quantity: ONE }, { title: CLEAN_ARCHITECTURE, quantity: ONE }, { title: TEST_DRIVEN_DEVELOPMENT, quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 160');
  });

  test("When user buy five different books then twenty five percent discount is applied", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: CLEAN_CODE, quantity: ONE }, { title: THE_CLEAN_CODER, quantity: ONE }, { title: CLEAN_ARCHITECTURE, quantity: ONE }, { title: TEST_DRIVEN_DEVELOPMENT, quantity: ONE }, { title: LEGACY_CODE, quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 187.5');
  });

});
