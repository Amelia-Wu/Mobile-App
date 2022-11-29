import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Pressable } from 'react-native';
import Empty from '../images/EmptyList.png';
import Icon from "react-native-vector-icons/Ionicons";
import LocationCard from './locationCard';
import { useNavigation } from '@react-navigation/native';

const TagItem = ({title, selected, onPress}) => {
    const itemStyles = StyleSheet.create({
        normal: {
            color: '#ADADAF',
        },
        selected: {
            color: '#FA4A0C',
            fontWeight: 'bold',
            borderBottomWidth: 2,
            borderBottomColor: '#FA4A0C'
        }
    });
    return <Text style={selected ? itemStyles.selected : itemStyles.normal} onPress={onPress}>{title}</Text>;
}

const EmptyComp = props => {
    const emptyStyles = StyleSheet.create({
        container: {
            marginTop: 100,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        image: {
            width: 250,
            height: 200,
            resizeMode: 'stretch'
        },
        text: {
            marginTop: -20,
            fontSize: 16,
            color: '#ADADAF'
        }
    });

    return (
        <View style={emptyStyles.container}>
            <Image style={emptyStyles.image} source={Empty} />
            <Text style={emptyStyles.text}>Oops... Nothing here</Text>
        </View>
    )
};

export default ({tagList, locList, onTagPress, useCheck, onItemCheck, onDelete}) => {

    const navigation = useNavigation();

    const onSearchPress = () => {
        navigation.navigate('Search', { locList });
    }

    return (
        <View style={styles.container}>
            <View style={styles.mid}>
                <Pressable style={styles.search} onPress={onSearchPress}>
                    <Icon size={20} name={'search-outline'} color={'black'} />
                    <Text style={{marginLeft: 10}}>Search</Text>
                </Pressable>
            </View>
            <View style={styles.bot}>
                <View style={styles.tags}>
                    {tagList.map((item, id) => <TagItem {...item} key={id} onPress={() => onTagPress(id)}/>)}
                </View>
                <ScrollView style={styles.list}>
                    {locList.map((item, id) => <LocationCard key={id} item={item} navigation={navigation} useCheck={useCheck} onItemCheck={() => onItemCheck(id)} onDelete={onDelete} />)}
                    {locList.length === 0 && <EmptyComp />}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    mid: {
        width: '100%',
        height: 40,
        paddingHorizontal: 20
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
    bot: {
        flexDirection: 'column',
        width: '100%',
        flexGrow: 1,
        alignItems: 'center'
    },
    tags: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    list: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10
    }
});