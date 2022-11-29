import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { inject, observer } from 'mobx-react';

export default inject('appStore')(observer(function ManageGroups({ route, navigation, appStore }) {
    const groupName = appStore.groupName
    const groupNumber = appStore.groupNumber

    const pressHandlerModifyGroupName = () => {
        navigation.navigate('ModifyGroupName', { groupNumber: groupNumber })
    };
    const pressHandlerModifyGroupPin = () => {
        navigation.navigate('ModifyGroupPin', { groupNumber: groupNumber, groupName: groupName })
    };
    const pressHandlerGroupMembers = () => {
        navigation.navigate('GroupMembers', { groupNumber: groupNumber })
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon style={styles.iconDocStyle} name="document-text-outline" size={25} color="black" />
                        <Text style={styles.buttonDocText}>{groupName}</Text>
                        <FontAwesome5 style={styles.iconEditStyle} name="edit" size={20} color="#FA4A0C" onPress={pressHandlerModifyGroupName} />
                    </View>
                </TouchableOpacity>
                <View style={styles.separator} />

                <TouchableOpacity style={styles.button} onPress={pressHandlerModifyGroupPin}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon style={styles.iconLockStyle} name="lock-closed-outline" size={25} color="black" />
                        <Text style={styles.buttonText}>Modify Group Pin</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.separator} />

                <TouchableOpacity style={styles.button} onPress={pressHandlerGroupMembers}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons style={styles.iconGroupStyle} name="group" size={30} color="black" />
                        <Text style={styles.groupText}>Group Members</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}));

const styles = StyleSheet.create({
    container: {
        padding: 50,
    },
    separator: {
        backgroundColor: 'grey',
        height: 0.5,
    },
    button: {
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        width: '100%',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        paddingRight: 55
    },
    groupText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        paddingRight: 70
    },
    buttonDocText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        position: 'absolute',
        left: -80,
        top: -12
    },
    iconEditStyle: {
        // paddingRight: 50,
        paddingTop: 3,
        position: 'absolute',
        left: 80,
        top: -12
    },
    iconGroupStyle: {
        paddingRight: 20
    },
    iconDocStyle: {
        position: 'absolute',
        right: 105,
        marginTBottom: 50,
        top: -12
    },
    iconLockStyle: {
        paddingRight: 25,
    }
})