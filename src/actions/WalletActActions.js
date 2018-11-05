import {
    AUTH_TOKEN,
    GET_ACCOUNT,
    GET_USERNAME,
    GET_ETH_ADDRESS,
    GET_ORGANIZATION,
    GETTING_ORGANIZATION,
    GET_WALLET,
    GET_BALANCE,
    UPDATE_BALANCES,
    HERC_ADDED,
    HERC_ENABLED,
    DEBIT_TRANS,
    DELETE_WALLET,
    SWITCH_WALLET,
    ADD_WALLET,
}
    from './types';
import store from "../store";
import firebase from "../constants/Firebase";
const rootRef = firebase.database().ref();

export function authToken(token) {
    return {
        type: AUTH_TOKEN,
        token
    };
}

export function getAccount(account) {
  return {
    type: GET_ACCOUNT,
    account
  };
}

export function getUsername(edge_account) {
  return {
    type: GET_USERNAME,
    edge_account
  };
}

export function updateBalances(newBalances) {
    return {
      type: UPDATE_BALANCES,
      newBalances
    };
  }

export function getEthAddress(ethereumAddress) {
  return {
    type: GET_ETH_ADDRESS,
    ethereumAddress
  };
}
export function gettingOrganization(organizationName){
  return {
      type: GETTING_ORGANIZATION,
      organizationName
  }
}

export function getOrganization() {
  return dispatch => {
    let username = store.getState().WalletActReducers.edge_account;
    let organizationName;
    rootRef.child('idology').child(username).once('value').then(snapshot => {
      organizationName = snapshot.val().organizationName;
      dispatch(gettingOrganization(organizationName))
    })
  }
}

export function getWallet(wallet) {
    console.log("Wallet Object in Actions: ", wallet)
    return {
        type: GET_WALLET,
        wallet
    }
}

export function hercAdded() {
    console.log('HercAdded');
    return {
        type: HERC_ADDED,
        hercAdded: true
    }
}

export function hercEnabled() {
    console.log('HercEnabled');
    return {
        type: HERC_ENABLED,
        hercEnabled: true
    }
}



export function getBalance() {
    console.log('getting balance action')
    return {
        type: GET_BALANCE
    }
}

export function debitTrans(amount) {
    console.log('debit trans action', amount)
    return {
        type: DEBIT_TRANS,
        hercAmount: amount
    }
}

export function deleteWallet(walletName) {
    console.log('deleting Wallet action ', walletName)

    return {
        type: DELETE_WALLET,
        data: walletName

    }
}

export function switchWallet(walletName) {
    console.log(walletName, 'switchWallet');
    return {
        type: SWITCH_WALLET,
        data: walletName
    }
}

export function addWallet(walletObject) {
    console.log('adding Wallet action ', walletObject)
    return {
        type: ADD_WALLET,
        data: walletObject

    }
}

export function creditTrans(amount) {
  // this action is unlisted
    console.log('credit trans action', amount)
    return {
        type: CREDIT_TRANS,
        hercAmount: amount
    }
}
