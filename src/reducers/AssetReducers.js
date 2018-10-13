import {
    GOT_LIST_ASSETS,
    LIST_ASSETS,
    GOT_ASSETS,
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
    GET_ORGANIZATION,
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
import store from "../store";
import {
  WEB_SERVER_API_IPFS_GET,
  WEB_SERVER_API_IPFS_ADD,
  WEB_SERVER_API_FACTOM_CHAIN_ADD,
  WEB_SERVER_API_FACTOM_ENTRY_ADD,
  WEB_SERVER_API_STORJ_UPLOAD } from "../components/settings"

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
            console.log(action, 'listAssetsreducer');
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
            let dTime = Date.now()
            console.log("===========state.trans", state.trans)
            let header = state.trans.header; //tXlocation, hercId, price, name
            let data = state.trans.data; //documents, images, properties, dTime
            var keys = Object.keys(data) //[ 'dTime', 'documents', 'images', 'properties' ]
            let promiseArray = []
            // Checks if image was added
            if (data.images.length != 0) {
              var base64 = data.images[0]
              axios.post(WEB_SERVER_API_STORJ_UPLOAD, JSON.stringify(base64))
               .then(response => {
                 console.log(response)
               })
               .catch(error => {console.log(error)})
            }

            //Checks if documents, metrics, and EDIT was added
            keys.forEach(key => {
              if(Object.keys(data[key]).length != 0 && data[key].constructor === Object){
                promiseArray.push(axios.post(WEB_SERVER_API_IPFS_ADD, JSON.stringify(data[key]))
                .then(res => {
                  return res
                })
                .catch(console.log))
              }
            })

            var chainId = rootRef.child('assets').child(state.edge_account).child(header.name).once('value', function(snapshot) {
              var chainId = snapshot.val().chainId
              Promise.all(promiseArray)
                .then(results => {
                  var hashlist = results[0].data.map(result => {return result.hash})
                  var factomEntry = {hash: hashlist, chainId: chainId, assetInfo: 'SampleAssetInfo'}
                  console.log(factomEntry, "chance factomEntry")
                  return factomEntry
                })
                .then(factomEntry => {
                  axios.post(WEB_SERVER_API_FACTOM_ENTRY_ADD, JSON.stringify(factomEntry))
                    .then(response => {
                      console.log(response)
                    })
                    .catch(err => {
                      console.log(err) //NETWORK CREATE ERROR HERE
                    })
                  })
                .catch(console.log)
            })


            rootRef.child('assets/' + state.edge_account + '/' + header.name).child('transactions').child(dTime).set({ header, data })
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
            console.log(asset.Name, 'asset in reducerconfirm', state, 'state')

            rootRef.child('idology').child(state.edge_account).once('value', function (snapshot) {
                var organization_name = snapshot.val().organizationName
                var dataObject = JSON.stringify(asset)
                axios.post(WEB_SERVER_API_IPFS_ADD, dataObject)
                    .then(response => {
                        var ipfsHash = response.data["0"].hash
                        console.log("1 ipfsHash: ", ipfsHash)
                        return ipfsHash
                    })
                    .then(ipfsHash => {
                        rootRef.child('assets').child(state.edge_account + "/" + asset.Name + "/ipfsHash/").set(ipfsHash);
                        console.log(asset.Name, "ipfsHash: "+ ipfsHash);

                        /* This part creates a new factom chain */

                        //   var dataObject = JSON.stringify({ipfsHash: ipfsHash, organizationName: organization_name})
                        //   console.log("2 dataObject with ipfshash and orgName:", dataObject)

                        //   axios.post(WEB_SERVER_API_FACTOM_CHAIN_ADD, dataObject)
                        //     .then(response => {
                        //       console.log("2 web server factom response: ", response.data)
                        //       var chainId = response.data.chainId
                        //       // var dataObject = Object.assign({}, asset, )
                        //       return chainId
                        //     })
                        //     .then(chainId => {
                        //       var dataObject = Object.assign({}, asset, {chainId: chainId})
                        //       console.log("3 going into firebase: ", dataObject)
                        //       rootRef.child('assets').child(state.edge_account).set(dataObject);
                        //     })
                        //     .catch(console.log(error))
                    })
                    .catch(err => {
                        console.log("Error confirming assets in IPFS: ", err)
                    })

            })

            // let assetRef = rootRef.child(state.edge_account).child('assets').push();

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
