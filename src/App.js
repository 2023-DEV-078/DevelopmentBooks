import React, { useState, useEffect } from 'react';
import { booksConstants } from './constants/appConstants';
import './App.css';

const { ZERO, ONE, TWO, BOOK_PRICE, FIVE_PERCENT } = booksConstants

function App() {
  const [cleanCodeQuantity, setCleanCodeQuantity] = useState(ZERO);
  const [cleanCoderQuantity, setCleanCoderQuantity] = useState(ZERO);
  const [totalPrice, setTotalPrice] = useState(ZERO);
  const [shoppingCart, setShoppingCart] = useState([])

  useEffect(() => {
    setShoppingCart([cleanCodeQuantity, cleanCoderQuantity].filter((quantity) => { return quantity === 1 }))
  }, [cleanCodeQuantity, cleanCoderQuantity])

  const calculateBooksPrice = () => {
    if (shoppingCart.length === 2) { setTotalPrice(TWO * BOOK_PRICE * FIVE_PERCENT) }
    else if (shoppingCart.length === 1) { setTotalPrice(BOOK_PRICE) }
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
        <button onClick={() => calculateBooksPrice()}>Calculate Total Price</button>
        <h4>{`Total price: ${totalPrice}`}</h4>
      </section>
    </div>
  );
}

export default App;
