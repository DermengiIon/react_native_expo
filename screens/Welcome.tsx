import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GreenBackgroundView } from '../components/Themed';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

export default function WelcomeScreen({navigation}: any) {
    const onPressSignup = () => {
        console.log('signup');
    }
    const onPressLogin = () => {
        console.log('login');
    }
    return (
        <GreenBackgroundView>
            <View style={{...styles.container, paddingHorizontal: Layout.viewPadding}}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Welcome</Text>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel commodo justo.
                    </Text>
                </View>
                <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.appButtonContainer1} 
                    onPress={() =>navigation.navigate('Signup')} 
                >
                    <Text style={styles.appButtonText1}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.appButtonContainer2} 
                onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.appButtonText2}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.buttomText}>URGENT</Text>
                </View>
            </View>
        </GreenBackgroundView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'ProximaNova-Regular',
        fontSize: 16,
        marginTop: 30
    },
    headerText: {
        color: '#fff',
        fontSize: 45,
        fontFamily: 'Proxima_Nova-Semibold',
        textAlign: 'center',
        marginTop: 120
    },
    appButtonContainer1: {
        elevation: 2,
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#fff',
      },
    appButtonText1: {
        fontSize: 18,
        textAlign: 'center',
        color: Colors.primaryColor,
        fontFamily: "Proxima_Nova-Semibold"
    },
    appButtonContainer2: {
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: "rgba(0, 0, 0, 0)",
        marginTop: 35
      },
    appButtonText2: {
        fontSize: 18,
        textAlign: 'center',
        color: "#fff",
        fontFamily: "ProximaNova-Regular",
    },
    buttomText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginTop: 60,
        fontFamily: "Proxima_Nova-Semibold"
    }
});