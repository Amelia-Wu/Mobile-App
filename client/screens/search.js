import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import SearchCard from './searchCard';
import Icon from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20
    },
    top: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    search: {
        flex: 1,
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
    cancel: {
        color: '#DF2C2C',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    bot: {
        flex: 1,
        width: '100%'
    }
});

export default ({navigation, route}) => {
    const [searchVal, setSearchVal] = useState('');
    const [resList, setResList] = useState([]);

    const onChangeSearchVal = val => {

    }

    useEffect(() => {
        setResList(route.params.locList);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.search}>
                    <Icon size={20} name={'search-outline'} color={'black'} />
                    <TextInput
                        style={{marginLeft: 10}}
                        value={searchVal}
                        placeholder={'Search'}
                        onChangeText={text => {
                            setSearchVal(text);
                            onChangeSearchVal(text);
                        }}
                    />
                </View>
                <Text style={styles.cancel} onPress={() => navigation.goBack()}>Cancel</Text>
            </View>
            <FlatList
                style={styles.bot}
                data={resList}
                renderItem={({item}) => <SearchCard item={item} navigation={navigation} />}
            />
        </View>
    );
};