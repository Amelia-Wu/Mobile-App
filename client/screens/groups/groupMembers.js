import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Modal, View, FlatList, TouchableOpacity } from 'react-native';
import axios from '../../utils/request';
import { inject, observer } from 'mobx-react';

export default inject('appStore')(observer(function GroupMembers({ route, navigation, appStore }) {
    const groupNumber = route.params.groupNumber;

    const [groupMembers, setGroupMembers] = useState([]);
    const [kickUser, setKickUser] = useState('');
    const [isLongPress, setIsLongPress] = useState(false);

    const fetchMemberNames = async () => {
        try {
            const response = await axios.post('/group/getAllMembersName', { groupNumber });
            const userList = response.data.data;
            console.log(userList);
            setGroupMembers(userList);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMemberNames();
    }, [])

    const pressHandlerKickOut = async () => {
        if (kickUser === appStore.username)
            return;
        try {
            const resp = await axios.post('/group/kickOneMemberOut', { groupMember: kickUser, groupNumber });
            console.log(resp);
            const { code, data } = resp.data;
            if (code === 0) {
                console.log("Kick out member succeeded");
                fetchMemberNames();
            } else {
                console.log("Kick out member failed");
            };
        } catch (error) {
            console.log(error)
        }
    };

    const renderSeparator = () => (
        <View
            style={{
                backgroundColor: 'black',
                height: 0.5,
            }}
        />
    );

    return (
        <View>
            <FlatList
                data={groupMembers}
                ItemSeparatorComponent={renderSeparator}
                renderItem={({ item }) => (
                    <Text style={styles.groupText} onLongPress={() => { setIsLongPress(true); setKickUser(item.username); }}>
                        {item.nickname}
                    </Text>
                )}
            />
            {isLongPress && <Modal transparant={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.textModal}>Do you want to kick this member out of the group?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textYesButton} onPress={() => { setIsLongPress(false); pressHandlerKickOut(); }}>Yes</Text>
                            <Text style={styles.textNoButton} onPress={() => setIsLongPress(false)}>No</Text>
                        </View>
                    </View>
                </View>
            </Modal>}
        </View>
    );
}));


const styles = StyleSheet.create({
    container: {
        padding: 50,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 30,
        height: 44,
    },
    groupText: {
        fontSize: 30,
        color: "black",
        paddingVertical: 20,
        paddingLeft: 30
    },
    textYesButton: {
        height: 30,
        color: "#FA4A0C",
        marginTop: 30,
        paddingLeft: 100,
        fontSize: 20
    },
    textNoButton: {
        height: 30,
        color: "#FA4A0C",
        marginTop: 30,
        fontSize: 20,
        paddingLeft: 50,
    },
    modalContainer: {
        width: 300,
        height: 300,
        borderRadius: 20,
        borderColor: "black",
        marginLeft: 60
    },
    textModal: {
        color: "black",
        fontSize: 20,
        paddingRight: 50
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
})
