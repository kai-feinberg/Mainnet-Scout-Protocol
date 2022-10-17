
const main = async () =>  {
  try{

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  console.log("deploying contract")
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("transactions deployed to:", transactions.address);
  } catch(error){
    console.log(error);
  }
}

const runMain = async () =>{
  try{
    await main();
    process.exit(0);
  } catch (error){
    console.error(error);
    process.exit(1);
  }
}

runMain();

//transactions deployed to 0xD7CfE149987636B626f6E03DEf2800EaFEa2e5cb
