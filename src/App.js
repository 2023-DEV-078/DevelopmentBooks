import React, { useState, useEffect } from 'react'
import { booksConstants } from './constants/appConstants'
import './App.css'

const {
    ZERO,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    BOOK_PRICE,
    FIVE_PERCENT,
    TEN_PERCENT,
    TWENTY_PERCENT,
    TWENTY_FIVE_PERCENT,
    CLEN_CODE,
    THE_CLEAN_CODER,
    CLEAN_ARCHITECTURE,
    TEST_DRIVEN_DEVELOPMENT,
    LEGACY_CODE,
} = booksConstants

function App() {
    const [cleanCodeQuantity, setCleanCodeQuantity] = useState(ZERO)
    const [cleanCoderQuantity, setCleanCoderQuantity] = useState(ZERO)
    const [cleanArchitectureQuantity, setCleanArchitectureQuantity] =
        useState(ZERO)
    const [tddQuantity, setTddQuantity] = useState(ZERO)
    const [legacyCodeQuantity, setLegacyCodeQuantity] = useState(ZERO)
    const [totalPrice, setTotalPrice] = useState(ZERO)
    const [shoppingCart, setShoppingCart] = useState([])

    useEffect(() => {
        setShoppingCart([
            ...Array(cleanCodeQuantity).fill(CLEN_CODE),
            ...Array(cleanCoderQuantity).fill(THE_CLEAN_CODER),
            ...Array(cleanArchitectureQuantity).fill(CLEAN_ARCHITECTURE),
            ...Array(tddQuantity).fill(TEST_DRIVEN_DEVELOPMENT),
            ...Array(legacyCodeQuantity).fill(LEGACY_CODE),
        ])
    }, [
        cleanCodeQuantity,
        cleanCoderQuantity,
        cleanArchitectureQuantity,
        tddQuantity,
        legacyCodeQuantity,
    ])

    const seperateBooksToGroupOfSets = () => {
        const groupsOfBooks = []
        while (!shoppingCart.every((book) => !book)) {
            const groupOfBooks = []
            shoppingCart.forEach((book, index) => {
                if (!groupOfBooks.includes(book) && book) {
                    groupOfBooks.push(book)
                    shoppingCart[index] = false
                }
            })
            groupsOfBooks.push(groupOfBooks)
        }
        return groupsOfBooks
    }

    const calculateBooksPrice = () => {
        let totalPrice = ZERO
        const setsOfBooks = seperateBooksToGroupOfSets()

        setsOfBooks.forEach((setOfBook) => {
            if (setOfBook.length === FIVE) {
                totalPrice += FIVE * BOOK_PRICE * TWENTY_FIVE_PERCENT
            } else if (setOfBook.length === FOUR) {
                totalPrice += FOUR * BOOK_PRICE * TWENTY_PERCENT
            } else if (setOfBook.length === THREE) {
                totalPrice += THREE * BOOK_PRICE * TEN_PERCENT
            } else if (setOfBook.length === TWO) {
                totalPrice += TWO * BOOK_PRICE * FIVE_PERCENT
            } else if (setOfBook.length === ONE) {
                totalPrice += BOOK_PRICE
            }
        })
        setTotalPrice(totalPrice)
    }

    return (
        <div className="App">
            <h3>Book price calculator - TDD</h3>
            <section className="booksContainer">
                <div className="bookInput">
                    <label htmlFor="clean-code">Clean Code</label>
                    <input
                        type="number"
                        min={ZERO}
                        id="clean-code"
                        value={cleanCodeQuantity}
                        onChange={(e) =>
                            setCleanCodeQuantity(Number(e.target.value))
                        }
                    ></input>
                </div>
                <div className="bookInput">
                    <label htmlFor="clean-coder">The Clean Coder</label>
                    <input
                        type="number"
                        min={ZERO}
                        id="clean-coder"
                        value={cleanCoderQuantity}
                        onChange={(e) =>
                            setCleanCoderQuantity(Number(e.target.value))
                        }
                    ></input>
                </div>
                <div className="bookInput">
                    <label htmlFor="clean-architecture">
                        Clean Architecture
                    </label>
                    <input
                        type="number"
                        min={ZERO}
                        id="clean-architecture"
                        value={cleanArchitectureQuantity}
                        onChange={(e) =>
                            setCleanArchitectureQuantity(Number(e.target.value))
                        }
                    ></input>
                </div>
                <div className="bookInput">
                    <label htmlFor="tdd">Test Driven Development</label>
                    <input
                        type="number"
                        id="tdd"
                        min={ZERO}
                        value={tddQuantity}
                        onChange={(e) => setTddQuantity(Number(e.target.value))}
                    ></input>
                </div>
                <div className="bookInput">
                    <label htmlFor="legacy-code">Legacy Code</label>
                    <input
                        type="number"
                        id="legacy-code"
                        min={ZERO}
                        value={legacyCodeQuantity}
                        onChange={(e) =>
                            setLegacyCodeQuantity(Number(e.target.value))
                        }
                    ></input>
                </div>
                <button onClick={() => calculateBooksPrice()}>
                    Calculate Total Price
                </button>
                <h4>{`Total price: ${totalPrice}`}</h4>
            </section>
            <section className="specialOffer">
                <p data-testid="info-title">Our special offers for today:</p>
                <p data-testid="info-5%">
                    Buy 2 different books and get a 5% discount on them
                </p>
                <p data-testid="info-10%">
                    Buy 3 different books and get a 10% discount on them
                </p>
                <p data-testid="info-20%">
                    Buy 4 different books and get a 20% discount on them
                </p>
                <p data-testid="info-25%">
                    Buy 5 different books and get a 25% discount on them
                </p>
            </section>
        </div>
    )
}

export default App
