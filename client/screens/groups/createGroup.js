import React, { useState } from 'react';
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from '../../utils/request';

export default function CreateGroups({ route, navigation }) {
    const userName = route.params.userName;

    const [groupName, setGroupName] = useState('');
    const [groupPin, setGroupPin] = useState('');

    const pressHandlerCreateGroup = async () => {
        try {
            const response = await axios.post('/group/createGroup', { groupName: groupName, groupPin: groupPin, groupManager: userName });
            const { code, data } = response.data;
            if (code === 0) {
                navigation.navigate('MyGroups');
            } else {
                console.log("Create group failed");
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../images/CreateGroup.png')} />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Group Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(groupName) => setGroupName(groupName)}
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

            <TouchableOpacity style={globalStyles.generalButton} onPress={pressHandlerCreateGroup}>
                <Text style={globalStyles.generalButtonText}>Create Group</Text>
            </TouchableOpacity>
        </View>
    )
}

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
    },

    TextInput: {
        height: 50,
        paddingLeft: 100
    },

    TextInputPin: {
        height: 50,
        paddingLeft: 100
    },

    image: {
        width: 220,
        height: 220,
        marginLeft: 40
    },
});