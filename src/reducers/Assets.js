import React, { Component } from '../../../../../.cache/typescript/2.9/node_modules/@types/react';
import firebase from '../constants/Firebase';


const rootRef = firebase.database().ref();


export default () => {
    let assetList = [];

    rootRef.child('assets').on('value', (snapshot) => {
            snapshot.forEach((obj) => {
                // console.log(obj.toJSON().Name, 'object in listassets');
                assetList.push({
                    name: obj.toJSON().Name,
                    key: obj.key,
                    logo: obj.toJSON().Logo,
                    // url: obj.toJSON().url
                });

            })

        })
    return assetList
    }
