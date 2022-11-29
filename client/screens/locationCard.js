import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { inject, observer } from 'mobx-react';
import axios from '../utils/request';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    top: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        height: '100%',
        flexDirection: 'column',
        flex: 1
    },
    btn: {
        height: 24,
        width: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#DF2C2C',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mid: {
        height: 'auto',
        width: '100%',
        borderTopWidth: .5,
        borderBottomWidth: .5,
        borderColor: '#D9D9D9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    bot: {
        height: 65,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default inject('appStore')(observer(({item, navigation, useCheck = false, onItemCheck, onDelete, appStore}) => {

    const canDelete = item.username === appStore.username;
    const [voted, setVoted] = useState(false);
    const [votes, setVotes] = useState(0);
    
    const fetchVotes = async () => {
        try {
            const resp = await axios.post('/vote/findNumberOfNotesOneGroupOneTime', {
                groupNumber: appStore.groupNumber,
                voteStartTime: appStore.voteStartTime,
                locationName: item.locationName
            })
            const { code, data, message } = resp.data;
            if (code === 0) {
                setVotes(data);
            }
            else {
                console.log(message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const fetchHasVoted = async () => {
        try {
            const resp = await axios.post('/people/findIfVote', {
                groupNumber: appStore.groupNumber,
                voteStartTime: appStore.voteStartTime,
                username: appStore.username,
                locationName: item.locationName
            })
            const { code, data, message } = resp.data;
            if (code === 0) {
                setVoted(data);
            }
            else {
                console.log(message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (appStore.voteStartTime) {
            fetchVotes();
            fetchHasVoted();
        }
    })

    const onVotePress = async () => {
        if (voted) {
            return;
        }
        try {
            const resp = await axios.post('/vote/votePlus', {
                groupNumber: appStore.groupNumber,
                voteStartTime: appStore.voteStartTime,
                username: appStore.username,
                locationName: item.locationName,
                locationAddress: item.locationAddress
            })
            const { code, data, message } = resp.data;
            if (code === 0) {
                setVotes(e => e + 1);
                setVoted(true);
            }
            else {
                console.log(message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onDeletePress = async () => {
        try {
            const resp = await axios.post('/locationList/deleteLocation', {
                groupNumber: appStore.groupNumber,
                username: appStore.username,
                locationName: item.locationName,
                locationAddress: item.locationAddress
            })
            const { code, data, message } = resp.data;
            if (code === 0) {
                onDelete();
            }
            else {
                console.log(message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('LocationDetail', { item })}>
            <View style={styles.top}>
                <View style={styles.title}>
                    <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000'}} numberOfLines={1} ellipsizeMode={'tail'}>{item.locationName}</Text>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <Text style={{fontSize: 8}} numberOfLines={1} ellipsizeMode={'middle'}>{item.locationAddress}</Text>
                        <Text style={{fontSize: 8, color: '#FA4A0C'}}> · {item.locationTag}</Text>
                    </View>
                </View>
                {useCheck ? 
                    <View style={{alignSelf: 'center', marginBottom: 5}}>
                        <Pressable style={styles.checkbox} onPress={onItemCheck}>
                            {item.checked && <Icon name='check' size={20} color={'#DF2C2C'} />}
                        </Pressable>
                    </View>
                :
                    <View style={{flexDirection: "row-reverse", marginTop: 6}}>
                        {Boolean(appStore.voteStartTime) && <Pressable style={{...styles.btn, backgroundColor: voted ? '#ADADAF' : '#DF2C2C'}} onPress={onVotePress}>
                            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#FFFEFE'}}>{voted ? `${votes} VOTED` : 'VOTE'}</Text>
                        </Pressable>}
                        {canDelete && <Pressable style={{...styles.btn, width: 40, backgroundColor: '#ADADAF'}} onPress={onDeletePress}>
                            <Icon name='delete' size={16} color={'#FFFEFE'} />
                        </Pressable>}
                    </View>
                }
            </View>
            <View style={styles.mid}>
                <Icon style={{marginRight: 10}} name={'like1'} size={15} color={'#FA4A0C'} />
                <Text style={{flex: 1, fontSize: 12}}>{'“' + item.comments.split(';oneComment;')[0] + '”'}</Text>
            </View>
            <View style={styles.bot}>
                {!item.photos && <Text style={{width: '100%', textAlign: 'center'}}>No Photo</Text>}
                {item.photos.split(';onePhoto;').slice(0, 3).map((e, id) => e && <Image key={id} style={{height: '70%', width: '30%'}} source={{uri: `data:image/png;base64,${e}`}}/>)}
            </View>
        </Pressable>
    );
}));
