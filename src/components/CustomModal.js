import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import Modal from 'react-native-modal';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import ProgressCircle from 'react-native-progress-circle';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addField:"",
        }
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props;
        if (oldProps !== newProps) {
            this.setState({
                visible: this.props.isVisible,
                heading: this.props.heading,
                subHeading: this.props.subHeading,
                dismissRejectText: this.props.dismissRejectText,
                dismissAcceptText: this.props.dismissAcceptText,
                percent: this.props.percent,
                content: this.props.content,
                textInputLabel: this.props.textInputLabel
            })
        }
    }

    _displayModalContent() {
        if (this.props.modalCase === 'complete') {
            return (
                <View style={localStyles.modalBackground}>
                    <SimpleIcon style={localStyles.pad10} name="check" size={48} color="#95c260" />
                    <Text style={[localStyles.pad10, localStyles.contentFont]}>{this.state.content}</Text>
                    <TouchableOpacity style={localStyles.pad10} onPress={()=>{this.props.closeModal(true)}}>
                        <Text style={localStyles.dismissAcceptText}>{this.state.dismissAcceptText}</Text>
                    </TouchableOpacity>
                </View>
            )

        }
        else if (this.props.modalCase === 'error') {
            return (
                <View style={localStyles.modalBackground}>
                    <SimpleIcon style={localStyles.pad10} name="exclamation" size={48} color="#f5565b" />
                    <Text style={[localStyles.pad10, localStyles.contentFont]}>{this.state.content}</Text>
                    <TouchableOpacity style={localStyles.pad10} onPress={()=>{this.props.closeModal(true)}}>
                        <Text style={localStyles.dismissRejectText}>{this.state.dismissRejectText}</Text>
                    </TouchableOpacity>
                </View>)
        }
        else if (this.props.modalCase === 'confirm') {
            return (
                <View style={localStyles.modalBackground}>
                    <Text style={[localStyles.pad10, localStyles.headingFont]}>{this.props.heading}</Text>
                    <Text style={[localStyles.pad10, localStyles.contentFont]}>{this.props.content}</Text>
                    <View style={[{ flexDirection: 'row', alignSelf: 'flex-end' }, localStyles.pad10]}>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={()=>{this.props.closeModal(true)}}>
                            <Text style={localStyles.dismissAcceptText}>{this.state.dismissAcceptText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={()=>{this.props.closeModal(false)}}>
                            <Text style={localStyles.dismissRejectText}>{this.state.dismissRejectText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
        }
        else if (this.props.modalCase === 'progress') {
            return (
                <View style={localStyles.modalBackground}>
                    <ProgressCircle
                        style={localStyles.pad10}
                        percent={this.state.percent}
                        radius={48}
                        borderWidth={8}
                        color="#95c260"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18, color: "#bbbecb" }}>{this.state.percent}%</Text>
                    </ProgressCircle>
                    <Text style={[localStyles.pad10, localStyles.contentFont]}>{this.state.content}</Text>
                    <TouchableOpacity style={localStyles.pad10} onPress={()=>{this.props.closeModal(true)}}>
                        <Text style={localStyles.dismissRejectText}>{this.state.dismissRejectText}</Text>
                    </TouchableOpacity>
                </View>)
        }
        else if (this.props.modalCase === 'imageSource') {
            return (
                <View style={localStyles.modalBackground}>
                    <Text>{this.state.heading}</Text>
                    <TouchableOpacity onPress={this.props.closeModal}>
                        <SimpleIcon name="camera" size={32} />
                        <Text>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.closeModal}>
                        <SimpleIcon name="picture" size={32} />
                        <Text>Gallery</Text>
                    </TouchableOpacity>
                </View>)
        }
        else if (this.props.modalCase === 'add') {
            return (
                <View style={localStyles.modalBackground}>
                    <Text style={[localStyles.pad10, localStyles.headingFont]}>{this.state.heading}</Text>
                    <TextInput onChangeText={(text)=>{this.setState({addField:text})}}
                        style={[localStyles.pad10, { alignSelf: "stretch", backgroundColor: "#bbbecb", borderRadius: 5 }]}
                        underlineColorAndroid="transparent" placeholder={this.state.textInputLabel}></TextInput>
                    <View style={[{ flexDirection: 'row', alignSelf: 'flex-end' }, localStyles.pad10]}>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={()=>{this.props.closeModal(true);this.props.getNewField(this.state.addField)}}>
                            <Text style={localStyles.dismissAcceptText}>{this.state.dismissAcceptText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={()=>{this.props.closeModal(false)}}>
                            <Text style={localStyles.dismissRejectText}>{this.state.dismissRejectText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (

            <Modal onBackButtonPress={this.props.closeModal}
                isVisible={this.state.visible} >
                {this._displayModalContent()}
            </Modal>

        )
    }
}

const localStyles = StyleSheet.create({
    modalBackground: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
    },
    pad10: {
        padding: 5
    },
    headingFont: {
        fontSize: 18,
        fontFamily: "dinPro",
        color: "#737a9b"
    },
    contentFont: {
        fontSize: 18,
        fontFamily: "dinPro",
        color: "#000000"
    },
    dismissAcceptText: {
        color: "#95c260",
        fontSize: 18,
    },
    dismissRejectText: {
        color: "#bbbecb",
        fontSize: 18,
    }

});
