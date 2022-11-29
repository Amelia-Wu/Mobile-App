import React, { useState } from 'react';
import { StyleSheet, Modal, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from '../../utils/request';
import { inject, observer } from 'mobx-react';

export default inject('appStore')(observer(function ModifyGroupName({ route, navigation, appStore }) {
    const groupNumber = route.params.groupNumber;

    const [modalOpen, setModalOpen] = useState(false);
    const [newGroupName, setGroupName] = useState('');

    const pressHandlerModifyGroupName = async () => {
        try {
            console.log("hello");
            const response = await axios.post('/group/changeGroupName', { groupNumber: groupNumber, groupName: newGroupName });
            const { code, data } = response.data;
            if (code === 0) {
                appStore.setGroupName(newGroupName);
                setModalOpen(true);
            } else {
                console.log("Modify failed");
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            <Modal visible={modalOpen} transparant={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.textModal}>Modify successfully!</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textYesButton} onPress={() => navigation.goBack()}>Yes</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="New Group Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(newGroupName) => setGroupName(newGroupName)}
                />
            </View>

            <TouchableOpacity style={globalStyles.generalButton} onPress={pressHandlerModifyGroupName}>
                <Text style={globalStyles.generalButtonText}>Modify</Text>
            </TouchableOpacity>
        </View>

    )
}));

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

    textYesButton: {
        height: 30,
        color: "#FA4A0C",
        marginTop: 30,
        paddingLeft: 170,
        fontSize: 20
    },

    modalContainer: {
        width: 300,
        height: 300,
        borderRadius: 20,
        borderColor: "black",
        marginLeft: 30
    },

    textModal: {
        color: "black",
        fontSize: 20,
        paddingLeft: 50
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
})