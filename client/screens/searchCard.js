import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 15,
        backgroundColor: '#FA4A0C',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    detail: {
        flex: 1,
        height: 60,
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9'
    }
});

export default ({item, navigation}) => {
    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('LocationDetail', { item })}>
            <View style={styles.icon}>
                <Icon name={'location-outline'} size={20} color={'#FFFEFE'} />
            </View>
            <View style={styles.detail}>
                <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>{item.locationName}</Text>
                <Text style={{fontSize: 10, color: '#ADADAF', marginTop: 2}}>{item.locationAddress}</Text>
            </View>
        </Pressable>
    );
}