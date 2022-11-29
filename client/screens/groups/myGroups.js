import React, { useEffect, useState } from 'react';
import {FlatList, StyleSheet, Modal, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from '../../utils/request';
import { inject, observer } from 'mobx-react';

export default inject('appStore')(observer(function MyGroups({ route, navigation, appStore }) {
    const userName = appStore.username;

    const [groupList, setGroupList] = useState([]);
    const [groupNumber, setGroupNumber] = useState('');
    const [isLongPress, setIsLongPress] = useState(false);

    const pressHandlerAddGroup = () => {
        navigation.navigate('AddGroups', {userName: userName})
    };

    const fetchGroups = async () => {
        try {
            const response = await axios.post('/group/getOneMemberAllGroupNames', { groupMember: userName });
            const { code, data } = response.data;
            if (code === 0) {
                setGroupList(data);
                if (data.length && !data.map(e => e.groupNumber).includes(appStore.groupNumber)) {
                    appStore.setGroupName(data[0].groupName);
                    appStore.setGroupNumber(data[0].groupNumber);
                }
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error);
        }
    };  

    useEffect(() => {
        fetchGroups();
    }, [])

    const pressHandlerLeaveGroup = async () => {
        try {
            const resp = await axios.post('/group/selfLeaving', {groupMember: userName, groupNumber: groupNumber});
            const {code, data} = resp.data;
            if (code === 0) {
                await fetchGroups();
                console.log("Leave group succeeded");
            } else {         
                console.log("Leave group failed");
            };
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <View>
            <FlatList
                data={groupList}
                renderItem={({ item }) => (  
                    <Text onPress={() => {
                        setGroupNumber(item.groupNumber);
                        appStore.setGroupNumber(item.groupNumber);
                        appStore.setGroupName(item.groupName);
                        appStore.setIsManager(item.ifManager);
                        navigation.goBack();
                    }} 
                    onLongPress={() => { setIsLongPress(true); setGroupNumber(item.groupNumber); }}
                    style={styles.groupText}>{ item.groupName }</Text>         
                )}
            />  
            {isLongPress && <Modal transparant={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.textModal}>Do you want to leave the group?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textYesButton} onPress={() => {setIsLongPress(false); pressHandlerLeaveGroup();}}>Yes</Text>
                            <Text style={styles.textNoButton} onPress={() => setIsLongPress(false)}>No</Text>
                        </View>
                    </View>
                </View>
            </Modal> }
            <AntDesign style={styles.iconStyle} name="pluscircle" size={60} color="#FA4A0C" onPress={pressHandlerAddGroup}/>
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
        paddingLeft: 30,
        borderBottomColor: '#000',
        borderBottomWidth: .5
    },
    iconStyle: {
        paddingLeft: 280,
        marginTop: 500,
        position: 'absolute'
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
        marginLeft: 90
    },
    textModal: {
        color: "black",
        fontSize: 20,
        paddingRight: 70
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
  })
