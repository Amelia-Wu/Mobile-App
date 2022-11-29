import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../utils/request';
import { inject, observer } from 'mobx-react';
import openCamera from '../utils/upload';

export default inject('appStore')(observer(({ navigation, route, appStore }) => {

    const addType = route.params?.addType || 'photo';

    const item = route.params?.item;

    const [recText, setRecText] = useState('');
    const [photos, setPhotos] = useState([]);

    const onPostPress = async () => {
        if (!recText && !photos.length)
            return;
        try {
            const path = addType === 'photo' ? '/locationList/addNewPhotos' : '/locationList/addNewComments';
            const reqParams = {
                groupNumber: appStore.groupNumber,
                locationName: item.locationName,
                locationAddress: item.locationAddress
            };
            if (addType === 'photo') {
                reqParams.photos = photos.join(';onePhoto;') + ';onePhoto;';
            }
            else {
                reqParams.comments = recText + ';oneComment;';
            }
            const resp = await axios.post(path, reqParams);
            console.log(resp.data);
            const {code, data, message} = resp.data;
            if (code === 0) {
                const params = { item }
                recText && (params.newRec = recText);
                photos.length && (params.newPhotos = photos);
                navigation.navigate('LocationDetail', params);
            }
            else {
                console.log(message);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const addPhoto = async () => {
        const base64 = await openCamera();
        setPhotos([...photos, base64]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize: 28, color: '#333232'}} numberOfLines={1} ellipsizeMode={'tail'}>{item.locationName}</Text>
                <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
                    <Text style={{fontSize: 12}} numberOfLines={1} ellipsizeMode={'middle'}>{item.locationAddress}</Text>
                    <Text style={{fontSize: 12, color: '#FA4A0C'}}> · {item.locationTag}</Text>
                </View>
            </View>
            {addType === 'reason' && <View style={styles.recCon}>
                <TextInput style={styles.input} value={recText} placeholder={'Share your recommended reason.'} onChangeText={text => setRecText(text)} multiline />
            </View>}
            {addType === 'photo' && <View style={styles.photoCon}>
                <ScrollView style={{flex: 1}} horizontal>
                    {photos.map((e, id) => <Image key={id} style={styles.photo} source={{uri: `data:image/png;base64,${e}`}}/>)}
                    <Pressable style={styles.photo} onPress={addPhoto}>
                        <Icon name='add' size={40} color={'#ADADAF'} />
                    </Pressable>
                </ScrollView>
            </View>}
            <View style={styles.bot}>
                <Pressable style={{...styles.btn}} onPress={onPostPress}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#DF2C2C'}}>{'POST'}</Text>
                </Pressable>
            </View>
        </View>
    );
}));

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    header: {
        width: '100%',
        height: 120,
        justifyContent: 'center',
        borderRadius: 16
    },
    recCon: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 16,
        borderColor: '#333232',
        borderWidth: .5
    },
    photoCon: {
        width: '100%',
        height: 220,
        flexDirection: 'row'
    },
    photo: {
        width: 160,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: .5,
        borderColor: '#333232',
        marginRight: 10
    },
    input: {
        width: '100%',
        height: 350,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 22,
        color: '#333232'
    },
    bot: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row-reverse',
        marginTop: 20
    },
    btn: {
        height: 32,
        width: 80,
        borderRadius: 16,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderColor: '#DF2C2C'
    }
});