import {
    GOT_LIST_ASSETS,
    LIST_ASSETS,
    GET_ASSETS,
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
    GET_ETH_ADDRESS,
    GET_ORGANIZATION,
    GET_WALLET,
    GET_HERC_ID,
    GOT_HERC_ID,
    CONFIRM_ASSET,
    SET_SET,
    DELETE_ASSET,
    AUTH_TOKEN,
    GOT_ASSET_DEF

} from '../actions/types';
import firebase from '../constants/Firebase';
const rootRef = firebase.database().ref();
import axios from 'axios';
import store from "../store";

import {
    WEB_SERVER_API_IPFS_GET,
    WEB_SERVER_API_IPFS_ADD,
    WEB_SERVER_API_FACTOM_CHAIN_ADD,
    WEB_SERVER_API_FACTOM_ENTRY_ADD,
    WEB_SERVER_API_STORJ_UPLOAD
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



const INITIAL_STATE = {};


const AssetReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GOT_LIST_ASSETS:
        console.log(action, "getAsset Action")
        let assetLabels = action.assets;
        return Object.assign({}, state, {
            ...state,
            assets: assetLabels

            })

        case GOT_ASSET_DEF:

            console.log(action, "action in GOTASSETDEF REDUCER")

            return Object.assign({}, state, {
                ...state,
                selectedAsset:
                {
                ...state.selectedAsset,
                    hercId:action.ipfsDef.hercId,
                    ipfsDef: action.ipfsDef
                },
            })

        case SELECT_ASSET:
            // console.log(action, 'action in select reducer');
            let selectedAsset = action.selectedAsset;
            return Object.assign({}, state, {
                ...state,
                selectedAsset
            })



        case START_TRANS:
            let trans = action.data;
            console.log(state.selectedAsset.Name, "selectedAssetName in startTrans reducer")

            return Object.assign({}, state, {
                ...state,
                trans
            })

            case SEND_TRANS:
                let dTime = Date.now()
                console.log("===========state.trans", state.trans)
                let header = state.trans.header; //tXlocation, hercId, price, name
                let data = state.trans.data; //documents, images, properties, dTime
                var keys = Object.keys(data) //[ 'dTime', 'documents', 'images', 'properties' ]
                let promiseArray = []

                //Checks if documents, metrics, images and EDIT was added
                keys.forEach(key => {
                  if(Object.keys(data[key]).length != 0 && data[key].constructor === Object){
                    var dataObject = Object.assign({}, {key: key}, {data: data[key]}) // {key: 'properties', data: data[key]}
                    console.log(dataObject, "chance check for you")
                    promiseArray.push(
                      axios.post(WEB_SERVER_API_IPFS_ADD, JSON.stringify(dataObject))
                        .then(response => { return response }) // {key: 'properties', hash: 'QmU1D1eAeSLC5Dt4wVRR'}
                        .catch(error => { console.log(error) }))
                  } else if (data[key].constructor === Array) {
                    console.log("assume this is an array of images")
                    var base64 = data[key][0].image
                    var dataObject = Object.assign({}, {key: key}, {data: encodeURIComponent(base64)})
                    promiseArray.push(axios.post(WEB_SERVER_API_STORJ_UPLOAD, JSON.stringify(dataObject))
                     .then(response => { return response }) // {key: 'images', hash: 'QmU1D1eAeSLC5Dt4wVRR'}
                     .catch(error => { console.log(error) }))
                  }
                })

                console.log(promiseArray, "chance promiseArray")

                rootRef.child('assets').child(header.name).once('value', function(snapshot) {
                  var chainId = snapshot.val().chainId
                  Promise.all(promiseArray)
                    .then(results => {
                      console.log(results, "results chance?")// [{key: 'properties', hash: 'QmU1D1eAeSLC5Dt4wVRR'}, {key: 'images', hash: 'QmU1D1eAeSLC5Dt4wVRR'}]
                      return results
                    })
                    .then(results => {
                      var hashlist = results.map(result => { return result.data })
                      var factomEntry = {hash: hashlist, chainId: chainId, assetInfo: 'SampleAssetInfo'}
                      console.log(factomEntry, "chance factomEntry")
                      console.log(JSON.stringify(factomEntry), "chance stringified factomEntry")
                      axios.post(WEB_SERVER_API_FACTOM_ENTRY_ADD, JSON.stringify(factomEntry))
                        .then(response => {
                          var dataObject = {}
                          hashlist.map(hash => dataObject[hash.key] = hash.hash)
                          var header = Object.assign({}, state.trans.header, {factomEntry: response.data})
                          console.log(data, header, "chance boyyyy")
                          // TODO: store it all to Firebase
                          rootRef.child('assets/'+ header.name).child('transactions').child(dTime).set({ data: dataObject, header: header })
                        })
                        .catch(err => {
                          console.log(err)
                        })
                      })
                    .catch(console.log)
                })


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


        case GET_ETH_ADDRESS:
          let ethereumAddress = action.ethereumAddress;
          return Object.assign({}, state, {
            ...state,
            ethereumAddress: ethereumAddress
          })

        case GET_WALLET:
          let wallet = action.wallet;
          return Object.assign({}, state, {
            ...state,
            wallet
          })

        case GET_ORGANIZATION:
            let organizationName = action.organizationName;
            return Object.assign({}, state, {
                ...state,
                organizationName: organizationName
            })

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

        // case GOT_LOGO:
        // let logoURl = action.Logo;
        // return{
        //     ...state,
        //     AssetReducers:{
        //         ...state.AssetReducers,
        //         newAsset: {
        //             ...state.AssetReducers.newAsset,
        //             Logo: logoURl
        //         },

        //     }
        // }

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
            console.log(asset, 'asset in reducerconfirm', state, 'state')
            console.log(state.edge_account)

            rootRef.child('idology').child(state.edge_account).once('value').then(snapshot => {
                cnosole.log(snapshot.val(), "chance snapshot")
                var organization_name = snapshot.val().organizationName || asset.Name;
                var dataObject = {key: 'newAsset', data:  asset}
                console.log(dataObject, "this will be written to ipfs")
                axios.post(WEB_SERVER_API_IPFS_ADD, JSON.stringify(dataObject))
                    .then(response => {
                      console.log("1 ipfsHash: ", response)
                      var ipfsHash = response.data.hash
                      return ipfsHash
                    })
                    .then(ipfsHash => {

                      /* This part creates a new factom chain */

                      var dataObject = JSON.stringify({ ipfsHash: ipfsHash, organizationName: organization_name })

                      axios.post(WEB_SERVER_API_FACTOM_CHAIN_ADD, dataObject)
                          .then(response => {
                              console.log("2 web server factom response: ", response.data)
                              var chainId = response.data.chainId
                              return chainId
                          })
                          .then(chainId => {
                            let dataObject = Object.assign({}, { chainId : chainId, ipfsHash: ipfsHash, Name: asset.Name})
                            if (asset.Logo){
                              dataObject = Object.assign(dataObject, {Logo: asset.Logo})
                            }
                              console.log("3 going into firebase: ", dataObject)
                              rootRef.child('assets').child(asset.Name).set(dataObject)
                          })
                          .catch(err => { console.log(err) })
                  })
                  .catch(err => {
                      console.log("Error confirming assets in IPFS: ", err)
                  })
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
