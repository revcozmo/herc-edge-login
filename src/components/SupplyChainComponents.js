import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ColorConstants from "../assets/ColorConstants";
import { widthPercentageToDP, heightPercentageToDP } from '../assets/responisiveUI';



export function AddAssetButton(props) {
    return (

        <View style={localStyles.addPhotoButton}>
            <Text style={localStyles.buttonLabel}>Create New</Text>

            <Icon
                style={localStyles.cameraIconContainer}
                color={'white'}
                name='plus-circle'
                onPress={props.onPress}
            >
            </Icon>
        </View>


    )
}

// export function AddAssetButton(props) {
//     return (

//         <View style={localStyles.addAssetButton}>

//             <Text style={[localStyles.buttonLabel, { marginLeft: 0 }]}>Create New</Text>
//             <View style={localStyles.cameraIconContainer}>
//                 <Icon
//                     color={ColorConstants.MainBlue}
//                     name='plus-circle'
//                     onPress={props.onPress}
//                 >
//                 </Icon>

//             </View>
//         </View>

//     )
// }

const localStyles = StyleSheet.create({

    addAssetButton: {
        height: heightPercentageToDP('6'),
        width: widthPercentageToDP('90'),
        backgroundColor: ColorConstants.MainGold,
        // color: 'white',
        borderRadius: 8,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '10%',
        paddingLeft: '10%'
    },
    buttonLabel: {
        fontSize: 12,
        color: 'white',
        margin: 5,
        // marginLeft: '15%',
        alignSelf: 'center'

    },
    cameraIconContainer: {
        backgroundColor: ColorConstants.MainGold,
        borderRadius: 8,
        // marginLeft: '15%'

    },
    addPhotoButton: {
        height: heightPercentageToDP('8'),
        width: widthPercentageToDP('80'),
        backgroundColor: ColorConstants.MainGold,
        borderRadius: 8,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '10%',
        paddingLeft: '10%',
        // color: 'white'
    },
})
