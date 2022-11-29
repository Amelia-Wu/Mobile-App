import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import { globalStyles } from '../../styles/global';
import {inject, observer} from 'mobx-react';
import Logo from '../../images/logo.png';

export default inject() (observer(function Home({navigation}) {
    
    const pressHandlerLogin = () => {
        navigation.navigate('Login')
    }
    const pressHandlerSignup = () => {
        navigation.navigate('SignUp')
    }

    return (
        <View>
            <View style={styles.logoView}>
                <Image style={styles.image} source={Logo} />
            </View>

            <View style={styles.container}>
                <TouchableOpacity style={globalStyles.generalButton} onPress={pressHandlerLogin}>
                    <Text style={globalStyles.generalButtonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={globalStyles.generalButton} onPress={pressHandlerSignup}>
                    <Text style={globalStyles.generalButtonText}>Register</Text>
                </TouchableOpacity>
            </View>       
        </View>
        
    )
}))

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
    },
    logoView: {
        paddingLeft: 40,
        paddingTop: 30
    },
    container: {
      paddingHorizontal: 50,
      paddingVertical: 50    
    },
    Button: {
        marginTop: 50,
        marginBottom: 50
    },
    textStyle: {
        fontSize: 35,
        color: "#333",
        textAlign: "center",
        paddingTop: 50,
        paddingBottom: 200,
    }
})
