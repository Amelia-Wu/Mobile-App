import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/home';
import Login from '../screens/home/login';
import SignUp from '../screens/home/signup';
import MyGroups from '../screens/groups/myGroups';
import AddGroups from '../screens/groups/addGroup';
import CreateGroups from '../screens/groups/createGroup';
import ManageGroups from '../screens/groups/manageGroups';
import ModifyGroupPin from '../screens/groups/modifyGroupPin';
import GroupMembers from '../screens/groups/groupMembers';
import ModifyGroupName from '../screens/groups/modifyGroupName';
import Vote from '../screens/vote';
import AccountSetting from '../screens/home/AccountSetting';
import ModifyPassword from '../screens/home/modifyPassword';
import ModifyNickname from '../screens/home/modifyNickname';
import ChooseLocation from '../screens/chooseLocation';
import AddLocation from '../screens/addLocation';
import LocationDetail from '../screens/locationDetail';
import AddLocDetail from '../screens/addLocDetail';
import Search from '../screens/search';
import SelectPlace from '../screens/selectPlace';
import TabNavigator from './bottomTab';

const screens = {
    Home: {
        component: Home,
        options: {
            headerShown: false,
        }
    },
    TabNavigator: {
        component: TabNavigator,
        options: {
            headerShown: false,
        }
    },
    Search: {
        component: Search,
        options: {
            headerShown: false,
        }
    },
    Login: {
        component: Login,
        options: {
            title: "Log in",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    SignUp: {
        component: SignUp,
        options: {
            title: "Sign up",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    MyGroups: {
        component: MyGroups,
        options: {
            title: "My Groups",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    CreateGroups: {
        component: CreateGroups,
        options: {
            title: "Create Groups",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    AddGroups: {
        component: AddGroups,
        options: {
            title: "Add Groups",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    ManageGroups: {
        component: ManageGroups,
        options: {
            title: "Manage Groups",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    ModifyGroupPin: {
        component: ModifyGroupPin,
        options: {
            title: "Modify Group Pin",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    ModifyGroupName: {
        component: ModifyGroupName,
        options: {
            title: "Modify Group Name",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    GroupMembers: {
        component: GroupMembers,
        options: {
            title: "Group Members",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    Vote: {
        component: Vote,
        options: {
            title: "Vote",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    AccountSetting: {
        component: AccountSetting,
        options: {
            title: "Account Setting",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    ModifyPassword: {
        component: ModifyPassword,
        options: {
            title: "Modify Password",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    ModifyNickname: {
        component: ModifyNickname,
        options: {
            title: "Modify Nickname",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    ChooseLocation: {
        component: ChooseLocation,
        options: {
            title: "Choose Location",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    AddLocation: {
        component: AddLocation,
        options: {
            title: "Add Location",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    LocationDetail: {
        component: LocationDetail,
        options: {
            title: "Location Detail",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    AddLocDetail: {
        component: AddLocDetail,
        options: {
            title: "Add",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
    SelectPlace: {
        component: SelectPlace,
        options: {
            title: "Select Place",
            headerTintColor: '#fff',
            headerStyle: {backgroundColor: "#FA4A0C"}
        }
    },
}

const Stack = createNativeStackNavigator();

export default Navigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {Object.entries(screens).map((entry, id) => <Stack.Screen key={id} name={entry[0]} {...entry[1]} />)}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
