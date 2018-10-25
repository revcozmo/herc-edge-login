import {
 ADD_ASSET,
 ADD_DOC,
 ADD_METRICS,
 ADD_PHOTO,
 CONFIRM_ASSET,
 DELETE_ASSET,
 GET_ASSETS,
 GET_ASSET_DEF,
 GET_HERC_ID,
 GET_ORIGIN_TRANS,
 GET_QR_DATA,
 GET_TRANS,
 GOT_ASSET_DEF,
 GOT_ASSET_TRANS,
 GOT_HERC_ID,
 GOT_LIST_ASSETS,
 INC_HERC_ID,
 SELECT_ASSET,
 SEND_TRANS,
 SET_SET,
 START_TRANS
} from "./types";
import {
  WEB_SERVER_API_IPFS_GET,
  WEB_SERVER_API_IPFS_ADD,
  WEB_SERVER_API_FACTOM_CHAIN_ADD,
  WEB_SERVER_API_FACTOM_ENTRY_ADD,
  WEB_SERVER_API_STORJ_UPLOAD
} from "../components/settings"
import axios from 'axios';
import store from "../store";
import firebase from "../constants/Firebase";
const rootRef = firebase.database().ref();
const assetRef = rootRef.child("assets");

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
    return {
      type: SELECT_ASSET,
      selectAsset: asset
    }
  }


export function getAssetDef(ipfsHash) {
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
      .catch(err => { console.log(err) })
  }
}

export function gotAssetDef(assetDef) {
  console.log(assetDef, "got the transactions list");
  return {
    type: GOT_ASSET_DEF,
    ipfsDef: assetDef
  };
}

export function addAsset(newAsset) {
  return {
    type: ADD_ASSET,
    newAsset
  };
}

export function confirmAsset(assetForIPFS) {
  let asset = assetForIPFS;
  console.log(asset, "chance in confirmAsset")
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

              /* This part creates a new factom chain */

              var dataObject = JSON.stringify({ ipfsHash: ipfsHash, organizationName: organization_name })

              axios.post(WEB_SERVER_API_FACTOM_CHAIN_ADD, dataObject)
                  .then(response => {
                      console.log("2 web server factom response: ", response.data)
                      var chainId = response.data.chainId
                      return chainId
                  })
                  .then(chainId => {
                      let dataObject = Object.assign({}, { chainId: chainId, ipfsHash: ipfsHash, Name: asset.Name })
                      if (asset.Logo) {
                          dataObject = Object.assign(dataObject, { Logo: asset.Logo })
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

  return {
    type: CONFIRM_ASSET,
    asset
  };
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
  console.log("inside set Location action");
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
