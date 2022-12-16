import { useEtherContext } from '../contexts/EtherContext';
import toast from 'react-hot-toast';

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
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <span className="navbar-brand me-auto" href="#">Stockify</span>
                <span className="navbar-brand me-right" href="#">
                    {/* TODO CHANGE THIS*/}
                    {
                        isConnected
                        ?   <button className="btn btn-outline-success" type="button" onClick={DisconectWallet}>Disconect Wallet</button>
                        :   <button className="btn btn-outline-success" type="button" onClick={connectWallet}>Connect to Wallet</button>
                    }
                    
                </span>
            </div>
        </nav>
    )
}