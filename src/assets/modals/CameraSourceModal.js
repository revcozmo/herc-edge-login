import {
    StyleSheet,
    Text,
    View,
    Component
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import modalStyles from "./ModalStyles";

export function CameraSourceModal (visibility) {
    
   
        let visible = visibility;
        return (
            <Modal

                backdropColor={'rgba(0,0,0,0.5)'}
                isVisible={visible}
                onRequestClose={() => { console.log("modal closed") }}
            >
                <View style={modalStyles.modalLower}>
                    <View style={modalStyles.imageSourceContainer}>
                        <Text style={modalStyles.menuTitle}>Choose Image Source</Text>

                        <View style={modalStyles.lowerModalContainer}>
                            <View style={modalStyles.sourceIconContainer}>

                                <View style={modalStyles.camSourceIcon}>
                                    <Icon
                                        containerStyle={modalStyles.iconButton}
                                        name="camera"
                                        size={20}
                                        color="black"
                                    onPress={() => visibile = !visibile}
                                    >
                                    </Icon>
                                </View>
                                <Text style={modalStyles.labelTitle}>Camera</Text>
                            </View>

                            <View style={modalStyles.sourceIconContainer}>
                                <View style={modalStyles.camSourceIcon}>
                                    <Icon
                                        name="folder-open"
                                        size={20}
                                        containerStyle={modalStyles.iconButton}
                                        color="black"
                                        onPress={() => visibile = !visibile}
                                    >
                                    </Icon>
                                </View>
                                <Text style={modalStyles.labelTitle}>Gallery</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

