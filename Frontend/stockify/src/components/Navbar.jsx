import * as React from 'react';
import AppBar from '@mui/material/AppBar'
import { useEtherContext } from '../contexts/EtherContext';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Toolbar from './Toolbar.js';
import Button from '@mui/material/Button';

const AppAppBarStyle = {
    backgroundColor: '#0000000',

};

export default function NavBar() {
    const { isConnected, DisconectWallet, ConnectToWallet } = useEtherContext();

    const connectWallet = () => {
        ConnectToWallet()
            .then(() => toast.success("Connected to wallet successfully"))
            .catch(err => {
                switch(err.code) {
                    case 0:
                        toast.error("Error! Please install a wallet!")
                        break;
                    case 4001: // User rejected the request
                        toast.error("Please accept the request for switching to Polygon")
                        break;
                    default:
                        toast.error("Error while connecting to wallet!\nTry again")
                        break;

                }
            })
    }
    return (
        <div className="top">
            <AppBar position="fixed" sx={AppAppBarStyle} elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <h1 href="#">Stockify</h1>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="text" sx={{color: 'white'}} >Buy</Button>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="text" sx={{color: 'white'}} >Sell </Button>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                    {/* TODO CHANGE THIS*/}
                    {
                         isConnected
                        ?   <button className="btn btn-outline-success" type="button" onClick={DisconectWallet}>Disconect Wallet</button>
                         :   <button className="btn btn-outline-success" type="button" onClick={connectWallet}>Connect to Wallet</button>
                     }
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}
