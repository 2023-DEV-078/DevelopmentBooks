import React, { useState, useEffect } from 'react';
import { booksConstants } from './constants/appConstants';
import './App.css';

const { ZERO, ONE, TWO, THREE, FOUR, BOOK_PRICE, FIVE_PERCENT, TEN_PERCENT, TWENTY_PERCENT } = booksConstants

function App() {
  const [cleanCodeQuantity, setCleanCodeQuantity] = useState(ZERO);
  const [cleanCoderQuantity, setCleanCoderQuantity] = useState(ZERO);
  const [cleanArchitectureQuantity, setCleanArchitectureQuantity] = useState(ZERO);
  const [tddQuantity, setTddQuantity] = useState(ZERO)
  const [totalPrice, setTotalPrice] = useState(ZERO);
  const [shoppingCart, setShoppingCart] = useState([])

  useEffect(() => {
    setShoppingCart([cleanCodeQuantity, cleanCoderQuantity, cleanArchitectureQuantity, tddQuantity].filter((quantity) => { return quantity === 1 }))
  }, [cleanCodeQuantity, cleanCoderQuantity, cleanArchitectureQuantity, tddQuantity])

  const calculateBooksPrice = () => {
    if (shoppingCart.length === FOUR) { setTotalPrice(FOUR * BOOK_PRICE * TWENTY_PERCENT) }
    else if (shoppingCart.length === THREE) { setTotalPrice(THREE * BOOK_PRICE * TEN_PERCENT) }
    else if (shoppingCart.length === TWO) { setTotalPrice(TWO * BOOK_PRICE * FIVE_PERCENT) }
    else if (shoppingCart.length === ONE) { setTotalPrice(BOOK_PRICE) }
  }

  return (
    <div className="App">
      <h3>
        Book price calculator - TDD
      </h3>
      <section className='booksContainer'>
        <div className='bookInput'>
          <label htmlFor="clean-code">Clean Code</label>
          <input type="number" min={ZERO} id="clean-code" value={cleanCodeQuantity} onChange={e => setCleanCodeQuantity(Number(e.target.value))}></input>
        </div>
        <div className='bookInput'>
          <label htmlFor="clean-coder">The Clean Coder</label>
          <input type="number" min={ZERO} id="clean-coder" value={cleanCoderQuantity} onChange={e => setCleanCoderQuantity(Number(e.target.value))}></input>
        </div>
        <div className='bookInput'>
          <label htmlFor="clean-architecture">Clean Architecture</label>
          <input type="number" min={ZERO} id="clean-architecture" value={cleanArchitectureQuantity} onChange={e => setCleanArchitectureQuantity(Number(e.target.value))}></input>
        </div>
        <div className='bookInput'>
          <label htmlFor="tdd">Test Driven Development</label>
          <input type="number" id="tdd" min={ZERO} value={tddQuantity} onChange={e => setTddQuantity(Number(e.target.value))}></input>
        </div>
        <button onClick={() => calculateBooksPrice()}>Calculate Total Price</button>
        <h4>{`Total price: ${totalPrice}`}</h4>
      </section>
    </div>
  );
}

export default App;
