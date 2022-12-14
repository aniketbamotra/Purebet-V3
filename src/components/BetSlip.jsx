import React, { useState } from "react";
import axios from "axios";
import "../pages/index.scss";
import "@solana/web3.js";
import bytebuffer from "bytebuffer";

var solanaWeb3 = require("@solana/web3.js");
var connection = new solanaWeb3.Connection(
  "https://devnet.genesysgo.net/",
  "confirmed"
);

const BetSlip = ({
  betData,
  betSlipOpen,
  setBetSlipOpen,
  setChangedOdds,
  setChangedStake,
  changedOdds,
  changedStake,
  walletAdd,
  accArrStake,
  accArray,
}) => {
  const [resData, setResData] = useState("");
  const [succPop, setSuccPop] = useState();
  const [hash, setHash] = useState("https://explorer.solana.com");
  const placeBets = async (e) => {
    e.preventDefault();
    try {
      if(walletAdd == ""){
        //make a new commit for gatsby to see, why isn't this deploying?
        alert("Please connect your Phantom Wallet first. ");
        return;
      }
      const oriOdds = betData[2];
      const oriStake = betData[3];
      let finalArr = [];
      let changedStakeCopy = changedStake;
      console.log(accArrStake);
      console.log(accArray);
      for (let i = 0; i < accArrStake.length; i++) {
        if (oriOdds != changedOdds) {
          finalArr.push({
            odds: changedOdds,
            originalOdds: oriOdds,
            stake: changedStake,
            originalStake: changedStake,
            acc: "",
          });
          break;
        }
        let acctemp = accArray[i];
        let stakeTemp = accArrStake[i];
        if ((i == accArrStake.length - 1 || changedStakeCopy < stakeTemp)) {          
          finalArr.push({
            odds: changedOdds,
            originalOdds: oriOdds,
            stake: changedStakeCopy,
            originalStake: stakeTemp,
            acc: acctemp,
          });
          break;
        }
        finalArr.push({
          odds: changedOdds,
          originalOdds: oriOdds,
          stake: stakeTemp,
          originalStake: stakeTemp,
          acc: acctemp,
        });
        //setChangedStake((prev) => prev - stakeTemp);
        changedStakeCopy -= stakeTemp;
      }
      console.log(finalArr);
      const json = JSON.stringify(finalArr);
      const res = await axios.post(
        `https://usdcbetplacer.mbdqwfss.repl.co?id1=0&id2=${betData[0]}&ha=${betData[1]}&bettor=${walletAdd}`,
        json
      );
      console.log(res);
      console.log(res.data);
      let resultHex = res.data;
      // change hex result to decimal
      // const htd = (hex) => {
      //   let resByte = parseInt(hex, 16);
      //   setResData(resByte);
      // };
      // htd(res.data);
      // console.log(resData);
      var result = [];
      while (resultHex.length >= 2) {
        result.push(parseInt(resultHex.substring(0, 2), 16));
        resultHex = resultHex.substring(2, resultHex.length);
      }
      var transaction = solanaWeb3.Transaction.from(result);
      let signed = await window.solana.signTransaction(transaction);
      let signature = await connection.sendRawTransaction(signed.serialize());
      console.log(signature);
      setBetSlipOpen(false);
      if (signature != "") {
        const timeOut = setTimeout(() => {
          setSuccPop(true);
          setHash("https://explorer.solana.com/tx/" + signature + "?cluster=devnet");
        }, 2000);
        return () => clearInterval(timeOut);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeSlip = () => {
    setBetSlipOpen(false);
  };

  const handleChangedOdds = (event) => {
    setChangedOdds(event.target.value);
  };
  const handleChangedStake = (event) => {
    setChangedStake(event.target.value);
  };

  const closeSucc = () => {
    setSuccPop(false);
  };

  console.log(changedStake);
  console.log(betData);
  console.log(walletAdd);
  return (
    <div>
      <div
        className={`succ-wrap ${succPop && "succ-open"}`}
        onClick={closeSucc}
      >
        <div className={`succ-pop sans ${succPop && "succ-open"}`}>
          Transaction Successful! <a href = {hash} target = "_blank"> Explorer </a>
        </div>
      </div>
      <div
        className={`betslip-wrapper ${betSlipOpen && "betslip-closed"}`}
        onClick={closeSlip}
      ></div>
      <div className={`betslip-container ${betSlipOpen && "betslip-closed"}`}>
        <form action="">
          <label htmlFor="odds-input" className="serif-400">
            Odds
          </label>
          <br />
          <input
            type="text"
            required
            id="odds-input"
            className="sans"
            value={changedOdds}
            onChange={handleChangedOdds}
          />
          <br />
          <br />
          <label htmlFor="stake-input" className="serif-400">
            Stake
          </label>
          <br />
          <input
            required
            type="text"
            id="stake-input"
            className="sans"
            value={changedStake}
            onChange={handleChangedStake}
          />
          <br />
          <br />
          <label htmlFor="total-field" className="serif-400">
            Returns
          </label>
          <br />
          <input
            type="text"
            id="total-field"
            className="sans"
            value={(changedOdds * changedStake).toFixed(2)}
            readOnly
          />
          <br />
          <br />
          <button type="submit" className="cta-btn sans" onClick={placeBets}>
            Place Bet
          </button>
        </form>
      </div>
    </div>
  );
};

export default BetSlip;
