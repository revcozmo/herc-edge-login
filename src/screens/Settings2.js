import React, {
    Component
} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    Alert,
    ScrollView,
    WebView,
    Linking
} from "react-native";
const HercLogo = require('../assets/hLogo.png');
// import CardBoilerPlate from "../components/AssetCard";

import Header from "../components/Headers/RegisterAssetHeader";

export default class Settings2 extends Component {

    static navigationOptions = {

        header: null
    }

    constructor(props) {
        super(props);
        console.log("Settings2Test")

    }


render() {
    let TestAsset = {
        Image: HercLogo,
        Name: "Test Asset Name"
    }
    return ( 
        <View style={localStyles.testView}>
         {/* <AssetCard asset={TestAsset} /> */}

        <Text style={localStyles.testText}>Whattup</Text> 
        </View> 
    )
}
}

const localStyles = StyleSheet.create({

testView: {

    height: 200,
    width: 200,
    backgroundColor: 'blue'
},

testText: {
fontSize:44

}
// modalCenter: {
//     alignItems: 'center',
//     flexDirection: 'column',
//     justifyContent: 'center',

// },

// lowerModalContainer: {
//     width: '100%',
//     height: '100%',
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     // alignContent: 'flex-end',
//     top: heightPercentageToDP('55'),
//     backgroundColor: ColorConstants.MainGray,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     borderRadius: 20
// },

// imageSourceContainer: {
//     flexDirection: 'row',
//     backgroundColor: ColorConstants.MainGray,
//     padding: 10,
//     paddingTop: 30,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '50%',
//     height: '50%',
//     borderWidth: 0,


// }
})
