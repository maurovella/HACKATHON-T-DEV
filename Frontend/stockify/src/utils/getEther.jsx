import { RPC_URL, CHAINID, CHAINNAME } from "../contants";
import web3 from "web3";
import toast from 'react-hot-toast';

function switchChain(ether){
  return new Promise((resolve, reject) => {
    ether.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(CHAINID) }]
    })
    .then(() => resolve())
    .catch(async err => {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        ether.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: CHAINNAME,
              chainId: web3.utils.toHex(CHAINID),
              nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
              rpcUrls: [RPC_URL]
            }
          ]
        })
        .then(() => resolve())
        .catch(err => reject(err))
      }
      else reject(err)
    })
  })
  
}

export const getEther = () => {
    return new Promise(async (resolve, reject) => {
      let ether = window.ethereum || window.web3;

      if (!ether){
        console.error('Please install a wallet')
        reject({code: 0, message: "Please install a wallet"})
      }

      if (ether.networkVersion != CHAINID) { // if the chain its not polygon, switch
        console.log(ether.networkVersion, "PELOTE")
        try {
          await toast.promise(
            switchChain(ether),
            {
              loading: 'Connecting to ' + CHAINNAME,
              success: <b>Connected to {CHAINNAME}!</b>,
              error: <b>Could not connect to {CHAINNAME}.</b>,
            })
        }
        catch (err) {
          return reject(err)
        }
       
      }
      
      ether.request({ method: 'eth_requestAccounts' })
           .then(result => resolve(ether))
           .catch(err => reject())
    })
  }