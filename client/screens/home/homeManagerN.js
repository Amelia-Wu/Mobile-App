import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Image, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from "../../shared/card";
import Icon from 'react-native-vector-icons/Ionicons';
import {inject, observer} from 'mobx-react';
import axios from '../../utils/request';
import { useNavigation } from '@react-navigation/native';

export default inject('appStore')(observer(function HomeManager({appStore, route}) {
    const navigation = useNavigation();

    const groupNumber = appStore.groupNumber;
    const groupName = appStore.groupName;
    const isManager = appStore.isManager;

    const [activityName, setActivityName] = useState('None');
    const [isVoting, setIsVoting] = useState(false);
    const [voteCountDown, setVoteCountDown] = useState(0);
    const [lastVoteRes, setLastVoteRes] = useState('');

    const timer = useRef();

    const fetchVote = async groupNumber => {
        try {
            const resp = await axios.post('/vote/returnActivityNameAndTime', { groupNumber });
            const { code, data } = resp.data;
            if (code === 0) {
                if (data) {
                    appStore.setVoteStartTime(data.voteStartTime);
                    const currTime = new Date();
                    const countDown = new Date(data.voteOverTime) - currTime - currTime.getTimezoneOffset() * 60 * 1000;
                    if (countDown <= 0) {
                        setActivityName('None');
                        setVoteCountDown(0);
                        setIsVoting(false);
                    } else {
                        setActivityName(data.activityName);
                        setVoteCountDown(countDown);
                        setIsVoting(true);
                    }
                }
                else {
                    setVoteCountDown(0);
                    appStore.setVoteStartTime('');
                    setActivityName('None');
                    setIsVoting(false);
                }
            }
            else {
                console.log('error');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchLastRes = async groupNumber => {
        try {
            const resp = await axios.post('/vote/getLastWinningLocation', { groupNumber });
            const { code, data } = resp.data;
            if (code === 0) {
                setLastVoteRes(data);
            }
            else {
                console.log('error');
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (groupNumber) {
            fetchVote(groupNumber);
            fetchLastRes(groupNumber);
        }
    }, [appStore.groupNumber]);

    useEffect(() => {
        if (!timer.current && voteCountDown > 0) {
            if (appStore.voteStartTime) {
                setIsVoting(true);
                timer.current = setInterval(() => {
                    if (voteCountDown === 0) {
                        setIsVoting(false);
                        clearInterval(timer.current);
                        return;
                    }
                    setVoteCountDown(time => time - 1000);
                }, 1000);
            }
        }
        return () => {
            clearInterval(timer.current);
            timer.current = null;
        }
    }, [isVoting, appStore.voteStartTime]);

    const getCountDownText = remain => {
        const seconds = Math.floor((remain / 1000) % 60).toString().padStart(2, '0');
        const minutes = Math.floor((remain / 1000 / 60) % 60).toString().padStart(2, '0');
        const hours = Math.floor(remain / 1000 / 60 / 60).toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    const pressHandlerAddLocation = () => {
        navigation.navigate('AddLocation');
    };
    const pressHandlerMyGroups = () => {
        navigation.navigate('MyGroups');
    };
    const pressHandlerManageGroups = () => {
        navigation.navigate('ManageGroups');
    };
    const pressHandlerVote = () => {
        navigation.navigate('Vote');
    };
    const pressHandlerAccountSetting = () => {
        navigation.navigate('AccountSetting');
    };

    return (
        <View>
            <View style={styles.containerTop}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.image} source={require('../../images/Welcome.png')} />
                    <Icon style={styles.iconStyle} name="settings-outline" size={35} color="black" onPress={pressHandlerAccountSetting} />
                </View>
                
                <Card>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.cardSmallText}>Group Name</Text>
                        <Text style={styles.cardLinkText} onPress={pressHandlerMyGroups}>{'All  >'}</Text>
                    </View>
                    <Text style={globalStyles.cardText}>{ groupName }</Text>
                </Card>

                {Boolean(lastVoteRes) && <Card>
                    <Text style={styles.cardSmallText}>Last Voting Result</Text>
                    <Text style={globalStyles.cardText}>{ lastVoteRes }</Text>
                </Card>}

                {(isManager || isVoting) && <Card>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.cardSmallText}>Current Voting</Text>
                        {isManager && !isVoting && <Text style={styles.cardLinkTextCreate} onPress={pressHandlerVote}>{'Create  >'}</Text>}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={globalStyles.cardText}>{ activityName }</Text>
                        {isVoting && <Text style={styles.cardText}>{getCountDownText(voteCountDown)}</Text>}
                    </View>
                </Card>}              
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={globalStyles.smallButton1} onPress={pressHandlerAddLocation}>
                    <Text style={globalStyles.smallButtonText1}>Add Location</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={globalStyles.smallButton2} onPress={pressHandlerManageGroups}>
                    <Text style={globalStyles.smallButtonText2}>Manage Group</Text>
                </TouchableOpacity>    
            </View>
        </View> 
    )
}))

const styles = StyleSheet.create({
    containerTop: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    image: {
        width: 200,
        height: 200,
    },
    cardText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#FA4A0C",
        textAlign: "right",
        paddingBottom: 15,
    },
    cardSmallText: {
        color: "#333",
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 20,
    },
    cardLinkText: {
        color: "#FA4A0C",
        fontSize: 15,
        paddingLeft: 150,
        paddingTop: 20,
    },
    cardLinkTextCreate: {
        color: "#FA4A0C",
        fontSize: 15,
        paddingLeft: 100,
        paddingTop: 20,
    },
    cardLinkTextStop: {
        color: "grey",
        fontSize: 15,
        paddingLeft: 110,
        paddingTop: 20,
    },
    iconStyle: {
        paddingLeft: 80,
        paddingTop: 30
    }
})
