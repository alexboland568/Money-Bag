import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Business } from './components/Business';
import { Managers } from './components/Managers';
import { AwayEarningModal } from './components/AwayEarningModal';
import { GuideModal } from './components/GuideModal';
import {InvestModal} from "./components/InvestModal";
import { objectToList } from './utils/game';

import {Auth} from "./components/Auth"

import './App.css';

function App() {

  localStorage.clear();

  const balance = useSelector(state => state.balance);
  
  const businesses = useSelector(state => state.businesses);

  const awayEarning = useSelector(state => state.awayEarning);
  const [investModalShow, setInvestModalShow] = useState(false);
  const [awayEarningShow, setAwayEarningShow] = useState(false);
  const [guideModalShow, setGuideModalShow] = useState(false);

  var [investAmount, setInvestAmount] = useState(0);

  useEffect(() => {
    if (awayEarning && awayEarning.amount) {
      setAwayEarningShow(true);
    }
  }, [awayEarning]);

  useEffect(() => {
    if (!balance.amount) {
      setGuideModalShow(true);
    }
  }, [balance]);

  useEffect(() => {

    if (!balance.amount) {

        setInvestModalShow(true);

    }

  }, [balance]);

  return (
    <>
      <div className="App">

        <Router>
          <Routes>
	          <Route path = "/auth" element = {<Auth />} />
            <Route path = "/play" element = {<div>
        <div className="side-bar">
          <img src={process.env.PUBLIC_URL + '/images/capitalist.png'} alt="Capitalist"/>
          <img src ={process.env.PUBLIC_URL + "/images/chatBubble.png"} id = "chatID" alt = "Chat Bubble" /> 
          <Managers/>
        </div>
         <div className="main">
          <div className="balance">
            <span>${balance.amount.toLocaleString()}</span>
          </div>
          <div className="businesses">
            
            {objectToList(businesses).map(item => 
              <Business {...item} timeTaken={item.timeTaken*1000} key={item.id}  /> 
            )}
          </div>
        </div>
        </div>} />
          </Routes>
        </Router>
       
       
      </div>

      {
          investModalShow && 
          <InvestModal onClose = {(investedAmount) => {

              setInvestModalShow(false);
              setInvestAmount(50);
              
          }} />
          //<InvestModal onClose = {() => setInvestModalShow(false), (investedAmount) => setInvestAmount(investedAmount)}/>
          
      }

      {awayEarningShow &&
        <AwayEarningModal onClose={() => setAwayEarningShow(false)}/>
      }
      {guideModalShow && !investModalShow && 
        <GuideModal onClose={() => setGuideModalShow(false)}/>
      }

    </>
  );
}

export default App;
