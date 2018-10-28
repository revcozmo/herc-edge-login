import {
  ADD_ASSET,
  ADD_DOC,
  ADD_METRICS,
  ADD_PHOTO,
  SETTING_HEADER,
  SETTING_HEADER_ERROR,
  CONFIRM_STARTED,
  GOT_IPFS,
  IPFS_ERROR,
  GOT_FACT,
  CONFIRM_ASSET_COMPLETE,
  DELETE_ASSET,
  GET_ASSETS,
  GETTING_ASSET_DEF,
  GET_HERC_ID,
  GET_ORIGIN_TRANS,
  GET_QR_DATA,
  GET_TRANS,
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
  FACTOM_ERROR
} from "./types";
import axios from 'axios';
import store from "../store";
import firebase from "../constants/Firebase";
const rootRef = firebase.database().ref();
const assetRef = rootRef.child("assets");

import {
  WEB_SERVER_API_IPFS_GET,
  WEB_SERVER_API_IPFS_ADD,
  WEB_SERVER_API_FACTOM_CHAIN_ADD,
  WEB_SERVER_API_FACTOM_ENTRY_ADD,
  WEB_SERVER_API_STORJ_UPLOAD,
  WEB_SERVER_API_CSV
} from "../components/settings"

export function getHercId() {
  return dispatch => {
    let hercId;
    rootRef
      .child("hercID")
      .once("value")
      .then(snapshot => {
        hercId = snapshot.toJSON();
      })
      .then(() => dispatch(gotHercId(hercId)));
  };
}

export function gotHercId(hercId) {
  return {
    type: GOT_HERC_ID,
    hercId: hercId
  };
}

export function incHercId(hercid) {
  console.log(hercid, "hercid");
  let hercIdplus1 = parseInt(hercid) + 1;
  console.log(hercIdplus1, 'incHercId Action: transformed hopefully plus one')
  return {
    type: INC_HERC_ID,
    hercIdplus1
  };
}

export function getAssets(userName) {
  return dispatch => {
    let assetLabels = [];
    assetRef.once("value")
      .then(snapshot => {
        console.log(snapshot.val(), " getAssets Action: what's in the database?")
        snapshot.forEach(asset => {
          assetLabels.push(
            asset.toJSON()
            // ipfsHash: asset.toJSON().ipfsHash,
            // chainId: asset.toJSON().chainID
          );
        })
      }).then(() => {
        dispatch(gotListAssets(assetLabels))
      })
  }
}


function gotListAssets(assetList) {
  console.log("gotListAssetsAction", assetList)
  return (
    {
      type: GOT_LIST_ASSETS,
      assets: assetList
    }
  )
}

export function selectAsset(asset) {
  console.log(asset, 'asset in Select')
  console.log(asset, 'wtf')
  return {
    type: SELECT_ASSET,
    selectAsset: asset
  }
}

export function getAssetDef(ipfsHash) {
  return dispatch => {
    dispatch(gettingAssetDef(ipfsHash))
    return {
      type: GETTING_ASSET_DEF
    }
  }
}

