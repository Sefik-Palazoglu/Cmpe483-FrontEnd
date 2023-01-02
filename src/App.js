import { useEffect, useState } from 'react';
import './App.css';
import {balanceOf, delegateVoteTo, donateEther, donateMyGovToken, faucet, init} from './Web3Client'
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
  
  const sendDelegateVoteTo = (address, projectId) => {
    delegateVoteTo(address, projectId).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleDelegateVoteTo = (event) => {
    event.preventDefault();
    sendDelegateVoteTo(event.target.address.value, event.target.projectId.value);
  }

  const sendDonateMyGovToken = (amount) => {
    donateMyGovToken(amount).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleDonateMyGovTokenSubmit = (event) => {
    event.preventDefault();
    sendDonateMyGovToken(event.target.amount.value);
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

      <form onSubmit = {handleDelegateVoteTo}>
        <label>
          Delegate Vote To:
          Address:
          <input type="text" name="address" />
          ProjectId:
          <input type="text" name="projectId" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit = {handleDonateMyGovTokenSubmit}>
        <label>
          donateMyGovToken:
          Amount:
          <input type="text" name="amount" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
