import React, { useContext, useState } from "react";
import { useEffect } from "react";
import g6 from '../../images/Group 6.png';
import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
 
//destructure values from transaction object
const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url, token }) => {
  const { currentAccount, contacts } = useContext(TransactionContext);
  const gifUrl = useFetch({ keyword });
  const [cName, setcName] = useState("unknown");
  const [cNameRec, setcNameRec] = useState("unknown");

  const checkForContact = (contact) =>{
    if (contact.address === addressTo){
      setcName(contact.name);
    }
    if (contact.address === addressFrom){
      setcNameRec(contact.name);
    }
  }
 
  useEffect(() => {[...contacts].map((contact, i) => (checkForContact(contact)))}, []);
  
  if (token== "USDC"){
    amount= amount*10**12;
  }
  if (addressTo.toLowerCase() === currentAccount) {
  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl
      incoming-transaction
      "
    >
    <a href={`https://etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
      <div className="flex flex-col items-center w-full mt-3">


          <div className="display-flex justify-start w-full mb-6 p-2">
            <a href={`https://etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
              <p className="text-white text-base">From: {shortenAddress(addressFrom)} ({cNameRec}) </p>
            </a>
            <a href={`https://etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
              <p className="text-white text-base">To: {shortenAddress(addressTo)} (You)</p>
            </a>
            <p className="text-white text-base">Amount: {amount} {token}</p>
            {message && (
              <>
                <br />
                <p className="text-white text-base">Message: {message}</p>
              </>
            )}
          </div>

          <img
            src={gifUrl || url}
            alt="nature"
            className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
          />

          <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
            <p className="text-[#37c7da] font-bold">{timestamp}</p>
          </div>
        </div>
    </a>
    </div>
  );
   } else {
    //console.log(cName);
    return (
      
      <div className="bg-[#181918] m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl
        outgoing-transaction
        "
      >
      <a href={`https://etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
        <div className="flex flex-col items-center w-full mt-3">
  
  
            <div className="display-flex justify-start w-full mb-6 p-2">
              <a href={`https://etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
                <p className="text-white text-base">From: {shortenAddress(addressFrom)} (You)</p>
              </a>
              <a href={`https://etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
                <p className="text-white text-base">To: {shortenAddress(addressTo)} ({cName}) </p>
              </a>
              <p className="text-white text-base">Amount: {amount} {token}</p>
              {message && (
                <>
                  <br />
                  <p className="text-white text-base">Message: {message}</p>
                </>
              )}
            </div>
  
            <img
              src={gifUrl || url}
              alt="nature"
              className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
            />
  
            <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
              <p className="text-[#37c7da] font-bold">{timestamp}</p>
            </div>
          </div>
      </a>
      </div>
    );
   }
   
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <div>
          <h3 className="text-white text-3xl text-center my-2">
          Latest Transactions
          </h3>
          <img src={g6} alt="logo" className="w-32 cursor-pointer legend" />
          
          <div className="flex flex-wrap justify-center items-center mt-10">
           {[...transactions].reverse().map((transaction, i) => (
             <TransactionsCard key={i} {...transaction} /> //passes data from transaction as props
           ))}
         </div>

        </div>
        ) : (
          <div>
            <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see your latest transactions
            </h3>
            
            <div className="flex flex-wrap justify-center items-center mt-10">
             {[...dummyData].map((transaction, i) => (
               <TransactionsCard key={i} {...transaction} /> //passes data from transaction as props
             ))}
           </div>

          </div>
        )}

     
      </div>
    </div>
  );
};

export default Transactions;
