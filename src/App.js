import React, { useState } from 'react';
import { booksConstants } from './constants/appConstants';
import './App.css';

const { ZERO, ONE, BOOK_PRICE } = booksConstants

function App() {
  const [cleanCodeQuantity, setCleanCodeQuantity] = useState(ZERO);
  const [totalPrice, setTotalPrice] = useState(ZERO);

  const calculateBooksPrice = () => {
    if (cleanCodeQuantity === ONE) { setTotalPrice(BOOK_PRICE) }
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
        <button onClick={() => calculateBooksPrice()}>Calculate Total Price</button>
        <h4>{`Total price: ${totalPrice}`}</h4>
      </section>
    </div>
  );
}

export default App;
