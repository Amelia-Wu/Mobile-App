import React, { useState, useEffect } from 'react';
import {StyleSheet, Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import { globalStyles } from '../../styles/global';
import Icon from 'react-native-vector-icons/Ionicons';
import {inject, observer} from 'mobx-react';
import request from '../../utils/request';

export default inject('appStore') (observer(function Login({appStore, navigation}) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const pressHandlerSignup = () => {
        navigation.navigate('SignUp')
    };
    
    const fetchUsers = async () => {
        try {
            const response = await request.post('/user/login', {username: userName, password: password});
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const onLoginPress = async () => {

        const {code, data} = await fetchUsers();

        if (code !== 1) {
            appStore.setUserName(data.username);
            appStore.setNickName(data.nickname);
            appStore.setGroupNumber(data.groupNumber);
            appStore.setGroupName(data.groupName);
            appStore.setIsManager(data.ifManager);
            navigation.navigate('TabNavigator', { screen: 'HOME' })
        } else {
            console.log("Login failed");
        }         
    };

    return (
        <View>
            <View style={styles.logoView}>
                <Image style={styles.image} source={require('../../images/logo.png')} />
            </View>

            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Icon style={styles.iconStyle} name="person" size={20} color="black" />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        onChangeText={(userName) => setUserName(userName)}
                        underlineColorAndroid="transparent"
                    />
                </View>
                    
                <View style={styles.inputView}>
                    <Icon style={styles.iconStyle} name="lock-closed" size={20} color="black" />       
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                        underlineColorAndroid="transparent"
                    />
                </View>

                <TouchableOpacity style={globalStyles.generalButton} onPress={onLoginPress}>
                    <Text style={globalStyles.generalButtonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.hintButton}>Don't Have an Account?   </Text>
                        <Text style={styles.textRegisterButton} onPress={pressHandlerSignup}>Register</Text>
                    </View>
                </TouchableOpacity> 
            </View>
        </View>
        
    )
}))

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
    },

    logoView: {
        paddingLeft: 40,
    },

    container: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 50
    },

    iconStyle: {
        padding: 0,
        width: 20,
        height: 20
    },

    inputView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#fff",
        color: '#424242',
        borderRadius: 30,
        height: 50,
        padding: 30,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
      
    TextInput: {
        height: 50,
        flex: 1,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },

    hintButton: {
        height: 30,
        marginTop: 20,
        marginLeft: 20
    },

    textRegisterButton: {
        height: 30,
        color: "#FA4A0C",
        marginTop: 20,
    }

});