import {
    ADD_ASSET,
    ADD_DOC,
    ADD_METRICS,
    ADD_PHOTO,
    CONFIRM_ASSET,
    DELETE_ASSET,
    GET_HERC_ID,
    GET_ORIGIN_TRANS,
    GET_QR_DATA,
    GET_TRANS,
    GETTING_ASSET_DEF,
    GOT_ASSET_DEF,
    ASSET_DEF_ERROR,
    GOT_ASSET_TRANS,
    GOT_HERC_ID,
    GOT_LIST_ASSETS,
    INC_HERC_ID,
    SELECT_ASSET,
    SEND_TRANS,
    SET_SET,
    START_TRANS,
} from '../actions/types';
import axios from 'axios';
import store from "../store";
import firebase from '../constants/Firebase';
const rootRef = firebase.database().ref();

import {
    WEB_SERVER_API_IPFS_GET,
    WEB_SERVER_API_IPFS_ADD,
    WEB_SERVER_API_FACTOM_CHAIN_ADD,
    WEB_SERVER_API_FACTOM_ENTRY_ADD,
    WEB_SERVER_API_STORJ_UPLOAD,
    WEB_SERVER_API_CSV
} from "../components/settings"

//synchronous
// let assets = [];
// rootRef.child('assets').on('value', (snapshot) => {
//     snapshot.forEach((obj) => {
//         console.log(obj.toJSON(), 'object in listassets');
//         assets.push({
//             name: obj.toJSON().Name,
//             key: obj.key,
//             logo: obj.toJSON().Logo,
//             // url: obj.toJSON().url
//         });

//     })

// })



const INITIAL_STATE = {
    assetFetching: false,
    assetFetched: false,
    assetFetchError: false,
    assetDefFetching: false,
    assetDefFetched: false,
    assetDefFetchError: false,
};


const AssetReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GOT_LIST_ASSETS:
            console.log(state, "chance")
            console.log(action, " GOT_LIST_ASSETS Action")
            let assetLabels = action.assets;
            return Object.assign({}, state, {
                ...state,
                assets: assetLabels
            })

        case GETTING_ASSET_DEF:
            return {
                assetDefFetching: true
            }

        case GOT_ASSET_DEF:

            console.log(action, "action in GOT_ASSET_DEF REDUCER")

            return Object.assign({}, state, {
                assetDefFetching: false,
                assetDefFetched: true,
                selectedAsset:
                {
                    ...state.selectedAsset,
                    hercId: action.ipfsDef.hercId,
                    ipfsDef: action.ipfsDef
                },
            })

        case ASSET_DEF_ERROR:
            return {
                type: ASSET_DEF_ERROR,
                error: action.error
            }

        case SELECT_ASSET:
            return Object.assign({}, state, {
                ...state,
                assetFetching: false,
                assetFetched: true,
                selectedAsset: action.selectAsset
            })


        case START_TRANS:
            let trans = action.data;
            console.log(state.selectedAsset.Name, "selectedAssetName in START_TRANS reducer")

            return Object.assign({}, state, {
                ...state,
                trans
            })

        case SEND_TRANS:
            return Object.assign({}, state, {
                ...state,
                trans: {
                    ...state.trans,
                    header,
                    data: {
                        ...state.trans.data,
                        dTime
                    }
                }
            })

        case GOT_HERC_ID:
            let hercId = action.hercId;
            console.log(hercId, action, "herc id stuff")
            return Object.assign({}, state, {
                ...state,
                hercId
            })

        case INC_HERC_ID:
            let hercID = action.hercIdplus1;
            console.log(hercID, "in increase reducer");
            rootRef.child("hercID").set(hercID);
            return Object.assign({}, state, {
                ...state,
                hercId
            });

        case ADD_PHOTO:
            let image = {
                image: action.data,
                size: action.size,
                uri: action.uri
            };
            console.log('adding photo');
            let images = [...state.trans.data.images, image];
            return Object.assign({}, state, {
                ...state,
                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        images
                    }
                }
            })


        case ADD_DOC:
            let doc = action.document;
            console.log('adding doc', doc);
            let documents = [...state.trans.data.documents, doc];
            return Object.assign({}, state, {
                ...state,
                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        documents
                    }
                }
            })

        case ADD_METRICS:
            const properties = action.data;
            console.log(properties, "updating attributes in reducers");
            return Object.assign({}, state, {
                ...state,
                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        properties
                    }
                }
            })


        case ADD_ASSET:
            const newAsset = action.newAsset;
            console.log('adding asset', newAsset.Name)
            return Object.assign({}, state, {
                ...state,
                newAsset
            })

        case CONFIRM_ASSET:
            const asset = action.newAsset;

            return Object.assign({}, state, {
                state: INITIAL_STATE,
            })

        case SET_SET:
            const ediT = action.item
            console.log(ediT, 'setset');
            return Object.assign({}, state, {
                ...state,
                trans: {
                    ...state.trans,
                    data: {
                        ...state.trans.data,
                        ediT
                    }
                }
            })


        case DELETE_ASSET:
            const key = action.delKey;
            rootRef.child('assets').child(key).remove();
            return state;


        default:
            return state;
    }
}


export default AssetReducers;
