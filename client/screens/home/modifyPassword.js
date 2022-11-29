import React, { useState } from 'react';
import { StyleSheet, Image, Modal, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from '../../utils/request';
import { inject, observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';

export default inject('appStore')(observer(function ModifyPassword({ appStore, route }) {
    const userName = appStore.username;
    const navigation = useNavigation();

    const [modalOpen, setModalOpen] = useState(false);
    const [wrongModalOpen, setWrongModalOpen] = useState(false);
    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const pressHandlerAccountSetting = async () => {
        try {
            const response = await axios.post('/user/changePassword', { username: userName, currentPassword: curPassword, newPassword: newPassword });
            const { code, data } = response.data;
            if (code === 0) {
                setModalOpen(true);
            } else {
                setWrongModalOpen(true);
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
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, width: '100%' }}>
                            <Text style={styles.textYesButton} onPress={() => navigation.navigate('AccountSetting')}>Yes</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={wrongModalOpen} transparant={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.textModalWrong}>Sorry, the password is wrong.</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, width: '100%' }}>
                            <Text style={styles.textYesButton} onPress={() => setWrongModalOpen(false)}>Ok</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Image style={styles.image} source={require('../../images/ModifyPassword.png')} />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Current Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(curPassword) => setCurPassword(curPassword)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextNewInput}
                    placeholder="New Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(newPassword) => setNewPassword(newPassword)}
                />
            </View>
            <Text>Password length must be eight or more characters. It should combine digits and letters.</Text>

            <TouchableOpacity style={globalStyles.generalButton} onPress={pressHandlerAccountSetting}>
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
        height: 40,
    },

    TextNewInput: {
        height: 40,
        paddingRight: 30,
    },

    hintButton: {
        height: 30,
    },

    textRegisterButton: {
        height: 30,
        color: "#FA4A0C"
    },

    image: {
        width: 200,
        height: 200,
        marginLeft: 40
    },

    textYesButton: {
        height: 30,
        color: "#FA4A0C",
        fontSize: 20
    },

    modalContainer: {
        width: 300,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1,
        padding: 10
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

    textModalWrong: {
        color: "black",
        fontSize: 20,
    }
});