import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFO from 'react-native-vector-icons/Fontisto';
import LocationCard from './locationCard';
import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import axios from '../utils/request';

const initTypeFilter = [
    { title: 'All', selected: true },
    { title: 'Food', selected: false },
    { title: 'Drink', selected: false },
    { title: 'Indoor Activity', selected: false },
    { title: 'Outdoor Activity', selected: false }
];

const initVoteFilter = [
    { title: 'More than 5 people voted', selected: true },
    { title: 'More than 10 people voted', selected: false },
    { title: 'More than 20 people voted', selected: false },
    { title: 'More than 50 people voted', selected: false }
];

const FilterMenu = ({ filterType, items = [], onItemPress }) => {

    const filterStyles = StyleSheet.create({
        container: {
            width: '80%',
            height: 'auto',
            flexDirection: 'column',
            backgroundColor: '#FFFEFE'
        },
        header: {
            width: '100%',
            height: 40,
            backgroundColor: '#FA4A0C',
            justifyContent: 'center',
            paddingHorizontal: 20
        },
        item: {
            flexDirection: 'row',
            width: '100%',
            height: 40,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    });

    return (
        <View style={filterStyles.container}>
            <View style={filterStyles.header}>
                <Text style={{fontSize: 18, color: '#FFFEFE'}}>{filterType + ' Filter'}</Text>
            </View>
            {items.map((item, id) => (
                <TouchableOpacity key={id} style={filterStyles.item} onPress={() => onItemPress(id, filterType)}>
                    <Text style={{ color: '#333232', fontSize: 16 }}>{item.title}</Text>
                    <IconFO name={item.selected ? 'radio-btn-active' : 'radio-btn-passive'} size={16} color={'#FA4A0C'} />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default inject('appStore')(observer(({ appStore }) => {
    const [myLoc, setMyLoc] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [locations, setLocations] = useState(appStore.currLocList);
    const [detail, setDetail] = useState({
        "comments": "fantastic!;oneComment;",
        "groupNumber": 182205,
        "locationAddress": "402 Elizabeth street",
        "locationName": "DaWei hotpot",
        "locationTag": "Food",
        "photos": "photo2;onePhoto;",
        "username": "zhang"
    });
    const [filterType, setFilterType] = useState('');
    const [typeFilter, setTypeFilter] = useState(initTypeFilter);
    const [voteFilter, setVoteFilter] = useState(initVoteFilter);
    const [showDetail, setShowDetail] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const tabNav = useNavigation();

    const fetchData = async groupNumber => {
        try {
            const resp = await axios.post('/locationList/showLocationList', {groupNumber});
            if (resp.data.code === 0) {
                console.log(resp.data.data)
                appStore.setCurrLocList(resp.data.data)
            }
            else {
                console.log(resp.data.message);
            }
            setLocations(resp.data.data);
        } catch (e) {
            console.log('Network Error');
        }
    };

    useEffect(() => {
        if (appStore.updateLocList) {
            fetchData(appStore.groupNumber);
            // appStore.setUpdateLocList(false);
        }
    }, [appStore.updateLocList])

    useEffect(() => {
        fetchData(appStore.groupNumber);
    }, [appStore.groupNumber])

    const onMarkerPress = id => {
        setDetail(locations[id]);
        setShowDetail(true);
        setMyLoc({...myLoc, latitude: Number(locations[id].latitude), longitude: Number(locations[id].longitude)});
    }

    const onMapPress = e => {
        setShowDetail(false);
    }

    const onFilterPress = str => {
        setFilterType(str);
        setModalVisible(true);
    }

    const onFilterItemPress = (id, type) => {
        if (type === 'Type') {
            const tmp = typeFilter.map(e => ({...e, selected: false}));
            tmp[id].selected = true;
            setTypeFilter(tmp);
        }
        else {
            const tmp = voteFilter.map(e => ({...e, selected: false}));
            tmp[id].selected = true;
            setVoteFilter(tmp);
        }
        setModalVisible(false);
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setMyLoc({ ...myLoc, latitude: info.coords.latitude, longitude: info.coords.longitude });
        });
    }, [])

    const filterItems = {
        Type: typeFilter,
        Vote: voteFilter
    }

    return (
        <View style={styles.container}>
            <View style={styles.filter}>
                <TouchableOpacity style={{ ...styles.filterBtn, flex: 3 }} onPress={() => onFilterPress('Type')}>
                    <IconFA name={'filter'} size={20} color={'#000'} />
                    <Text style={styles.filterText}>Type</Text>
                    <IconFA name={'caret-down'} size={20} color={'#605F5F'} />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.filterBtn, flex: 2 }} onPress={() => onFilterPress('Vote')}>
                    <IconFA name={'filter'} size={20} color={'#000'} />
                    <Text style={styles.filterText}>Vote</Text>
                    <IconFA name={'caret-down'} size={20} color={'#605F5F'} />
                </TouchableOpacity>
            </View>
            <MapView
                style={styles.map}
                provider={'google'}
                region={myLoc}
                showsUserLocation={true}
                showsMyLocationButton={true}
                followsUserLocation={true}
                onPress={onMapPress}
            >
                {locations.map((item, id) => <Marker
                    key={id}
                    coordinate={{
                        latitude: Number(item.latitude),
                        longitude: Number(item.longitude)
                    }}
                    onPress={() => onMarkerPress(id)}
                />)}
            </MapView>
            {showDetail && <View style={styles.locDetail} >
                <LocationCard item={detail} navigation={tabNav.getParent()} onDelete={() => {}} />
            </View>}
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#33323257'}}>
                        <FilterMenu filterType={filterType} items={filterItems[filterType]} onItemPress={onFilterItemPress} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}));

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    map: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    locDetail: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: 10,
        alignSelf: 'center',
        zIndex: 1
    },
    filter: {
        width: Dimensions.get('screen').width - 60,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1
    },
    filterBtn: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#FFFEFE',
        paddingHorizontal: 20,
        marginLeft: 10
    },
    filterText: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16,
        color: '#605F5F'
    }
});