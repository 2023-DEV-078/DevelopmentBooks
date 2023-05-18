import { render, screen, fireEvent } from '@testing-library/react'
import { booksConstants } from './constants/testConstants'
import App from './App'

const {
    ONE,
    TWO,
    THREE,
    FOUR,
    CLEAN_CODE,
    THE_CLEAN_CODER,
    CLEAN_ARCHITECTURE,
    TEST_DRIVEN_DEVELOPMENT,
    LEGACY_CODE,
} = booksConstants

const addBooksAndCalculatePrice = (orderedBooks) => {
    orderedBooks.forEach((book) => {
        const input = screen.getByLabelText(book.title)
        fireEvent.change(input, { target: { value: book.quantity } })
    })

    const calculatePrice = screen.getByRole('button', {
        name: /Calculate Total Price/i,
    })
    fireEvent.click(calculatePrice)
}

describe('Book price calculator - Tests', () => {
    test('Display title', () => {
        render(<App />)
        const title = screen.getByRole('heading', { level: THREE })
        expect(title.innerHTML).toBe('Book price calculator - TDD')
    })

    test('When user buy one book without discount', async () => {
        render(<App />)

        addBooksAndCalculatePrice([{ title: CLEAN_CODE, quantity: ONE }])

        const totalPrice = screen.getByRole('heading', { level: FOUR })
        expect(totalPrice.innerHTML).toBe('Total price: 50')
    })

    test('When user buy two different books then five percent discount is applied', async () => {
        render(<App />)

        addBooksAndCalculatePrice([
            { title: CLEAN_CODE, quantity: ONE },
            { title: THE_CLEAN_CODER, quantity: ONE },
        ])

        const totalPrice = screen.getByRole('heading', { level: FOUR })
        expect(totalPrice.innerHTML).toBe('Total price: 95')
    })

    test('When user buy three different books then ten percent discount is applied', async () => {
        render(<App />)

        addBooksAndCalculatePrice([
            { title: CLEAN_CODE, quantity: ONE },
            { title: THE_CLEAN_CODER, quantity: ONE },
            { title: CLEAN_ARCHITECTURE, quantity: ONE },
        ])

        const totalPrice = screen.getByRole('heading', { level: FOUR })
        expect(totalPrice.innerHTML).toBe('Total price: 135')
    })

    test('When user buy four different books then twenty percent discount is applied', async () => {
        render(<App />)

        addBooksAndCalculatePrice([
            { title: CLEAN_CODE, quantity: ONE },
            { title: THE_CLEAN_CODER, quantity: ONE },
            { title: CLEAN_ARCHITECTURE, quantity: ONE },
            { title: TEST_DRIVEN_DEVELOPMENT, quantity: ONE },
        ])

        const totalPrice = screen.getByRole('heading', { level: FOUR })
        expect(totalPrice.innerHTML).toBe('Total price: 160')
    })

    test('When user buy five different books then twenty five percent discount is applied', async () => {
        render(<App />)

        addBooksAndCalculatePrice([
            { title: CLEAN_CODE, quantity: ONE },
            { title: THE_CLEAN_CODER, quantity: ONE },
            { title: CLEAN_ARCHITECTURE, quantity: ONE },
            { title: TEST_DRIVEN_DEVELOPMENT, quantity: ONE },
            { title: LEGACY_CODE, quantity: ONE },
        ])

        const totalPrice = screen.getByRole('heading', { level: FOUR })
        expect(totalPrice.innerHTML).toBe('Total price: 187.5')
    })

    test('When user buy 4 books, of which 3 are different titles then you get a 10% discount on the three that form part of a set, but the fourth book still costs 50 EUR.', async () => {
        render(<App />)

        addBooksAndCalculatePrice([
            { title: CLEAN_CODE, quantity: TWO },
            { title: THE_CLEAN_CODER, quantity: ONE },
            { title: CLEAN_ARCHITECTURE, quantity: ONE },
        ])

        const totalPrice = screen.getByRole('heading', { level: FOUR })
        expect(totalPrice.innerHTML).toBe('Total price: 185')
    })

    test('Display discount information', async () => {
        render(<App />)

        const informationTitle = screen.getByTestId('info-title')
        const information5Percent = screen.getByTestId('info-5%')
        const information10Percent = screen.getByTestId('info-10%')
        const information20Percent = screen.getByTestId('info-20%')
        const information25Percent = screen.getByTestId('info-25%')

        expect(informationTitle.innerHTML).toBe('Our special offers for today:')
        expect(information5Percent.innerHTML).toBe(
            'Buy 2 different books and get a 5% discount on them'
        )
        expect(information10Percent.innerHTML).toBe(
            'Buy 3 different books and get a 10% discount on them'
        )
        expect(information20Percent.innerHTML).toBe(
            'Buy 4 different books and get a 20% discount on them'
        )
        expect(information25Percent.innerHTML).toBe(
            'Buy 5 different books and get a 25% discount on them'
        )
    })
})
