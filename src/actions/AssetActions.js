import {
  FETCH_ASSETS,
  ADD_ASSET,
  // GET_ASSET_HASHES,
  GOT_LIST_ASSETS,
  GET_TRANS,
  SELECT_ASSET,
  START_TRANS,
  SEND_TRANS,
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
  GOT_ASSET_TRANS,
  AUTH_TOKEN,
  GET_QR_DATA,
  GET_ORIGIN_TRANS,


} from "./types";

import { WEB_SERVER_API_IPFS_GET, WEB_SERVER_API_IPFS_ADD, WEB_SERVER_API_FACTOM_CHAIN_ADD } from "../components/settings"
import axios from 'axios';

import firebase from "../constants/Firebase";
import { assert } from "tcomb";
const rootRef = firebase.database().ref();
const assetRef = firebase.database().ref("assets");
export function getHercId() {
  return dispatch => {
    let hercId;
    rootRef
      .child("hercID")
      .once("value")
      .then(snapshot => {
        console.log(snapshot.val(), " in getHercId action");
        hercId = snapshot.toJSON();
      })
      .then(() => dispatch(gotHercId(hercId)));
  };
}

export function gotHercId(hercId) {
  let id = hercId;
  console.log(id, "gotHercId");
  return {
    type: GOT_HERC_ID,
    hercId: id
  };
}

export function incHercId(hercid) {
  console.log(hercid, "hercid");
  let hercIdplus1 = parseInt(hercid) + 1;
  console.log(hercIdplus1, 'transformed hopefully plus one')
  return {
    type: INC_HERC_ID,
    hercIdplus1
  };
}


export function authToken(token) {
  return {
    type: AUTH_TOKEN,
    token
  };
}


export function getAccount(edge_account) {
  // console.log("Account in Action: ", edge_account);
  return {
    type: GET_ACCOUNT,
    edge_account
  };
}

export function getOrganization(organizationName) {
  console.log("Organization Name in Actions: ", organizationName)
  return {
    type: GET_ORGANIZATION,
    organizationName
  }
}

///// This is getting the hashes from firebase to send to The server to talk to IPFS

// export function fetchAssets(name) {
//   console.log(name, 'username in action')
//   let assetHashes = await getHashes(name);
//   return dispatch => {

//     dispatch(getAssets(assetHashes))

//   }
// }

export function getHashes(userName) {
  let assetHashes = [];
  console.log(userName, 'username in action')

  return dispatch => {

  assetRef.child(userName)
    .once("value")
    .then(snapshot => {
      console.log(snapshot.val(), " what's in the database?")
      snapshot.forEach(asset => {
        console.log(asset.toJSON().ipfsHash, "assetDef Hash in getAssetsAction!");
        assetHashes.push(
          asset.toJSON().ipfsHash
        );
      })

    }).then(() => 
      dispatch(getAssets(assetHashes)) 
    )};
}




function getAssets(hashes) {
  console.log(hashes, "lets hope we get this far.")

  let assetList = [];
   hashes.forEach(singleHash => {
    axios.get(WEB_SERVER_API_IPFS_GET, { params: singleHash })
      .then(response => {
        console.log(response.data, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        assetList.push(JSON.parse(response.data[0]));
        // assetArray.forEach(asset => assetList.push(asset));

        // var ipfsHash = response.data["0"].multiHash
        console.log(assetList, "asset List")
        // return ipfsHash
      })
  })
  return dispatch => {
    dispatch(gotListAssets(assetList));
  }
};


function gotListAssets(assetList) {
  return (
    {
      type: GOT_LIST_ASSETS,
      assets: assetList
    }
  )
}





// export function gotAssetTrans(assetTrans) {
//   let transactions = assetTrans;
//   console.log("got the transactions list");
//   return {
//     type: GOT_ASSET_TRANS,
//     transactions
//   };
// }

export function selectAsset(asset) {
  console.log(asset, 'asset in Select')
  // let assetRef = rootRef.child("assets/" + asset.key);
  let selectedAsset = asset;
  // assetRef.on("value", snapshot => {
  //   selectedAsset = snapshot.val();
  // });
  // selectedAsset = Object.assign({}, selectedAsset, {
  //   ...selectedAsset,
  //   key: asset.key
  // });
  // console.log("asset selection in action");
  return {
    type: SELECT_ASSET,
    selectedAsset
  };
}

export function addAsset(newAsset) {
  return {
    type: ADD_ASSET,
    newAsset
  };
}

export function confirmAsset(confirmedAssetWithLogoUrl) {
  let newAsset = confirmedAssetWithLogoUrl;
  // let Logo = confirmedAsset.Logo

  console.log("confirming asset", newAsset);
  // let assetWithLogo = await uploadAssetLogo(Logo.uri)

  return {
    type: CONFIRM_ASSET,
    newAsset
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

export function addProps(newProps) {
  return {
    type: ADD_PROPS,
    data: newProps
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