export function gettingAssetDef(ipfsHash) {
  return dispatch => {
    console.log(ipfsHash, "keeping it simple.")
    let singleHash = ipfsHash;
    axios.get(WEB_SERVER_API_IPFS_GET, { params: singleHash })
      .then(response => {
        let assetDef = response.data[0];
        console.log(assetDef, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        return assetDef
      })
      .then((assetDef) => dispatch(gotAssetDef(assetDef)))
      .catch(error => {
        dispatch(assetDefError(error)),
          console.log(err)
      })
  }
}

export function gotAssetDef(assetDef) {
  console.log(assetDef, "got the transactions list");
  return {
    type: GOT_ASSET_DEF,

    ipfsDef: assetDef
  };
}

export function assetDefError(error) {
  console.log(assetDef, "got the transactions list");
  return {
    type: ASSET_DEF_ERROR,
    error
  };
}



export function addAsset(newAsset) {
  return {
    type: ADD_ASSET,
    newAsset
  };
}

export function settingHeader(assetHeader) { //assetForFirebase will be Name, hercID, Logo Optional
  return dispatch => {
    console.log(assetHeader, "seewhatwe got, name, hercid, maybe logo");
    // let ipfsAsset = combinedObject.ipfsAsset;
    // let fbAssetHdr = combinedObject.fbAssetHdr;

    let account = store.getState().WalletActReducers;
    let edgeAccount = account.edge_account;
    console.log(account, "variable");

    assetRef.child(assetHeader.Name).set(assetHeader);
    // console.log(ipfsAsset, 'needs stringing?');
    dispatch({ type: SETTING_HEADER })
  }
}

export function settingHeaderError(error) {
  return {
    type: SETTING_HEADER_ERROR,
    error
  }
}



export function confirmAssetStarted(assetForIPFS) {
  return dispatch => {
    dispatch({ type: CONFIRM_STARTED })
    let asset = assetForIPFS;
    console.log(asset, "chance in confirmAssetStarted")
    let username = store.getState().WalletActReducers.edge_account

    rootRef.child('idology').child(username).once('value').then(snapshot => {
      console.log(snapshot.val(), "chance snapshot")
      var organization_name = snapshot.val().organizationName || asset.Name;
      var dataObject = { key: 'asset', data: asset }
      axios.post(WEB_SERVER_API_IPFS_ADD, JSON.stringify(dataObject))
        .then(response => {
          console.log("1 ipfsHash: ", response)
          var ipfsHash = response.data.hash
          return ipfsHash
        })
        .then(ipfsHash => {
          var dataObject = JSON.stringify({ ipfsHash: ipfsHash, organizationName: organization_name })
          /* This part creates a new factom chain */
          axios.post(WEB_SERVER_API_FACTOM_CHAIN_ADD, dataObject)
            .then(response => {
              console.log("2 web server factom response: ", response)
              var chainId = response.data
              return chainId
            })
            .then(chainId => {
              let dataObject = Object.assign({}, { chainId: chainId, ipfsHash: ipfsHash })
              // if (asset.Logo) {
              //     dataObject = Object.assign(dataObject, { Logo: asset.Logo })
              // }
              console.log("3 going into firebase: ", dataObject)
              rootRef.child('assets').child(asset.Name).child('hashes').set(dataObject);
              // rootRef.child('assets').child(asset.Name).child('chainId').set(dataObject.chainId);

              dispatch({ type: CONFIRM_ASSET_COMPLETE });
            }).catch(error => dispatch(factomError(error)))

        })
        .catch(err =>
          dispatch(ipfsError(err)))
    })
  }
}

export function gotIpfs(hash) {
  let assetName = store.getState().AssetReducers.newAsset.Name;
  assetRef.child(assetName).child('ipfsHash').set(hash)
  then(() => {
    return {
      type: GOT_IPFS,
      ipfs: hash
    }

  }).catch(error => dispatch(ipfsError(error)))
}

export function ipfsError(error) {
  return {
    type: IPFS_ERROR,
    error
  }
}

export function gotFact(hash) {
  let assetName = store.getState().AssetReducers.newAsset.Name;
  assetRef.child(assetName).child('chainId').set(hash)
  then(() => {
    return {
      type: GOT_FACT,
      chainId: hash
    }

  }).catch(error => dispatch(factomError(error)))


  return {
    type: GOT_IPFS,
    fctHash: hash
  }

}

export function factomError(error) {
  return {
    type: FACTOM_ERROR,
    error
  }
}

export function confirmAssetComplete() {
  return {
    type: CONFIRM_ASSET_COMPLETE
  }
}


export function deleteAsset(key) {
  let delKey = key;
  console.log(delKey, "deletekey");
  return {
    type: DELETE_ASSET,
    delKey
  };
}

export function startTrans(trans) {
  let newtrans = trans;

  return {
    type: START_TRANS,
    data: newtrans
  };
}

export function sendTrans(trans) {
  // TODO: charge payment. trans = 0.000125
  let dTime = Date.now()
  let transObject = store.getState().AssetReducers.trans
  let header = transObject.header; //tXlocation, hercId, price, name
  let data = transObject.data; //documents, images, properties, dTime
  let keys = Object.keys(data) //[ 'dTime', 'documents', 'images', 'properties' ]
  console.log(keys, "chance keys")
  let promiseArray = []

  //Checks if documents, metrics, images and EDIT was added
  keys.forEach(key => {
    if (Object.keys(data[key]).length != 0 && data[key].constructor === Object) {
      var dataObject = Object.assign({}, { key: key }, { data: data[key] }) // {key: 'properties', data: data[key]}
      promiseArray.push(
        axios.post(WEB_SERVER_API_IPFS_ADD, JSON.stringify(dataObject))
          .then(response => { return response }) // {key: 'properties', hash: 'QmU1D1eAeSLC5Dt4wVRR'}
          .catch(error => { console.log(error) }))
    } else if (data[key].constructor === Array && data[key][0].image) {
      var base64 = data[key][0].image
      var dataObject = Object.assign({}, { key: key }, { data: encodeURIComponent(base64) })
      promiseArray.push(axios.post(WEB_SERVER_API_STORJ_UPLOAD, JSON.stringify(dataObject))
        .then(response => { return response }) // {key: 'images', hash: 'QmU1D1eAeSLC5Dt4wVRR'}
        .catch(error => { console.log(error) }))
    } else if (data[key].constructor === Array && data[key][0].type === "text/comma-separated-values") {
      var dataObject = Object.assign({}, { "key": key }, { "data": encodeURIComponent(data[key][0].content) })
      promiseArray.push(axios.post(WEB_SERVER_API_CSV, JSON.stringify(dataObject))
        .then(response => { return response })
        .catch(error => { console.log(error) }))
    }
  })

  console.log(promiseArray, "chance promiseArray")

  let chainId = store.getState().AssetReducers.selectedAsset.chainId

  Promise.all(promiseArray)
    .then(results => {
      // results = [{key: 'properties', hash: 'QmU1D1eAeSLC5Dt4wVRR'}, {key: 'images', hash: 'QmU1D1eAeSLC5Dt4wVRR'}]
      // TODO: add error handling for undefined results
      var hashlist = results.map(result => { return result.data })
      var factomEntry = { hash: hashlist, chainId: chainId, assetInfo: 'SampleAssetInfo' } // TODO: make assetInfo = organizationName
      console.log(factomEntry, "chance factomEntry")
      axios.post(WEB_SERVER_API_FACTOM_ENTRY_ADD, JSON.stringify(factomEntry))
        .then(response => { //response.data = entryHash
          var dataObject = {}
          hashlist.map(hash => dataObject[hash.key] = hash.hash)
          var firebaseHeader = Object.assign({}, header, { factomEntry: response.data })
          rootRef.child('assets').child(firebaseHeader.name).child('transactions').child(dTime).set({ data: dataObject, header: firebaseHeader })
          console.log("....finished writing to firebase.")
        })
        .catch(err => { console.log(err) })
    })
    .catch(err => { console.log(err) })


  return {
    type: SEND_TRANS,
    data: trans
  };
}

export function addMetrics(newMetrics) {
  return {
    type: ADD_METRICS,
    data: newMetrics
  };
}

export function addPhoto(imgObj) {
  return {
    type: ADD_PHOTO,
    data: imgObj.image,
    size: imgObj.size,
    uri: imgObj.uri
  };
}

export function addDoc(doc) {
  let document = doc;
  return {
    type: ADD_DOC,
    document
  };
}

export function setSet(item) {
  return {
    type: SET_SET,
    item
  };
}

export function getTrans(assetKey) {
  return dispatch => {
    dispatch({
      type: GET_TRANS
    });

    console.log("getTrans action");
    let assetTrans = [];
    rootRef
      .child("assets/" + assetKey + "/transactions")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(trans => {
          console.log("object in getTrans!");
          assetTrans.push({
            data: trans.toJSON().data
          });
        });
      })
      .then(() => dispatch(gotAssetTrans(assetTrans)));
  };
}

export function gotAssetTrans(assetTrans) {
  let transactions = assetTrans;
  console.log("got the transactions list");
  return {
    type: GOT_ASSET_TRANS,
    transactions
  };
}

export function getOriginTrans(trans) {
  console.log(trans, "INSIDE get Origin");
  return (
    {
      type: GET_ORIGIN_TRANS,
      trans
    }
  )
}

export function getQRData(data) {
  console.log(data, "this is actions getQRData");
  return {
    type: GET_QR_DATA,
    data
  }
}
