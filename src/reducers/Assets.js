import React, { Component } from 'react';
import firebase from '../constants/Firebase';
import store from "../store";

const rootRef = firebase.database().ref();


export default () => {
    let assetList = [];
    var edge_account = store.getState().AssetReducers.edge_account
    
    rootRef.child(edge_account).child('assets').on('value', (snapshot) => {
            snapshot.forEach((obj) => {
               let asset = obj.toJSON() // console.log(obj.toJSON().Name, 'object in listassets');
                assetList.push({
                    Name: asset.Name,
                    Logo: asset.Logo,
                    ipfsHash: asset.ipfsHash,
                    chainId: asset.chainId
                    // url: obj.toJSON().url
                });
            })
        })
    return assetList
    }
