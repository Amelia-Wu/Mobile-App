import React, { useState } from 'react';
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from '../../utils/request';
import { inject, observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';

export default inject('appStore')(observer(function AddGroups({ appStore, route }) {
    const navigation = useNavigation();
    const userName = appStore.username;

    const pressHandlerCreatGroup = () => {
        navigation.navigate('CreateGroups', { userName: userName })
    };

    const [groupNumber, setGroupNumber] = useState('');
    const [groupPin, setGroupPin] = useState('');

    const pressHandlerAddGroup = async () => {
        try {
            const response = await axios.post('/group/addGroup', { groupNumber, groupPin, groupMember: userName });
            const { code, data } = response.data;
            if (code === 0) {
                navigation.navigate('MyGroups');
            } else {
                console.log("Add groups failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../images/AddGroup.png')} />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Group Number"
                    placeholderTextColor="#003f5c"
                    onChangeText={(groupNumber) => setGroupNumber(groupNumber)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInputPin}
                    placeholder="Group Pin"
                    placeholderTextColor="#003f5c"
                    onChangeText={(groupPin) => setGroupPin(groupPin)}
                />
            </View>

            <TouchableOpacity style={globalStyles.generalButton} onPress={pressHandlerAddGroup}>
                <Text style={globalStyles.generalButtonText}>Add Group</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={pressHandlerCreatGroup}>
                <Text style={styles.textCreateGroupButton}>Create a new group</Text>
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
        flex: 1,
        padding: 10,
    },

    TextInputPin: {
        height: 50,
        flex: 1,
        paddingRight: 30,
    },

    textCreateGroupButton: {
        height: 30,
        color: "#FA4A0C",
        textAlign: "center",
        marginTop: 20
    },

    image: {
        width: 220,
        height: 220,
        marginLeft: 40
    },
});