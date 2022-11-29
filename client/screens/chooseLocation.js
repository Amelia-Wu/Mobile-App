import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import request from '../utils/request';
import LocationList from './locList';
import { inject, observer } from 'mobx-react';

const initTagList = [
    { title: 'All', selected: true },
    { title: 'Food', selected: false },
    { title: 'Drink', selected: false },
    { title: 'Indoor Activity', selected: false },
    { title: 'Outdoor Activity', selected: false }
];

export default inject('appStore')(observer(({ navigation, appStore }) => {

    const [tagList, setTagList] = useState(initTagList);
    const [locList, setLocList] = useState([]);

    const allLocations = useRef();


    const fetchData = async groupNumber => {
        // const num = await request.post('/locationList/showLocationList', {groupNumber: 182205});
        try {
            const resp = await request.post('/locationList/showLocationList', { groupNumber });
            if (resp.data.code === 0) {
                allLocations.current = resp.data.data;
            }
            else {
                allLocations.current = [];
            }
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

    const onItemCheck = id => {
        const tmpList = [...locList];
        tmpList[id].checked = !tmpList[id].checked;
        setLocList(tmpList);
    }

    const onSelectAllPress = () => {
        const tmpList = [...locList];
        tmpList.forEach(e => e.checked = true);
        setLocList(tmpList);
    }

    const onFinishPress = () => {
        const locations = allLocations.current.filter(e => e.checked);
        navigation.navigate('Vote', { locations });
    }

    useEffect(() => {
        fetchData(appStore.groupNumber);
    }, []);

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
            <LocationList tagList={tagList} locList={locList} onTagPress={onTagPress} useCheck onItemCheck={onItemCheck} />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.selectBtn} onPress={onSelectAllPress}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FA4A0C'}}>Select All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.finishBtn} onPress={onFinishPress}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFF'}}>Finish Selection</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}));

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: 20
    },
    footer: {
        width: '100%',
        height: 70,
        borderTopColor: '#ADADAF',
        borderTopWidth: .5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    selectBtn: {
        width: '30%',
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FA4A0C',
        justifyContent: 'center',
        alignItems: 'center'
    },
    finishBtn: {
        width: '50%',
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FA4A0C',
        backgroundColor: '#FA4A0C',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
