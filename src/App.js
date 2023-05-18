import React, { useState } from 'react';
import './App.css';

function App() {
  const [cleanCodeQuantity, setCleanCodeQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateBooksPrice = () => {
    if (cleanCodeQuantity === 1) { setTotalPrice(50) }
  }

  return (
    <div className="App">
      <h3>
        Book price calculator - TDD
      </h3>
      <section className='booksContainer'>
        <div className='bookInput'>
          <label htmlFor="clean-code">Clean Code</label>
          <input type="number" min={0} id="clean-code" value={cleanCodeQuantity} onChange={e => setCleanCodeQuantity(Number(e.target.value))}></input>
        </div>
        <button onClick={() => calculateBooksPrice()}>Calculate Total Price</button>
        <h4>{`Total price: ${totalPrice}`}</h4>
      </section>
    </div>
  );
}

export default App;
