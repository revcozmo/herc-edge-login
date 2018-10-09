import {
    LIST_ASSETS,
    GOT_LIST_ASSETS,
    ADD_ASSET,
    SELECT_ASSET,
    START_TRANS,
    SEND_TRANS,
    GET_TRANS,
    GOT_ASSET_TRANS,
    ADD_PHOTO,
    ADD_DOC,
    ADD_PROPS,
    INC_HERC_ID,
    GET_ACCOUNT,
    GET_HERC_ID,
    GOT_HERC_ID,
    CONFIRM_ASSET,
    SET_SET,
    DELETE_ASSET,
    AUTH_TOKEN

} from '../actions/types';
import firebase from '../constants/Firebase';
const rootRef = firebase.database().ref();
import axios from 'axios';
import { WEB_SERVER_API_IPFS_ADD, WEB_SERVER_API_FACTOM_CHAIN_ADD } from "../components/settings"

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



const INITIAL_STATE = {};


const AssetReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_ASSETS:
            return {
                ...state,
                assets: [],
                isFetching: true
            }

        case GOT_LIST_ASSETS:
            console.log(action.assets.length, 'listAssetsreducer');
            let assets = action.assets

            return Object.assign({}, state, {
                ...state,
                assets,
                isFetching: false
            })


        case SELECT_ASSET:
            // console.log(action, 'action in select reducer');
            let selectedAsset = action.selectedAsset;
            return Object.assign({}, state, {
                ...state,
                selectedAsset
            })

        case GOT_ASSET_TRANS:
            let transactions = action.transactions;
            console.log("get trans reducers")
            return Object.assign({}, state, {
                ...state,
                transactions
            })

        case START_TRANS:
            let trans = action.data;
            console.log(state.selectedAsset.name, "selectedAssetName in startTrans reducer")

            return Object.assign({}, state, {
                ...state,
                trans
            })

        case SEND_TRANS:
            let dTime = new Date().toDateString();
            let header = state.trans.header;
            let data = state.trans.data;
            //  console.log(rootRef.ref(state.AssetReducers.transInfo.name.val()));
            // rootRef.ref()
            console.log(state.trans.header, "trans in send_trans reducer");
            rootRef.child('assets/' + header.key).child('transactions').push({
                data
            })
            rootRef.child('transactions/' + header.key).push({ header, data });
            console.log(dTime, "timecheck")
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
            console.log(hercId, action, "hercidstuff")
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

        case AUTH_TOKEN:
            let token = action.token;
            // console.log('Token captured in reducer', token);
            return Object.assign({}, state, {
                ...state,
                auth_token: token
            })


        case GET_ACCOUNT:
            let edge_account = action.edge_account;
            return Object.assign({}, state, {
                ...state,
                edge_account: edge_account
            })

        case ADD_PHOTO:
            let image = {
                image: action.data,
                size: action.size
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

        case ADD_PROPS:
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
            console.log('adding asset', newAsset.name)
            return Object.assign({}, state, {
                ...state,
                newAsset
              })

        case CONFIRM_ASSET:
            const asset = action.newAsset;
            console.log(asset.Name, 'asset in reducerconfirm', state, 'state')
            console.log("Asset to be moved into IPFS", asset, "it is type: ", typeOf(asset))
            // let assetRef = rootRef.child(state.edge_account).child('assets').push();
            axios.post(WEB_SERVER_API_IPFS_ADD, asset)
              .then(response => {




                console.log("IPFS response: ", response.data["0"].hash)
                //TODO: store response (which is the file hash) in firebase and redux
                var data = Object.assign({}, asset, response.data["0"].hash)
                rootRef.child(state.edge_account).child('assets').set(data);




                // TODO: create new factom chain
                console.log(WEB_SERVER_API_FACTOM_CHAIN_ADD)
              })
              .catch(err => {
                console.log("Error confirming assets in IPFS ",err)
              })

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
