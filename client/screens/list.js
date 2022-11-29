import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { inject, observer } from 'mobx-react';
import request from '../utils/request';
import Icon from "react-native-vector-icons/Ionicons";
import LocationList from './locList';
import { useNavigation } from '@react-navigation/native';

const initTagList = [
    { title: 'All', selected: true },
    { title: 'Food', selected: false },
    { title: 'Drink', selected: false },
    { title: 'Indoor Activity', selected: false },
    { title: 'Outdoor Activity', selected: false }
];

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
    },
    top: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    mid: {
        width: '100%',
        height: 40,
        paddingHorizontal: 20
    },
    search: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 0.5,
        borderStyle: 'solid',
        borderColor: '#333232',
        borderRadius: 20,
        backgroundColor: '#FFFEFE'
    },
    bot: {
        flexDirection: 'column',
        width: '100%',
        flexGrow: 1,
        alignItems: 'center'
    },
    tags: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    list: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10
    }
});

export default inject('appStore')(observer(({ appStore }) => {
    const [tagList, setTagList] = useState(initTagList);
    const [locList, setLocList] = useState(appStore.currLocList);

    const allLocations = useRef();

    const fetchData = async groupNumber => {
        try {
            const resp = await request.post('/locationList/showLocationList', {groupNumber});
            if (resp.data.code === 0) {
                allLocations.current = resp.data.data;
            }
            else {
                allLocations.current = [];
            }
            appStore.setCurrLocList(allLocations.current);
            setLocList(allLocations.current);
        } catch (e) {
            console.log('Network Error');
        }
    };

    const onTagPress = async id => {
        const tmpList = tagList.map(e => ({...e, selected: false}));
        tmpList[id].selected = true;
        setTagList(tmpList);
    };

    useEffect(() => {
        if (appStore.updateLocList) {
            fetchData(appStore.groupNumber);
            appStore.setUpdateLocList(false);
        }
    }, [appStore.updateLocList])

    useEffect(() => {
        if (appStore.groupNumber)
            fetchData(appStore.groupNumber);
    }, [appStore.groupNumber]);

    useEffect(() => {
        let tmpList = allLocations.current;

        if (!tmpList) {
            return;
        }

        const filterOpt = tagList.find(item => item.selected)?.title;
        if (filterOpt !== 'All') {
            tmpList = tmpList.filter(item => item.locationTag.includes(filterOpt));
        }
        setLocList(tmpList);
    }, [tagList]);

    return (
    <View style={styles.container}>
        <View style={styles.top}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#333232'}}>Location List</Text>
            <Icon size={30} name={'menu'} color={'#333232'} />
        </View>
        <LocationList tagList={tagList} locList={locList} onTagPress={onTagPress} onDelete={() => fetchData(appStore.groupNumber)} />
    </View>
    );
}));
