import { GET_BALANCE, DEBIT_TRANS, DELETE_WALLET, SWITCH_WALLET, ADD_WALLET } from '../actions/types'
const initialState = {
    currentBalance: 1200,
    origBalance: 1200,
    balance: 1200,
    wallet: 'HERC',
    // icon: require('../assets/round.png') 

}


export default function WalletReducer(state = initialState, action) {
    switch (action.type) {
        case DEBIT_TRANS:
            console.log('updating balance', action.hercAmount);
            let newBalance = (state.currentBalance - action.hercAmount);
            console.log(newBalance, 'newBalance');
            return {
                ...state,
                currentBalance: newBalance,
                balance: newBalance
            }
        case GET_BALANCE:
            console.log('getting balance', state);
            return {
                ...state
            }

        case ADD_WALLET:
            console.log('adding Wallet', action);
            let coinName = action.data.currency
            let balance = 0.00
            return {
                ...state,
                wallets: {
                    ...state.wallets,
                    [coinName]: {
                        balance: balance
                    }
                }
            }
        case DELETE_WALLET:
            console.log('getting balance', state, action, "state actions");
            let trimmedWallet = delete state.wallets[action.data.walletName]
            console.log(trimmedWallet, "trimmedWallet")
            return {
                ...state,
                wallets: trimmedWallet

            }

        case SWITCH_WALLET:
            console.log('getting balance', state);
            return {
                ...state,
                currentWallet: action.data.coin,
                balance: action.data.balance,

            }






        default:
            return state
    }
}