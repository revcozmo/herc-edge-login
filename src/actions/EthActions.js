import {
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    GET_LATEST_BLOCK,
} from './types'
import axios from 'axios';

import { WEB_SERVER_API_GET_LATEST_BLOCK } from './components/settings'
import { sendTrans } from './AssetActions';
// import key from '../constants/ethKey'
// const info = await fetch('https://api-ropsten.etherscan.io/api?module=account&action=balance&address=' + add + '&tag=latest&apikey=' + key)


//////////   Trying out some Async actions for error tracking

export function fetchingData(status) {
    console.log('dataFetching status: ', status)
    return {
        type: FETCHING_DATA,
        isFetching: status
    }
}


export function fetchingDataSuccess(data) {
    console.log(data, 'success data')
    return dispatch => {

        dispatch(fetchingData(false));
        return {
            type: FETCHING_DATA_SUCCESS,
            isFetched: true,
            data
        }
    }

    export function fetchingDataFailure(error) {
        console.log(error)
        return {
            type: FETCHING_DATA_FAILURE,
            fetchError: true,
            error
        }
    }

    export function fetchBlock() {

        console.log('ethfetchBlock')

        return async dispatch => {
            dispatch(fetchingData(true))
            axios.get(WEB_SERVER_API_GET_LATEST_BLOCK)
                .then(response => {
                    console.log(response.data, 'data from the block request');
                    let block = response.data.block;
                    dispatch(fetchingDataSuccess(block))
                })



                .catch((error) =>{
            dispatch(fetchingDataFailure(error));
                })
        }

    }
}


export function fetchingData(status) {
    console.log('dataFetching status: ', status)
    return {
        type: FETCHING_DATA,
        isFetching: status
    }
}


export function fetchingDataSuccess(data) {
    console.log(data, 'success data')
    return dispatch => {

        dispatch(fetchingData(false));
        return {
            type: FETCHING_DATA_SUCCESS,
            isFetched: true,
            data
        }
    }


    export function fetchContract(address) {
        let add = address;
        console.log('ethfetchContract')
        return async dispatch => {
            function onSuccess(success) {
                success.json().then((result) => {
                    console.log(result)
                    dispatch(gotDataSuccess(result))
                })

            }

            function onError(error) {
                dispatch(gotDataFailure(error));
            }

            try {
                const info = await fetch('https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=' + key)
                return onSuccess(info);
            } catch (error) {
                return onError(error);
            }

        }
    }
}
// https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=' + add + '&tag=latest&apikey=' + key

// https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken
// export function getData() {
//     fetch(
//         'https://api-ropsten.etherscan.io/api?module=account&action=balance&address=' + add + '&tag=latest&apikey=' + key
//     ).then((response) => {
//     () => {
//         let responseJson = response.json();
//         console.log(responseJson, 'response in ethaction')
//         return responseJson;
//     }}
//         , (error) => {
//             console.log(error, 'woops')
//         }
//     )
// }



