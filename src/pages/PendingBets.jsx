import React from "react";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import { useState } from "react";

const PendingBets = () => {
  const [walletAdd, setWalletAdd] = useState("");
  const [pendingData, setPendingData] = useState();
  //var games = [
  const getPendingBets = async () => {
    const res = await axios.get(
      `https://usdcpending.mbdqwfss.repl.co/?key=${walletAdd}`
    );
    console.log(res);
    setPendingData(res.data);
    console.log(walletAdd);
  };
  if (walletAdd == "")
    return (
      <div>
        <Nav setWalletAdd={setWalletAdd} />
        <h3 className="serif-600 p-sect-title">Pending Bets.</h3>
        <h5 className="serif-400 p-msg">Please connect your wallet.</h5>
      </div>
    );

  return (
    <div>
      <Nav setWalletAdd={setWalletAdd} />
      <div>
        <h3 className="serif-600 p-sect-title">Pending Bets.</h3>
        <h5 className="serif-400 p-msg">Please click the button below.</h5>
        <div className="p-bets-btn sans btn" onClick={getPendingBets}>
          Get Pending Bets!!
        </div>
      </div>
      <div>
            <table id = "pendingbets">
              <tr>
                <th> Event </th>
                <th> Backing </th>
                <th> Is Matched? </th>
                <th> Stake </th>
                <th> Odds </th>
              </tr>
            
                  {pendingData.map((bet) => (
                    <tr>
                    <td className = "serif-600">{bet.id1}</td>
                    <td className = "serif-600 team-name">{bet.ha}</td>
                    <td className = "serif-600">{bet.isMatched}</td>
                    <td className = "serif-600">{bet.stake}</td>
                    <td className = "serif-600">{bet.odds}</td>
                    </tr>
                  ))}
            </table>  
        <h4 className="serif-600">Event.</h4>
        <h5 className="serif-400">Date.</h5>
        <div className="bet-event open-bet-details">
          <div>
            <h4 className="serif-600 team-name home-team">Backing Home</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingBets;
