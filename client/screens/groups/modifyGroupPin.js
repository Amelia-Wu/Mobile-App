import React, { useState } from 'react';
import { StyleSheet, Text, Modal, View, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import axios from '../../utils/request';

export default function ModifyGroupPin({ route, navigation }) {
    const groupNumber = route.params.groupNumber;
    const groupName = route.params.groupName;

    const [modalOpen, setModalOpen] = useState(false);
    const [curGroupPin, setCurGroupPin] = useState('')
    const [newGroupPin, setNewGroupPin] = useState('');

    const pressHandlerModifyGroupPin = async () => {
        try {
            const response = await axios.post('/group/changeGroupPin', { currentGroupPin: curGroupPin, newGroupPin: newGroupPin, groupNumber: groupNumber });
            const { code, data } = response.data;
            if (code === 0) {
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
                    style={styles.TextInputCur}
                    placeholder="Current Group Pin"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(curGroupPin) => setCurGroupPin(curGroupPin)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInputNew}
                    placeholder="New Pin"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(newGroupPin) => setNewGroupPin(newGroupPin)}
                />
            </View>
            <Text>The pin must be 4 digits.</Text>

            <TouchableOpacity style={globalStyles.generalButton} onPress={pressHandlerModifyGroupPin}>
                <Text style={globalStyles.generalButtonText}>Modify</Text>
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
        alignContent: 'center'
    },
    TextInputCur: {
        height: 50,
        paddingLeft: 80
    },
    TextInputNew: {
        height: 50,
        paddingLeft: 80
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