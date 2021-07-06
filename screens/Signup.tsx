import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground } from 'react-native';
import { GreenBackgroundView } from '../components/Themed';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';

export default function SignupScreen({navigation, route}: any) {
    const {loading, request, error, clearError} = useHttp();
    const {token} = useContext(AuthContext);

    const [form, setForm] = useState({
        Base64Photo: '', FullName: '', Birthday: '', Email: '', Phone: '', Address: '', Username: '', Password: ''
    });

    let disabled = false;

    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (obj: any) => {
        setForm({...form, ...obj});
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/Register/UserReg', 'POST', form);
            if (data === 'SUCCESS') {
                navigation.navigate('Login');
            }
        } catch (err) {}
    }

    if (route.name === 'Profile') {
        disabled = true;
        const getProfile = useCallback(
            async () => {
                try {
                    const data = await request('/api/Profile/GetProfile', 'GET', null, {'token': token});
                    if (data.FullName) {
                        setForm(data);
                    }
                } catch (err) {}
            },
            [token, request],
        );
    
        useEffect(() => {
            getProfile();
        }, [getProfile]);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });
    
        if (!result.cancelled) {
            changeHandler({Base64Photo: result.base64});
        }
    };

    return (
        <ScrollView>
            <View style={{...styles.container, paddingHorizontal: Layout.viewPadding -15}}>
                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage} disabled={disabled}>
                        {!!form.Base64Photo &&
                            <ImageBackground
                                source={{uri: `data:image/gif;base64,${form.Base64Photo}`}}
                                style={styles.avatar}
                                imageStyle={{borderRadius: 100}}
                            />
                        }
                        {!form.Base64Photo &&
                            <View>
                                <FontAwesome5 style={styles.icon} name="user" size={40} color="#8fa4ae" />
                                <Text style={styles.headerText}>ADD PHOTOS</Text>
                            </View>
                        }
                    </TouchableOpacity>  
                    <Input
                        label="Full Name"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='Your Full Name'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(FullName) => changeHandler({FullName})}
                        value={form.FullName}
                        disabled={disabled}
                    />
                    <Input
                        label="Birthday"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='yyyy/mm/dd'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Birthday) => changeHandler({Birthday})}
                        value={form.Birthday}
                        disabled={disabled}
                    />
                    <Input
                        label="Email"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='Your Email'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Email) => changeHandler({Email})}
                        value={form.Email}
                        disabled={disabled}
                    />
                    <Input
                        label="Phone Number"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='Your Phone Number'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Phone) => changeHandler({Phone})}
                        value={form.Phone}
                        disabled={disabled}
                    />
                    <Input
                        label="Location/Adress"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='Your Location'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Address) => changeHandler({Address})}
                        value={form.Address}
                        disabled={disabled}
                    />
                    <Input
                        label="Username"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='Your username'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Username) => changeHandler({Username})}
                        value={form.Username}
                        disabled={disabled}
                    />
                    <Input
                        label="Password"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='Your password'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Password) => changeHandler({Password})}
                        secureTextEntry={true}
                        value={form.Password}
                        disabled={disabled}
                    />
                    {!disabled && 
                        <TouchableOpacity style={styles.appButtonContainer1} 
                            onPress={registerHandler}
                            disabled={loading}
                        >
                            <Text style={styles.appButtonText1}>Next</Text>
                        </TouchableOpacity>
                    }
            </View>
        </ScrollView> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    headerText: {
        color: '#38474f',
        fontSize: 18,
        fontFamily: 'ProximaNova-Regular',
        textAlign: 'center',
        marginTop: 15
    },
    appButtonContainer1: {
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        marginTop: 50,
        marginBottom: 50
      },
    appButtonText1: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        fontFamily: "Proxima_Nova-Semibold",
    },
    containerStyle: {
        marginTop: 40,
        paddingHorizontal: 0
    },
    icon: {
        marginTop: 30,
        alignSelf: "center",
    },
    inputStyle: {
        color: '#8fa4ad',
        fontFamily: 'ProximaNova-Regular',
        borderColor: '#ced8dc',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    labelStyle: {
        color: '#37474e',
        fontFamily: 'Proxima_Nova-Semibold',
        marginBottom: 20,
    },
    imagePicker: {
        height: 150,
        borderStyle: "dashed",
        borderWidth: 2,
        borderColor: '#cfd8dc',
        borderRadius: 100,
        width: 150,
        alignSelf: "center",
        marginTop: 60
    },
    avatar: {
        alignSelf: "center",
        height: 146,
        width: 146,
    },
});