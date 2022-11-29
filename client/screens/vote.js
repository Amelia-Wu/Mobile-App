import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import axios from '../utils/request';
import { inject, observer } from 'mobx-react';

export default inject('appStore')(observer(function Vote({ route, navigation, appStore }) {
    const groupNumber = appStore.groupNumber;

    const pressHandlerChooseLocation = () => {
        navigation.navigate('ChooseLocation');
    };

    const [activityName, setActivityName] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');

    const pressHandlerStart = async () => {
        if (!route.params?.locations.length) {
            return;
        }

        try {
            const startTime = new Date();
            const duration = hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000;
            const overTime = new Date(startTime.getTime() + duration);

            const formatedStartTime = startTime.toISOString().replace('T', ' ').replace(/\..*/, '');
            const formatedOverTime = overTime.toISOString().replace('T', ' ').replace(/\..*/, '');

            console.log(startTime)
            console.log(formatedStartTime)
            console.log(overTime)
            console.log(formatedOverTime)

            const params = [];
            for (let loc of route.params.locations) {
                params.push({
                    groupNumber,
                    activityName,
                    voteStartTime: formatedStartTime,
                    voteOverTime: formatedOverTime,
                    locationName: loc.locationName,
                    locationAddress: loc.locationAddress,
                    locationTag: loc.locationTag,
                    comments: loc.comments,
                    photos: loc.photos
                });
            }

            const response = await axios.post('/vote/startVoting', params);
            const { code, data } = response.data;
            if (code === 0) {
                appStore.setVoteStartTime(formatedStartTime);
                navigation.navigate('TabNavigator', { screen: 'HOME' });
            } else {
                console.log("Voting failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    value={activityName}
                    placeholder="Activity Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(activityName) => setActivityName(activityName)}
                />
            </View>

            <TouchableOpacity style={styles.inputView} onPress={pressHandlerChooseLocation}>
                <Text style={styles.TextLocation}>Location List</Text>
            </TouchableOpacity>

            <Text style={styles.timeText}>Vote Lasts For</Text>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.timerText}>      Hour</Text>
                <Text style={styles.timerText}>     Minute</Text>
                <Text style={styles.timerText}>   Second</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View style={styles.timerView}>
                    <TextInput
                        style={styles.TimerInput}
                        value={hour}
                        placeholder="00"
                        placeholderTextColor="#FA4A0C"
                        keyboardType='numeric'
                        onChangeText={(text) => setHour(parseInt(text))}
                        maxLength={2}
                    />
                </View>
                <Text style={styles.colonStyle}>:</Text>

                <View style={styles.timerView}>
                    <TextInput
                        style={styles.TimerInput}
                        value={minute}
                        placeholder="00"
                        placeholderTextColor="#FA4A0C"
                        keyboardType='numeric'
                        onChangeText={(text) => setMinute(parseInt(text))}
                        maxLength={2}
                    />
                </View>
                <Text style={styles.colonStyle}>:</Text>

                <View style={styles.timerView}>
                    <TextInput
                        style={styles.TimerInput}
                        value={second}
                        placeholder="00"
                        placeholderTextColor="#FA4A0C"
                        keyboardType='numeric'
                        onChangeText={(text) => setSecond(parseInt(text))}
                        maxLength={2}
                    />
                </View>
            </View>

            <TouchableOpacity style={globalStyles.generalButton} onPress={pressHandlerStart}>
                <Text style={globalStyles.generalButtonText}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}));

const styles = StyleSheet.create({
    container: {
        padding: 50,
    },
    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "100%",
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInput: {
        height: 70,
        padding: 10,
    },
    TimerInput: {
        height: 70,
        padding: 10,
        marginLeft: 10,
        fontSize: 30,
        color: "#FA4A0C"
    },
    TextLocation: {
        height: 70,
        paddingTop: 25,
        color: "black"
    },
    hintButton: {
        height: 30,
    },
    textRegisterButton: {
        height: 30,
        color: "#FA4A0C"
    },
    timeText: {
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 50,
        paddingLeft: 50,
        color: "#FA4A0C",
    },
    timerView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "25%",
        height: 70,
        marginLeft: 10,
    },
    timerText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingRight: 30,
        paddingTop: 15,
    },
    colonStyle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "grey",
        paddingTop: 10,
        paddingLeft: 10
    }
});