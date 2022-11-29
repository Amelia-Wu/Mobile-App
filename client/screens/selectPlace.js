import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView, Dimensions, Pressable } from 'react-native';
import MapView from "react-native-map-clustering";
import { Marker } from 'react-native-maps';
import IconIO from "react-native-vector-icons/Ionicons";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const PanelItem = ({item, onArrowPress}) => {
    const itemStyles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            height: 60,
            width: '100%',
            paddingHorizontal: 20,
            alignItems: 'center',
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: .5
        },
        text: {
            flex: 1,
            paddingRight: 10
        }
    });

    return (
        <View style={itemStyles.container}>
            <View style={itemStyles.text}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#605F5F'}} numberOfLines={1} ellipsizeMode={'tail'}>{item.locationName}</Text>
                <Text style={{fontSize: 12, color: '#605F5F'}} numberOfLines={1} ellipsizeMode={'tail'}>{item.locationAddress}</Text>
            </View>
            <IconIO name='arrow-forward' size={20} color={'#605F5F'} onPress={onArrowPress} />
        </View>
    );
};

export default ({ navigation }) => {
    const [myLoc, setMyLoc] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [markers, setMarkers] = useState([
        // { latitude: 38.856865, longitude: -121.750975 },
        // { latitude: 38.866865, longitude: -121.730975 },
        // { latitude: 38.836865, longitude: -121.710975 }
    ]);
    const [newRegion, setNewRegion] = useState();
    const [panelItems, setPanelItems] = useState([
        // {locationName: 'Place Name 1', locationAddress: '440 Elizabeth Street, Melbourne 3000'},
        // {locationName: 'Place Name 1', locationAddress: '440 Elizabeth Street, Melbourne 3000'},
        // {locationName: 'Place Name 1', locationAddress: '440 Elizabeth Street, Melbourne 3000'},
        // {locationName: 'Place Name 1', locationAddress: '440 Elizabeth Street, Melbourne 3000'},
        // {locationName: 'Place Name 1', locationAddress: '440 Elizabeth Street, Melbourne 3000'},
        // {locationName: 'Place Name 1', locationAddress: '440 Elizabeth Street, Melbourne 3000'}
    ]);
    
    const [showPanel, setShowPanel] = useState(false);

    useEffect(() => {
        if (newRegion){
            setMarkers([...markers, newRegion]);
            setMyLoc({...myLoc, latitude: newRegion.latitude, longitude: newRegion.longitude});
        }
    }, [newRegion])

    const onMarkerPress = id => {
        setPanelItems([markers[id]]);
        setShowPanel(true);
    }

    const onMapPress = e => {
        setShowPanel(false);
    }

    const onClusterPress = (cls, mks) => {
        const coords = mks.map(e => e.geometry.coordinates.toString());
        setPanelItems(markers.filter(e => coords.includes(e.longitude + ',' + e.latitude)));
        setShowPanel(true);
    }

    const onPanelArrowPress = id => {
        navigation.navigate('AddLocation', { location: panelItems[id] });
    }

    const onConfirmPress = () => {
        navigation.navigate('AddLocation', { location: panelItems[0] });
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setMyLoc({ ...myLoc, latitude: info.coords.latitude, longitude: info.coords.longitude });
        });
    }, [])

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: 'distance'
                }}
                onPress={(data, details = null) => {
                    const region = {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        locationName: data.structured_formatting.main_text,
                        locationAddress: data.structured_formatting.secondary_text
                    };
                    setNewRegion(region);
                    setPanelItems([region]);
                }}
                query={{
                    key: 'AIzaSyDSASEXJxYAERzTAKBxZczICFcQcCQ0cuQ',
                    language: 'en',
                    radius: 30000
                }}
                styles={{
                    textInput: styles.search,
                    container: { flex: 0, width: '100%', zIndex: 1, paddingHorizontal: 20, marginTop: 10 },
                    listView: { marginTop: 10, backgroundColor: 'white' }
                }}
            />
            <MapView
                style={styles.map}
                provider={'google'}
                region={myLoc}
                showsUserLocation={true}
                showsMyLocationButton={false}
                followsUserLocation={true}
                onPress={onMapPress}
                onClusterPress={onClusterPress}
            >
                {markers.map((item, id) => <Marker
                    key={id}
                    coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude
                    }}
                    onPress={() => onMarkerPress(id)}
                />)}
            </MapView>
            {showPanel && <View style={styles.panel} >
                <View style={styles.panelTitle}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#605F5F'}}>Choose your place</Text>
                </View>
                <ScrollView style={styles.panelContent}>
                    {panelItems.map((item, id) => <PanelItem key={id} item={item} onArrowPress={() => onPanelArrowPress(id) } />)}
                </ScrollView>
            </View>}
            <View style={styles.footer}>
                <IconMCI name='map-plus' size={25} color={'#605F5F'} />
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginHorizontal: 10, height: 25}}>
                    <Text style={{fontSize: 16, color: '#605F5F'}}>Directly use the </Text>
                    <IconMCI name='map-marker' size={25} color={'#DF2C2C'} />
                    <Text style={{fontSize: 16, color: '#605F5F'}}> position</Text>
                </View>
                <TouchableOpacity style={styles.confirmBtn} onPress={onConfirmPress}>
                    <Text style={{color: '#FFFEFE', fontSize: 12}}>COMFIRM</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    confirmBtn: {
        width: 100,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FA4A0C',
        justifyContent: 'center',
        alignItems: 'center'
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
    footer: {
        width: '100%',
        height: 60,
        backgroundColor: '#FFFEFE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 2
    },
    panel: {
        position: 'absolute',
        width: Dimensions.get('window').width - 20,
        height: 'auto',
        bottom: 60,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#FFFEFE',
        zIndex: 1
    },
    panelTitle: {
        height: 'auto',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1
    },
    panelContent: {
        width: '100%',
        maxHeight: 180
    },
    map: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});