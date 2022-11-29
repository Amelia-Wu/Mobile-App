import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { inject, observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';

export default inject('appStore')(observer(function AccountSetting({ appStore, route }) {
    const navigation = useNavigation();

    const userName = appStore.username;
    const nickName = appStore.nickname;

    const pressHandlerHome = () => {
        navigation.navigate('Home')
    };
    const pressHandlerModifyNickname = () => {
        navigation.navigate('ModifyNickname')
    };
    const pressHandlerModifyPassword = () => {
        navigation.navigate('ModifyPassword')
    };

    renderSeparator = () => (
        <View
            style={{
                backgroundColor: 'black',
                height: 0.5,
            }}
        />
    );

    return (
        <View>
            <View>
                <TouchableOpacity>
                    <Text style={styles.groupText}>{userName}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.groupTextSmall}>{nickName}</Text>
                        <FontAwesome5 style={styles.iconEditStyle} name="edit" size={20} color="#FA4A0C" onPress={pressHandlerModifyNickname} />
                    </View>

                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'black', height: 0.5 }} />

            <View>
                <TouchableOpacity>
                    <Text style={styles.groupTextPassword} onPress={pressHandlerModifyPassword}>Modify Password</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'black', height: 0.5 }} />

            <View style={styles.container}>
                <TouchableOpacity style={globalStyles.generalButton}>
                    <Text style={globalStyles.generalButtonText} onPress={pressHandlerHome}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}))


const styles = StyleSheet.create({
    container: {
        padding: 50,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 30,
        height: 44,
    },
    groupText: {
        fontSize: 30,
        color: "black",
        paddingTop: 20,
        paddingLeft: 15
    },
    groupTextPassword: {
        fontSize: 30,
        color: "black",
        paddingVertical: 20,
        paddingLeft: 15
    },
    groupTextSmall: {
        fontSize: 20,
        color: "black",
        paddingBottom: 20,
        paddingLeft: 15
    },
    iconEditStyle: {
        paddingLeft: 10
    }
})
