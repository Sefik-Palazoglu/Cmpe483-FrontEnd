import { useEffect, useState } from 'react';
import './App.css';
import {balanceOf, donateEther, faucet, init} from './Web3Client'
import React from 'react';

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    init();
  }, [])

  const fetchBalanceOf = () => {
    balanceOf().then(coinCount => {
      setBalance(coinCount);
      console.log(coinCount);
    }).catch(err => {
      console.log(err);
    })
  }

  const callFaucet = () => {
    faucet().then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  const sendDonateEther = (valueInWei) => {
    donateEther(valueInWei).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleDonateSubmit = (event) => {
    event.preventDefault();
    sendDonateEther(event.target.wei.value);
  }

  return (
    <div className="App">
      {<button onClick={() => fetchBalanceOf()}>balanceOf {balance}</button>}
      {<button onClick={() => callFaucet()}>faucet </button>}
      
      <form onSubmit = {handleDonateSubmit}>
        <label>
          Wei:
          <input type="text" name="wei" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
