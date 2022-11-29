import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Pressable, Image } from 'react-native';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconA from 'react-native-vector-icons/AntDesign';
import axios from '../utils/request';
import { inject, observer } from 'mobx-react';
import openCamera from '../utils/upload';


const initTags = [
    {label: 'Food', selected: false},
    {label: 'Drink', selected: false},
    {label: 'Indoor Activity', selected: false},
    {label: 'Outdoor Activity', selected: false},
];

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 15
    },
    lineCon: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 30,
        borderColor: '#FA4A0C',
        borderWidth: 1,
        backgroundColor: '#FFFEFE',
        marginVertical: 10,
        paddingHorizontal: 15
    },
    lineTitle: {
        width: 60,
        height: 'auto',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333232',
        borderRightColor: '#FA4A0C',
        borderRightWidth: 1,
        marginRight: 10,
        paddingRight: 10
    },
    lineDesc: {
        flex: 1,
        height: 'auto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333232',
    },
    tag: {
        borderRadius: 30,
        marginRight: 5,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    recomCon: {
        flex: 2,
        paddingVertical: 10
    },
    recomInput: {
        height: '100%',
        borderRadius: 24,
        borderColor: '#FA4A0C',
        borderWidth: 1,
        backgroundColor: '#FFFEFE',
        paddingVertical: 20,
        paddingHorizontal: 30,
        textAlignVertical: 'top'
    },
    mediaCon: {
        flex: 1,
        paddingVertical: 10
    },
    mediaInput: {
        height: '100%',
        borderRadius: 24,
        borderColor: '#FA4A0C',
        borderWidth: 1,
        backgroundColor: '#FFFEFE',
        justifyContent: 'center',
        alignItems: 'center'
    },
    conTitle: {
        position: 'absolute',
        backgroundColor: '#FA4A0C',
        fontSize: 12,
        color: '#fff',
        left: 25,
        top: 3,
        paddingHorizontal: 5,
        zIndex: 1
    },
    btnCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#FA4A0C',
        marginVertical: 10
    }
});

export default inject('appStore')(observer(({navigation, route, appStore}) => {
    const [tags, setTags] = useState(initTags);
    const [locationName, setLocationName] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [reason, setReason] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        if (route.params?.location) {
            setLocationName(route.params?.location.locationName);
            setLocationAddress(route.params?.location.locationAddress);
        }
    }, [route.params])

    const onTagPress = id => {
        const tmpTags = tags.map(e => ({...e, selected: false}));
        tmpTags[id].selected = !tags[id].selected;
        setTags(tmpTags);
    }

    const onPostPress = async () => {
        if (!locationAddress)
            return;
        try {
            const params = {
                groupNumber: appStore.groupNumber,
                username: appStore.username,
                locationName,
                locationTag: tags.find(e => e.selected)?.label || '',
                comments: reason + ';oneComment;',
                photos: photo + ';onePhoto;',
                ...route.params.location
            };
            console.log(params);
            const resp = await axios.post('/locationList/addNewLocation', params);
            const {code, data, message} = resp.data;
            if (code === 0) {
                appStore.setUpdateLocList(true);
                navigation.navigate('TabNavigator', {screen: 'MAP'});
            }
            else {
                console.log(message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onPressPhoto = async () => {
        const base64 = await openCamera();
        setPhoto(base64);
    }

    return(
        <View style={styles.container}>
            <Pressable style={styles.lineCon} onPress={() => navigation.navigate('SelectPlace')}>
                <Text style={styles.lineTitle}>Place Address</Text>
                <Text style={styles.lineDesc} numberOfLines={1} ellipsizeMode={'tail'}>{locationAddress}</Text>
                <IconF style={{marginLeft: 5}} name={'location-arrow'} size={25} color={'#FA4A0C'} />
            </Pressable>
            <View style={styles.lineCon}>
                <Text style={styles.lineTitle}>Place Name</Text>
                <TextInput style={styles.lineDesc} value={locationName} onChangeText={text => setLocationName(text)} />
            </View>
            <View style={styles.lineCon}>
                <Text style={styles.lineTitle}>{'Tag\n'}<Text style={{fontSize: 10, fontWeight: 'normal'}}>(Optional)</Text></Text>
                <ScrollView style={{flex: 1, height: 'auto', flexDirection: 'row'}} horizontal showsHorizontalScrollIndicator={false}>
                    {tags.map((item, id) => (
                        <TouchableOpacity key={id} style={{...styles.tag, backgroundColor: item.selected ? '#FA4A0C' : '#D9D9D9'}} onPress={() => onTagPress(id)}>
                            <Text style={{fontSize: 14, color: item.selected ? '#FFFEFE' : '#333232'}}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.recomCon}>
                <Text style={styles.conTitle}>Recommend Reason</Text>
                <TextInput
                    style={styles.recomInput}
                    value={reason}
                    onChangeText={text => setReason(text)}
                    multiline
                    placeholder={'Type here'}
                />
            </View>
            <View style={styles.mediaCon}>
                <Text style={styles.conTitle}>Add Photo</Text>
                {!photo ? 
                <Pressable style={styles.mediaInput} onPress={onPressPhoto}>
                    <IconA name='plus' size={30} color={'#FA4A0C'} />
                </Pressable>
                :
                <Image style={styles.mediaInput} source={{uri: `data:image/png;base64,${photo}`}}/>
                }
            </View>
            <TouchableOpacity style={styles.btnCon} onPress={onPostPress}>
                <Text style={{color: '#FFFEFE', fontSize: 24, fontWeight: 'bold'}}>POST</Text>
            </TouchableOpacity>
        </View>
    )
}));