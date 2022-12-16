import { createContext, useContext, useEffect, useState, useReducer } from 'react';

import reducer from '../reducers/EtherReducer';
import {
    CONNECT_WALLET_BEGIN,
    CONNECT_WALLET_SUCCESS,
    CONNECT_WALLET_ERROR,
    INIT_ETH_HELPER,
} from '../actions'

import EtherHelper from '../utils/EtherHelper';
import { getEther } from '../utils/getEther';

const EtherContext = createContext();

const getLocalStorage = () => {
    const state = localStorage.getItem('eth');
    if (state)
        return JSON.parse(state);
    return {  // Default state
        isConnected: false,
        
        WalletLoading: false,
        WalletError: false,
        
    }
}

const initialState = getLocalStorage();


export const EtherProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    // connect to wallet
    const ConnectToWallet = () => {
        dispatch({ type: CONNECT_WALLET_BEGIN });
        return getEther()
            .then(ether => dispatch({ type: CONNECT_WALLET_SUCCESS, payload: new EtherHelper(ether) }))
            .catch(err => {
                dispatch({ type: CONNECT_WALLET_ERROR, payload: err })
                throw err; // for later handing
            })
    }
    const DisconectWallet = () => {
        dispatch({ type: INIT_ETH_HELPER, payload: new EtherHelper() })
    }

    useEffect(() => {
        if (state.isConnected)
            ConnectToWallet();
        else dispatch({ type: INIT_ETH_HELPER, payload: new EtherHelper() })
    }, [])

    useEffect(() => {
        const _state = {...state};
        delete _state.EtherHelper;
        localStorage.setItem("eth", JSON.stringify(_state))
    }, [state])
    
    return <EtherContext.Provider value = {{ ...state, ConnectToWallet, DisconectWallet }}>{children}</EtherContext.Provider>
}

export const useEtherContext = () => useContext(EtherContext); 