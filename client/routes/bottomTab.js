import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import List from '../screens/list';
import Map from '../screens/map';
import homeManagerN from '../screens/home/homeManagerN';
// import homeUserV from '../screens/home/homeUserV';
import {inject, observer} from 'mobx-react';

const Tab = createBottomTabNavigator();

export default inject('appStore')(observer( props => {
    const {appStore} = props;
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'LIST') {
                        iconName = 'list';
                    } else if (route.name === 'HOME') {
                        iconName = 'home-sharp';
                    } else {
                        iconName = 'map';
                    }
        
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FA4A0C',
                tabBarInactiveTintColor: '#333232',
                headerShown: false
            })}
        >
            <Tab.Screen name={'MAP'} component={Map} />
            <Tab.Screen name={'HOME'} component={homeManagerN} />
            <Tab.Screen name={'LIST'} component={List} />
        </Tab.Navigator>
    );
}));
