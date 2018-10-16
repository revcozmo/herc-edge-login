import {
    GET_BALANCE,
    CREDIT_TRANS,
    DEBIT_TRANS,
    ADD_WALLET,
    DELETE_WALLET,
    SWITCH_WALLET,
}
    from './types';

export function debitTrans(amount) {
    console.log('debit trans action', amount)
    return {
        type: DEBIT_TRANS,
        hercAmount: amount
    }
}

export function creditTrans(amount) {
    console.log('credit trans action', amount)
    return {
        type: CREDIT_TRANS,
        hercAmount: amount
    }
}


export function getBalance() {
    console.log('getting balance action')
    return {
        type: GET_BALANCE
    }
}

export function addWallet(walletObject) {
    console.log('adding Wallet action ', walletObject)
    return {
        type: ADD_WALLET,
        data: walletObject

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
