import React, { useState } from 'react';
import { StyleSheet, Image, Modal, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from '../../utils/request';
import { inject, observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';

export default inject('appStore')(observer(function ModifyNickname({ appStore, route }) {
    const [modalOpen, setModalOpen] = useState(false);
    const navigation = useNavigation();
    const userName = appStore.username;
    const [nickName, setNickName] = useState('');

    const pressHandlerAccountSetting = () => {
        navigation.navigate('AccountSetting')
    };

    const onModifyNickName = async () => {
        try {
            const response = await axios.post('/user/changeNickname', { username: userName, nickname: nickName });
            const {code, data} = response.data;
            if (code === 0) {
                appStore.setNickName(nickName);
                setModalOpen(true);
            } else {
                console.log("Modify failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Modal visible={modalOpen} transparant={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.textModal}>Modify successfully!</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textYesButton} onPress={pressHandlerAccountSetting}>Yes</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Image style={styles.image} source={require('../../images/ModifyNickname.png')} />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="New Nickname"
                    placeholderTextColor="#003f5c"
                    onChangeText={(nickName) => setNickName(nickName)}
                />
            </View>

            <TouchableOpacity style={globalStyles.generalButton} onPress={onModifyNickName}>
                <Text style={globalStyles.generalButtonText}>Modify</Text>
            </TouchableOpacity>
        </View>

    )
}))

const styles = StyleSheet.create({
    container: {
        padding: 50,
    },
    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "100%",
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    TextInput: {
        height: 50,
        padding: 10,
    },

    image: {
        width: 200,
        height: 200,
        marginLeft: 40
    },

    textYesButton: {
        height: 30,
        color: "#FA4A0C",
        marginTop: 30,
        paddingLeft: 140,
        fontSize: 20
    },

    modalContainer: {
        width: 300,
        height: 300,
        borderRadius: 20,
        borderColor: "black",
        marginLeft: 120
    },

    textModal: {
        color: "black",
        fontSize: 20
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
})