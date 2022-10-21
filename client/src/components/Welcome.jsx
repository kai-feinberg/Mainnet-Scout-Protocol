import React, { useContext, useState } from "react";
import { Footer, Services, Transactions, Contacts } from ".";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import logo from "../../images/scoutLogo.png";
import usdcImage from "../../images/usdc (1).png";
import ethImage from "../../images/ethereum.png";
import maticImage from "../../images/polygon.png";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ethers } from "ethers";
import { contractABI, contractAddress, usdcAddress, usdcABI, maticABI, maticAddress } from "../utils/constants";
import Notiflix from 'notiflix';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Select from '@mui/material/Select';
//import PopUp from './PopUp.jsx'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { ErrorCode } from "@ethersproject/logger";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// let contractAddress= ContractAddress;
// let contractABI= ContractABI; 
// let usdcAddress = usdcAddress;
// let usdcABI = usdcABI;

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Welcome = () => {
  //destructures all data generated from our context file
  const { currentAccount, connectWallet, disconnectWallet, handleChange, formData, isLoading, setIsLoading, contacts } = useContext(TransactionContext);
  const [currentPin, setCurrentPin] = useState("");
  const [pinData, setPinData] = useState("");
  const { ethereum } = window;
  const [pinLoading, setPinLoading] = useState(false);
  const [seen, setSeen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactAdd, setContactAdd] = useState("");
  const [erc20, setErc20] = React.useState("ETH");
  const [recipient, setRecipient] = useState("");
  //const [transactionCount, setTransactionCount] = useState()
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [recName, setRecName] = useState("");

  const txnScroll = () => {
    document.getElementById('txns').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const cntScroll = () => {
    document.getElementById('contacts').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  const walletInfo = () => {
    Notiflix.Report.info("More integrations coming Soon!", "Currently Scout supports ETH, MATIC, and USDC on the Ethereum mainnet. As of now, users must have a metamask wallet to utilize Scout. However, we are working on extending support to other wallets. More wallets, tokens, and networks coming soon...", "Can't wait!");
  }
  const openDocs = () =>{
    window.open("https://github.com/kai-feinberg/Mainnet-Scout-Protocol");
  }
  const openVid = () => {
    window.open("https://youtu.be/1m3LEJq3gRs");
  }
  const Navbar = () => {

    return (
      <nav className="w-full flex md:justify-center justify-between items-center p-2">
        <div className="md:flex-[0.5] flex-initial justify-left items-center">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>

        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          <button type="button" onClick={txnScroll} className="mx-4 cursor-pointer">
            Transactions
          </button>
          <button type="button" onClick={cntScroll} className="mx-4 cursor-pointer">
            Contacts
          </button>
          <button type="button" onClick={walletInfo} className="mx-4 cursor-pointer">
            Wallets
          </button>
          <button type="button" onClick={openVid} className="mx-4 cursor-pointer">
            Tutorial
          </button>
          <button type="button" onClick={openDocs} className="mx-4 cursor-pointer">
            Docs
          </button>

          {!currentAccount &&
          <button
            type="button"
            onClick={connectWallet}
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Login
          </button>
          }
          
          {currentAccount &&
          <button
            type="button"
            onClick={disconnectWallet}
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Change Account
          </button>
          }


        </ul>

        {/*creates a mobile view */}
        <div className="flex relative">
          {!toggleMenu && (
            <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
          )}
          {toggleMenu && (
            <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
          )}
          {toggleMenu && (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
              <button type="button" onClick={txnScroll} className="my-2 text-lg">
                Transactions
              </button>
              <button type="button" onClick={cntScroll} className="my-2 text-lg">
                Contacts
              </button>
              <button type="button" onClick={txnScroll} className="my-2 text-lg">
                Tutorials
              </button>
              <button type="button" onClick={walletInfo} className="my-2 text-lg">
                Wallets
              </button>
            </ul>
          )}
        </div>
      </nav>
    );

  };

  const changeSeen = () => {
    setSeen(!seen);
  };

  const handlePin = (e, htmlname) => {
    setPinData((prevState) => ({ ...prevState, [htmlname]: e.target.value }));
  };

  const tokenSelect = () => {
    return (
      <div>
        <ThemeProvider theme={darkTheme}>
          <Select
            id="token-select"
            value={erc20}
            onChange={handleErc20}
            label="token"
            className="w-full h-[36px]"
          >
            <MenuItem value={"ETH"}>ETH</MenuItem>
            <MenuItem value={"MATIC"}>MATIC</MenuItem>
            <MenuItem value={"USDC"}>USDC</MenuItem>
          </Select>

        </ThemeProvider>
      </div>
    );
  }

  const sendTransaction = async () => {
    //console.log("currently loading: ", isLoading);

    try {
      if (ethereum) {
        const { amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);
        

        //requests a p-2-p txn to be signed from metamask
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount, //state variable
            to: recipient,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });
        
        // console.log("currently loading: ", isLoading);
        const transactionHash = await transactionsContract.addToBlockchain(recipient, parsedAmount, message, keyword, erc20);
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        // const transactionsCount = await transactionsContract.getTransactionCount();
        // setTransactionCount(transactionsCount.toNumber());
       
        
        Notiflix.Notify.success("Transaction " + JSON.stringify(transactionHash.hash) + " completed successfully", { pauseOnHover: true });
        setTimeout(function(){window.location.reload();}, 3000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {

      const strerr = error.toString();
      if (strerr.search('Error: cannot estimate gas;')>0){
        Notiflix.Notify.failure(`Not enough ${erc20}`);
      }
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendUsdc = async () => {

    try {
      if (ethereum) {
        const { amount, keyword, message } = formData;
        const usdcContract = createUsdcContract();
        const transactionsContract = createEthereumContract();
        // console.log(usdcContract);
        let parsedAmount = ethers.utils.parseEther(amount);
        parsedAmount = parsedAmount/10**12;
        console.log(parsedAmount);
        //need to input proper number of decimals in parseUnits function above

        //requests a p-2-p txn to be signed from metamask
        await usdcContract.transfer(recipient, parsedAmount);
        const transactionHash = await transactionsContract.addToBlockchain(recipient, parsedAmount, message, keyword, erc20);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

         Notiflix.Notify.success("Transaction " + JSON.stringify(transactionHash.hash) + " completed successfully", { pauseOnHover: true });
        setTimeout(function(){window.location.reload();}, 3000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      const strerr = error.toString();
      if (strerr.search('ERC20: transfer amount exceeds balance')>0){
        Notiflix.Notify.failure(`Not enough ${erc20}`);
      }
      console.log(error);
    }
  };

  const sendMatic = async () => {
    try {
      if (ethereum) {
        const { amount, keyword, message } = formData;
        const maticContract = createMaticContract();
        const transactionsContract = createEthereumContract();
        // console.log(usdcContract);
        let parsedAmount = ethers.utils.parseEther(amount);
        parsedAmount = parsedAmount;
        console.log(parsedAmount);
        //need to input proper number of decimals in parseUnits function above

        //requests a p-2-p txn to be signed from metamask
        await maticContract.transfer(recipient, parsedAmount);
        const transactionHash = await transactionsContract.addToBlockchain(recipient, parsedAmount, message, keyword, erc20);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

         Notiflix.Notify.success("Transaction " + JSON.stringify(transactionHash.hash) + " completed successfully", { pauseOnHover: true });
        setTimeout(function(){window.location.reload();}, 3000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {

      const strerr = error.toString();
      if (strerr.search('method="estimateGas"')>0){
        Notiflix.Notify.failure(`Not enough ${erc20}`);
      }
      console.log(error);
    }
  };


  const handleSubmit = async (e) => {
    const { addressTo, amount, keyword, message } = formData;
    //find true pin from smart contract
    const transactionsContract = createEthereumContract();
    //const pin = await transactionsContract.getPin(addressTo);
    const pin = await transactionsContract.getPin(recipient);
    const truePin = parseInt(pin._hex, 16);
    //prevents reload
    e.preventDefault();

    if (!recipient || !amount || !keyword || !message) return;
    //check if inputted pin is same as true pin
    // true pin is an object which must be converted to a string with JSON.stringify
    Confirm.ask(
      'Confirm Pin',
      'Please enter the recipients public pin',
      JSON.stringify(truePin),
      'submit',
      'cancel',

      () => {
        if (erc20 === "USDC") {
          sendUsdc();
        }
        else if (erc20=="MATIC"){
          sendMatic();
        }
        else {
          sendTransaction();
        }

      },
      () => {
        console.log('ahhhhhhhh the pain');
      },
      {/*extra options */ }
    );

  };


  //pin data is an object with a pin data property for some reason
  const changePin = async () => {
    const transactionsContract = createEthereumContract();
    const pinUpdate = await transactionsContract.setPin(parseInt(pinData.pinData));

    setPinLoading(true);
    await pinUpdate.wait();
    setPinLoading(false);
    Notiflix.Notify.success('Pin changed successfully to ' + JSON.stringify(pinData.pinData));
    setCurrentPin(pinData);

  }

  const changeRecName = (contact) => {
    if (contact.address === recipient && recipient !== "") {
      setRecName(contact.name);
    }
  }
  const checkName = () => {
    setRecName("not added");
    [...contacts].map((contact, i) => (changeRecName(contact)))
  }

  const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    //creates contract object in JSX
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;
  };

  const createUsdcContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    // console.log(usdcABI);
    // console.log(contractABI);

    //creates contract object in JSX
    const usdcContract = new ethers.Contract(usdcAddress, usdcABI, signer);
    return usdcContract;
  };

  const createMaticContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    //creates contract object in JSX
    const maticContract = new ethers.Contract(maticAddress, maticABI, signer);
    return maticContract;
  }

  const handleErc20 = (event) => {
    setErc20(event.target.value);
    console.log(erc20);
  };
  
  const ercImage = () =>{
    if (erc20==="ETH"){
    return(
      <div className="inline-block mt-1"> 
        <img  style={{width:18, height:28}} src= {ethImage}/>
      </div>
      
    );
    }
    else if (erc20 === "MATIC"){
      return(
        <div className="inline-block mt-1"> 
          <img  style={{width:28, height:28}} src= {maticImage}/>
        </div>
        
      );
    }
    else if (erc20 === "USDC"){
      return(
        <div className="inline-block mt-1"> 
          <img  style={{width:28, height:28}} src= {usdcImage}/>
        </div>
        
      );
    }
  }

  useEffect(() => {
    // declare the async data fetching function
    const setInitialPin = async () => {
      const transactionsContract = createEthereumContract();
      const p = await transactionsContract.getPin(currentAccount);
      //console.log("pin = ", p);
      // set state with the result
      setCurrentPin(p);
      //console.log("initial pin", currentPin);
    }

    setInitialPin()
      .catch(console.error);
  })

  useEffect(() => checkName(), [recipient]);

  return (
    <div>
      <div className="gradient-bg-welcome">
        {Navbar()}
        <div className="flex w-full justify-center items-center">
          <div className="flex mf:flex-row flex-col items-start justify-between py-10 px-20">
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Send Crypto <br /> without the stress
              </h1>
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                Explore blockchain. Send crypto safely with SCOUT!
              </p>
              {!currentAccount && (
                <button
                  type="button"
                  onClick={connectWallet}
                  className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                >
                  <AiFillPlayCircle className="text-white mr-2" />
                  <p className="text-white text-base font-semibold">
                    Connect Wallet
                  </p>
                </button>
              )}
              {currentAccount && (
                <div className="flex flex-row justify-center items-center" >
                  {pinLoading
                    ? <button
                      type="button"

                      className="flex flex-row col-25 justify-center items-center my-4 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    >
                      <p className="text-white text-base font-semibold">
                        <div class="lds-dual-ring"></div>
                      </p>
                    </button>

                    : (
                      <button
                        type="button"
                        onClick={pinData && changePin}
                        className="col-25 flex flex-col justify-center items-center my-4 mx-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                      >
                        <p className="text-white text-base font-semibold">
                          Set Pin
                        </p>
                      </button>
                    )}
                  <div className="p-2 col-75 sm:w-40 w-20 my-4 justify-center items-center blue-glassmorphism">
                    <Input placeholder="New pin" name="pinData" type="text" handleChange={handlePin} />
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                  Secure
                </div>
                <div className={companyCommonStyles}>Multi-Coin</div>
                <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                  Decentralized
                </div>
                <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                  Web 3.0
                </div>
                <div className={companyCommonStyles}>Free</div>
                <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                  Intuitive
                </div>
              </div>
            </div>


          </div>

          <br></br>
          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-100">
            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div>
                  <p className="text-white font-light text-sm">
                    {shortenAddress(currentAccount)}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Public Pin: {currentAccount ? (parseInt(currentPin._hex, 16)) : '0000'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <ThemeProvider theme={darkTheme}>
                <Autocomplete
                  id="freeSolo"
                  freeSolo
                  options={contacts.map((option) => option.address)}
                  renderInput={(params) =>
                    <TextField {...params} label="Recipient Address/Contact" margin="dense" variant="outlined"
                    />}
                  className="w-full flex flex-col px-1 rounded-sm  outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
                  style={{ height: 70 }}
                  value={recipient}
                  onChange={(_event, newRecipient) => {
                    if (newRecipient !== null) {
                      console.log(newRecipient);
                      if (typeof (newRecipient) === "object") {
                        // console.log((newRecipient.address));
                        setRecipient(newRecipient.address);
                        // console.log(recipient);
                      } else {
                        setRecipient(newRecipient);
                      }
                    }
                  }}
                />
              </ThemeProvider>
              <p className="text-white font-light text-sm align-left"> Recipient: {recName}</p>

              <div className="w-full">
                <table className="w-full mt-2">
                  <thead className="w-full">
                    <tr>
                      <th>{tokenSelect()}</th>
                      <th className="font-normal"><Input placeholder={`Amount in ${erc20}`} name="amount" type="number" handleChange={handleChange} /></th>
                      <th> {ercImage()}</th>
                    </tr>
                  </thead>
                </table>
              </div>


              <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
              <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {isLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Confirm Pin
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      <Services />
      <div id="contacts"> <Contacts />  </div>
      <div id="txns"> <Transactions /> </div>
      <Footer />
    </div>
  );
};

export default Welcome;
