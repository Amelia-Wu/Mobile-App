import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconIO from 'react-native-vector-icons/Ionicons';

const ReasonItem = ({ text }) => {
    const itemStyles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            padding: 20,
            marginHorizontal: 10
        },
        icon: {
            width: 24,
            height: 24,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FA4A0C',
            marginRight: 16
        },
        text: {
            flex: 1,
            fontSize: 16,
            lineHeight: 22,
            color: '#333232'
        }
    });

    return (
        <View style={itemStyles.container}>
            <View style={itemStyles.icon}>
                <IconAD name='like1' size={14} color={'#FFFEFE'} />
            </View>
            <Text style={itemStyles.text}>{text}</Text>
        </View>
    );
};

export default ({navigation, route}) => {
    // const item = {
    //     "comments": "fantastic!;oneCommentkdjfaslkdfjlskfjlksadjflksjdflksajdflkasdjfklsdjfklasjdfkls;",
    //     "groupNumber": 182205,
    //     "locationAddress": "402 Elizabeth street",
    //     "locationName": "DaWei hotpot",
    //     "locationTag": "Food",
    //     "photos": "photo2;onePhoto;",
    //     "username": "zhang"
    // };

    const item = route.params.item;

    const [voted, setVoted] = useState(false);
    const [votes, setVotes] = useState(0);
    const [comments, setComments] = useState(item.comments.split(';oneComment;').slice(0, 1));
    const [photos, setPhotos] = useState(item.photos.split(';onePhoto;'));
    const [collapse, setCollapse] = useState(true);

    const onVotePress = () => {
        if (voted) {
            return;
        }
        setVotes(e => e + 1);
        setVoted(true);
    }

    const collapseReason = () => {
        const allComments = item.comments.split(';oneComment;');
        setComments(collapse ? allComments : allComments.slice(0, 1));
        setCollapse(e => !e);
    }

    useEffect(() => {
        if (route.params.newRec) {
            item.comments += route.params.newRec + ';oneComment;';
        }
        if (route.params.newPhotos) {
            item.photos += route.params.newPhotos.join(';onePhoto;') + ';onePhoto;';
        }
    }, [route.params]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={{fontSize: 28, color: '#333232'}} numberOfLines={1} ellipsizeMode={'tail'}>{item.locationName}</Text>
                    <View style={{flexDirection: 'row', width: '100%', marginTop: 5}}>
                        <Text style={{fontSize: 12}} numberOfLines={1} ellipsizeMode={'middle'}>{item.locationAddress}</Text>
                        <Text style={{fontSize: 12, color: '#FA4A0C'}}> · {item.locationTag}</Text>
                    </View>
                </View>
                <View style={{flexDirection: "row-reverse", marginTop: 6}}>
                    <Pressable style={{...styles.btn, borderColor: voted ? '#ADADAF' : '#FA4A0C'}} onPress={onVotePress}>
                        <Text style={{fontSize: 16, color: voted ? '#ADADAF' : '#FA4A0C'}}>{voted ? `${votes} VOTED` : 'VOTE'}</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.mid}>
                <View style={styles.subTitle}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#333232'}}>Recommend reasons</Text>
                    <Pressable style={{flexDirection: 'row', alignItems: 'baseline'}} onPress={() => navigation.navigate('AddLocDetail', {addType: 'reason', item})}>
                        <Text style={{color: '#DF2C2C', fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>+ Add</Text>
                    </Pressable>
                </View>
                {comments.map((comment, id) => comment ? <ReasonItem key={id} text={comment} /> : null)}
                <Pressable style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 5}} onPress={collapseReason}>
                    <IconIO name={collapse ? 'chevron-down' : 'chevron-up'} size={14} color={'#000'} />
                    <Text style={{color: '#333232', fontSize: 12, marginLeft: 5}}>See {collapse ? 'all' : 'less'}</Text>
                </Pressable>
            </View>
            <View style={styles.bot}>
                <View style={styles.subTitle}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#333232'}}>Photos</Text>
                    <Pressable style={{flexDirection: 'row', alignItems: 'baseline'}} onPress={() => navigation.navigate('AddLocDetail', {addType: 'photo', item})}>
                        <Text style={{color: '#DF2C2C', fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>+ Add</Text>
                    </Pressable>
                </View>
                <View style={styles.imgCon}>
                    {
                        photos.map((e, id) => e && <Image key={id} style={styles.img} source={{uri: `data:image/png;base64,${e}`}}/>)
                    }
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        padding: 10
    },
    header: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 20,
        backgroundColor: '#FAF9F9'
    },
    title: {
        flexDirection: 'column',
        flex: 1
    },
    btn: {
        height: 32,
        width: 80,
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    mid: {
        marginTop: 20,
        alignItems: 'center'
    },
    subTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    bot: {
        marginTop: 20,
        width: '100%'
    },
    imgCon: {
        height: 'auto',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20
    },
    img: {
        width: '45%',
        height: 160,
        borderRadius: 16,
        backgroundColor: '#D9D9D9',
        marginBottom: 20
    }
});