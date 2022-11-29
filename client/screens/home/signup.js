import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from '../../utils/request';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SignUp({ navigation }) {

    const [userName, setUserName] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');

    const [modalOpen, setModalOpen] = useState(false);

    const pressHandlerRegister = async () => {
        try {
            const response = await axios.post('/user/register', { username: userName, nickname: nickName, password: password });
            console.log(response.data);
            const { code, message } = response.data;
            if (code === 0) {
                setModalOpen(true);
            }
            console.log(message);
        } catch (error) {
            console.log(error);
        }
    };

    const pressHandlerHome = () => {
        navigation.navigate('Home');
    };

    const pressHandlerLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Modal visible={modalOpen} transparant={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <Icon style={styles.iconLockStyle} name="close" size={25} color="black" onPress={() => setModalOpen(false)} />
                        <Text style={styles.textModal}>Register successfully! Do you want to log in now?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textNoButton} onPress={pressHandlerHome}>No</Text>
                            <Text style={styles.textYesButton} onPress={pressHandlerLogin}>Yes</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <View>
                <Text style={globalStyles.titleText}>Let's sign you up</Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    onChangeText={(userName) => setUserName(userName)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Nickname"
                    placeholderTextColor="#003f5c"
                    onChangeText={(nickName) => setNickName(nickName)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity style={globalStyles.generalButton}>
                <Text style={globalStyles.generalButtonText} onPress={pressHandlerRegister}>Create an Account</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.hintButton}>Already Have an Account?   </Text>
                    <Text style={styles.textSignInButton} onPress={pressHandlerLogin}>Sign in</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 50
    },

    modalContainer: {
        width: 300,
        height: 300,
        borderRadius: 20,
        borderColor: "black",
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

    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginTop: 30,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },

    hintButton: {
        height: 30,
        marginTop: 20,
        marginLeft: 20
    },

    textSignInButton: {
        height: 30,
        color: "#FA4A0C",
        marginTop: 20,
    },

    textYesButton: {
        height: 30,
        color: "#FA4A0C",
        marginTop: 20,
        paddingLeft: 50,
        fontSize: 20
    },

    textNoButton: {
        height: 30,
        color: "#FA4A0C",
        marginTop: 20,
        marginLeft: 150,
        fontSize: 20
    },

    iconLockStyle: {
        marginLeft: 250,
    },
});