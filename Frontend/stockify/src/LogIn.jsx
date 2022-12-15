import './LogIn.css';
import './app.css';
import Web3 from "web3";
import React from 'react';

function LogIn() {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8080");

    async function loadBlockChain() {
        window.ethereum.request({ method: 'eth_requestAccounts' });

        const network = await web3.eth.net.getNetworkType();
        console.log(network); // should give you main if you're connected to the main network via metamask...
        const accounts = await web3.eth.getAccounts();
        web3.eth.defaultAccount = accounts[0];

        //TODO: routear a proxima pantalla
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Stockify</h1>
                <button onClick={()=>loadBlockChain()}>Log in</button>
            </header>
        </div>
    );
}

export default LogIn;
