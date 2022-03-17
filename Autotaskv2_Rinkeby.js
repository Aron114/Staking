const { ethers } = require("ethers");
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');


const ERC20_ABI =[            //ERC20 Contract ABI - Transfer Function
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


exports.handler =  function(credentials) {                       
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
  return exports.main(signer);
}

exports.main = async function(signer) {
    const KNIGHTContractAddress='0xE32Fb9Bba28eD042559E4D132194C80E08a05B8c';           //mKNIGHT Contract Address on Rinkeby 
    const instance = new ethers.Contract(KNIGHTContractAddress, ERC20_ABI, signer);
    const RewardRate = ethers.utils.parseUnits('100');                                 //100mKNIGHT tokens as the RewardRate
    const StakingContractAddress = '0xda825205C218257e193C276AB2625E8f26D19E89';       //Staking Contract Address on Rinkeby
 
	try {  const SendTX = await instance.transfer(StakingContractAddress,RewardRate);   //Transfer mKNIGHT to the Staking Contract on Rinkeby
				return SendTX;
       }

	catch {console.log('not working')
       }
}
