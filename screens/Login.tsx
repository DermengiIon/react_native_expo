import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GreenBackgroundView } from '../components/Themed';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({navigation}: any) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        Email: '', Password: ''
    });
    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (obj: any) => {
        setForm({...form, ...obj});
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/Login/UserAuth', 'POST', form);
            await auth.login(data.Message);
        } catch (err) {}
    }

    return (
        <GreenBackgroundView>
            <View style={{...styles.container, paddingHorizontal: Layout.viewPadding}}>
                    <Text style={styles.headerText}>Telemedicine</Text>
                    <Input
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        placeholder='Email Address'
                        leftIcon={
                            <FontAwesome5 style={styles.icon} name="user" size={24} color="white" />
                        }
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#fff"
                        inputContainerStyle={{borderBottomWidth: 0, padding: 0, margin: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Email) => changeHandler({Email})}
                    />
                    <Input
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        placeholder='Password'
                        leftIcon={
                            <SimpleLineIcons style={styles.icon} name="lock" size={24} color="white" />
                        }
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#fff"
                        inputContainerStyle={{borderBottomWidth: 0, padding: 0, margin: 0}}
                        errorStyle={{display: 'none'}}
                        secureTextEntry={true}
                        onChangeText={(Password) => changeHandler({Password})}
                    />
                    <TouchableOpacity 
                        style={styles.appButtonContainer1} 
                        onPress={loginHandler}
                        disabled={loading}
                    >
                        <Text style={styles.appButtonText1}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.appButtonBottom}  
                        onPress={() =>navigation.navigate('Signup')}  >
                        <Text style={styles.bottomText}>SIGNUP</Text>
                    </TouchableOpacity>
            </View>
        </GreenBackgroundView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 45,
        fontFamily: 'Nunito-Regular',
        textAlign: 'center',
        marginBottom: 50,
        marginTop: 100
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
        marginTop: 50
      },
    appButtonText1: {
        fontSize: 18,
        textAlign: 'center',
        color: Colors.primaryColor,
        fontFamily: "Proxima_Nova-Semibold",
    },
    bottomText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        fontFamily: "Proxima_Nova-Semibold"
    },

    containerStyle: {
        borderColor: '#ced8dc',
        borderWidth: 2,
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 40,
    },
    icon: {
        marginRight: 12,
    },
    inputStyle: {
        color: '#fff',
        fontFamily: 'ProximaNova-Regular',
    },
    appButtonBottom: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginTop: 40,
    }
});