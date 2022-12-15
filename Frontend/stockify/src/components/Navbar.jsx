import { useEtherContext } from '../contexts/EtherContext';

import styled from 'styled-components';

export default function NavBar() {
    const { EtherHelper, ConnectToWallet } = useEtherContext();
    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand me-auto" href="#">
                {/* TODO CHANGE THIS*/}
                {
                    EtherHelper
                    ?   <span>Connected</span> 
                    :   <button className="btn btn-outline-success" type="button" onClick={ConnectToWallet}>Connect to Wallet</button>
                }
                
            </a>
        </nav>
    )
}

const Wrapper = styled.div``