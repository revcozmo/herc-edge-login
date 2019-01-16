import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import ColorConstants from "../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responisiveUI';

export function AssetCard(asset) {
    console.log(asset);
    return (
        <View style={localStyles.assetCard}>
            <View style={localStyles.assetImageContainer}>
                <Image source={asset.Image} style={localStyles.assetImage} />
            </View>

            <View style={localStyles.cardMain}>
                <View style={localStyles.cardContent}>

                    <Text style={localStyles.assetLabel}>Asset Name</Text>
                    <Text style={localStyles.assetName}>{asset.Name}</Text>
                </View>
                <View style={localStyles.cardContent}>
                    <Text style={localStyles.assetLabel}>Additional Info</Text>
                    <Text style={localStyles.assetName}>{asset.Name}</Text>
                </View>
            </View>
        </View>

    )
}

const localStyles = StyleSheet.create({

    assetCard: {
        flex: 0,
        width: widthPercentageToDP('90'),
        height: heightPercentageToDP('10'),
        borderRadius: 6,
        backgroundColor: ColorConstants.MainSubCrownBlue,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    assetImageContainer: {
        height: '90%',
        width: '25%',
        backgroundColor: ColorConstants.MainGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    assetImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    cardMain: {
        flexDirection: 'row',
        backgroundColor: ColorConstants.MainGray,
        width: "70%",
        height: "80%",
        padding: 5

    },
    cardContent: {
        flexDirection: 'column',
        width: '50%',
    },
   
    assetName: {
        fontSize: 13,
        color: ColorConstants.MainBlue,
        margin: 2
    },
    assetLabel: {
        color: ColorConstants.MainBlue,
        fontSize: 14,
        margin: 2,
        marginRight: 3,
        textAlign: 'left'

    },
   


})



