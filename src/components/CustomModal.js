import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import ProgressCircle from 'react-native-progress-circle';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.isVisible,
            heading: this.props.heading,
            subHeading: this.props.subHeading,
            dismissText: this.props.dismissText,
            percent: this.props.percentComplete,
            content: this.props.content,

        }

    }

    componentDidUpdate(oldProps) {
        const newProps = this.props;
        if (oldProps !== newProps) {
            this.setState({
                visible: this.props.isVisible,
                heading: this.props.heading,
                subHeading: this.props.subHeading,
                dismissText: this.props.dismissText,
                acceptText: this.props.acceptText,
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
                    <SimpleIcon name="check" size={32} color="green" />
                    <Text>{this.state.content}</Text>
                    <TouchableOpacity onPress={this.props.closeModal}>
                        <Text>{this.state.dismissText}</Text>
                    </TouchableOpacity>
                </View>
            )

        }
        else if (this.props.modalCase === 'error') {
            return (
                <View style={localStyles.modalBackground}>
                    <SimpleIcon name="exclamation" size={32} color="red" />
                    <Text>{this.state.content}</Text>
                    <TouchableOpacity onPress={this.props.closeModal}>
                        <Text>{this.state.dismissText}</Text>
                    </TouchableOpacity>
                </View>)
        }
        else if (this.props.modalCase === 'confirm') {
            return (
                <View style={localStyles.modalBackground}>
                    <Text style={localStyles.pad10}>{this.props.heading}</Text>
                    <Text style={localStyles.pad10}>{this.props.content}</Text>
                    <View style={[{ flexDirection: 'row', alignSelf: 'flex-end' }, localStyles.pad10]}>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={this.props.closeModal}>
                            <Text style={{ color: 'green' }}>{this.state.acceptText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={this.props.closeModal}>
                            <Text style={{ color: 'gray' }}>{this.state.dismissText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
        }
        else if (this.props.modalCase === 'progress') {
            return (
                <View style={localStyles.modalBackground}>
                    <ProgressCircle
                        percent={this.state.percent}
                        radius={32}
                        borderWidth={8}
                        color="green"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{this.state.percent}%</Text>
                    </ProgressCircle>
                    <Text>{this.state.content}</Text>
                    <TouchableOpacity onPress={this.props.closeModal}>
                        <Text>{this.state.dismissText}</Text>
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
                    <Text>{this.state.heading}</Text>
                    <TextInput placeholder={this.state.textInputLabel}></TextInput>
                    <View style={[{ flexDirection: 'row', alignSelf: 'flex-end' }, localStyles.pad10]}>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={this.props.closeModal}>
                            <Text style={{ color: 'green' }}>{this.state.acceptText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={this.props.closeModal}>
                            <Text style={{ color: 'gray' }}>{this.state.dismissText}</Text>
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
        borderRadius: 5,
        padding: 20,
    },
    pad10: {
        padding: 5
    }

});
