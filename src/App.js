import { useEffect, useState } from 'react';
import './App.css';
import {balanceOf, delegateVoteTo, donateEther, donateMyGovToken, faucet, init, voteForProjectProposal, voteForProjectPayment, submitProjectProposal, submitSurvey, takeSurvey, reserveProjectGrant, withdrawProjectPayment, getSurveyResults} from './Web3Client'
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

  const sendVoteForProjectProposal = (projectId, choice) => {
    voteForProjectProposal(projectId, choice).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleVoteForProjectProposal = (event) => {
    event.preventDefault();
    sendVoteForProjectProposal(event.target.projectId.value, event.target.choice.value);
  }

  const sendVoteForProjectPayment = (projectId, choice) => {
    voteForProjectPayment(projectId, choice).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleVoteForProjectPayment = (event) => {
    event.preventDefault();
    sendVoteForProjectPayment(event.target.projectId.value, event.target.choice.value);
  }

  let handleSubmitProjectProposal = (event) => {
    event.preventDefault();
    sendSubmitProjectProposal(
      event.target.ipfshash.value, 
      event.target.votedeadline.value,
      event.target.paymentamounts.value.split(','),
      event.target.payschedule.value.split(','),
      event.target.valueInWei.value);
  }

  const sendSubmitProjectProposal = (ipfshash, votedeadline, paymentamounts, payschedule, valueInWei) => {
    submitProjectProposal(ipfshash, votedeadline, paymentamounts, payschedule, valueInWei).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  const sendSubmitSurvey = (ipfshash, surveydeadline, numchoices, atmostchoice, valueInWei) => {
    submitSurvey(ipfshash, surveydeadline, numchoices, atmostchoice, valueInWei).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleSubmitSurvey = (event) => {
    event.preventDefault();
    sendSubmitSurvey(
      event.target.ipfshash.value, 
      event.target.surveydeadline.value,
      event.target.numchoices.value,
      event.target.atmostchoice.value,
      event.target.valueInWei.value);
  }

  const sendTakeSurvey = (surveyid, choices) => {
    takeSurvey(surveyid, choices).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleTakeSurvey = (event) => {
    event.preventDefault();
    sendTakeSurvey(
      event.target.surveyid.value, 
      event.target.choices.value.split(','));
  }

  const sendReserveProjectGrant = (projectid) => {
    reserveProjectGrant(projectid).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleReserveProjectGrant = (event) => {
    event.preventDefault();
    sendReserveProjectGrant(
      event.target.projectid.value);
  }

  const sendWithdrawProjectPayment = (projectid) => {
    withdrawProjectPayment(projectid).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleWithdrawProjectPayment = (event) => {
    event.preventDefault();
    sendWithdrawProjectPayment(
      event.target.projectid.value);
  }

  const sendGetSurveyResults = (surveyid) => {
    getSurveyResults(surveyid).then(tx => {
      console.log(tx);
    }).catch(err => {
      console.log(err);
    })
  }

  let handleGetSurveyResults = (event) => {
    event.preventDefault();
    sendGetSurveyResults(
      event.target.surveyid.value);
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

      <form onSubmit = {handleVoteForProjectProposal}>
        <label>
          voteForProjectProposal:
          projectId:
          <input type="text" name="projectId" />
          choice:
          <input type="text" name="choice" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <form onSubmit = {handleVoteForProjectPayment}>
        <label>
          voteForProjectPayment:
          projectId:
          <input type="text" name="projectId" />
          choice:
          <input type="text" name="choice" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <form onSubmit = {handleSubmitProjectProposal}>
        <label>
          submitProjectProposal:
          ipfshash:
          <input type="text" name="ipfshash" />
          votedeadline:
          <input type="text" name="votedeadline" />
          paymentamounts:
          <input type="text" name="paymentamounts" />
          payschedule:
          <input type="text" name="payschedule" />
          valueInWei:
          <input type="text" name="valueInWei" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <form onSubmit = {handleSubmitSurvey}>
        <label>
          submitSurvey:
          ipfshash:
          <input type="text" name="ipfshash" />
          surveydeadline:
          <input type="text" name="surveydeadline" />
          numchoices:
          <input type="text" name="numchoices" />
          atmostchoice:
          <input type="text" name="atmostchoice" />
          valueInWei:
          <input type="text" name="valueInWei" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <form onSubmit = {handleTakeSurvey}>
        <label>
          takeSurvey:
          surveyid:
          <input type="text" name="surveyid" />
          choices:
          <input type="text" name="choices" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <form onSubmit = {handleReserveProjectGrant}>
        <label>
          reserveProjectGrant:
          projectid:
          <input type="text" name="projectid" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <form onSubmit = {handleWithdrawProjectPayment}>
        <label>
          withdrawProjectPayment:
          projectid:
          <input type="text" name="projectid" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <form onSubmit = {handleGetSurveyResults}>
        <label>
          getSurveyResults:
          surveyid:
          <input type="text" name="surveyid" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
