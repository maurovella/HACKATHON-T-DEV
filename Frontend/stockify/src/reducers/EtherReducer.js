import {
    CONNECT_WALLET_BEGIN,
    CONNECT_WALLET_SUCCESS,
    CONNECT_WALLET_ERROR,
    INIT_ETH_HELPER,
} from '../actions'
import EtherHelper from '../utils/EtherHelper';

export default function EtherReducer(state, action) {
    switch (action.type) {
        case INIT_ETH_HELPER:
            return { ...state, isConnected: false, WalletLoading: false, EtherHelper: action.payload }
        case CONNECT_WALLET_BEGIN:
            return { ...state, isConnected: false, WalletLoading: true, WalletError: false}
        case CONNECT_WALLET_SUCCESS:
            return { ...state, isConnected: true, WalletLoading: false, WalletError: false, EtherHelper: action.payload }
        case CONNECT_WALLET_ERROR:
            return { ...state, isConnected: false, WalletLoading: false, WalletError: true }
        default:
            throw new Error(`No Matching "${action.type}" - action type`)      
    }
}