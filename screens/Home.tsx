import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, AsyncStorage } from 'react-native';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Input } from 'react-native-elements';
import { useMessage } from '../hooks/message.hook';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { NotifContext } from '../context/NotifContext';

export default function HomeScreen({navigation, route}: any) {
    const {token} = useContext(AuthContext);
    const {setNotif} = useContext(NotifContext)
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        Name: '',
        Disease: '',
        Address: '',
        Description: '',
    });

    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (obj: any) => {
        setForm({...form, ...obj});
    }

    const resetForm = () => {
        setForm({
            Name: '',
            Disease: '',
            Address: '',
            Description: '',
        })
    }

    const onPressVeryUrgent = () => {
        console.log('VERY URGENT');
    }

    const requestHandler = async () => {
        try {
            const data = await request('/api/Doctor/AddConsultation', 'POST', form, {'token': token});
            if (data.ConsId) {
                await setNotif(data);
                resetForm();
                navigation.navigate('Notification');
            }
            console.log('Data',data);
        } catch (err) {}
    }

    return (
        <ScrollView>
            <View style={{...styles.container, paddingHorizontal: Layout.viewPadding -15}}>
                    <TouchableOpacity style={styles.appButtonVery} 
                        onPress={onPressVeryUrgent} >
                        <Text style={styles.appButtonTextVery}>VERY URGENT</Text>
                    </TouchableOpacity>
                    <Input
                        label="Name"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='Your Name'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Name) => changeHandler({Name})}
                        value={form.Name}
                    />
                    <Input
                        label="Desease"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='What is your illness'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Disease) => changeHandler({Disease})}
                        value={form.Disease}
                    />
                    <Input
                        label="Location"
                        containerStyle={styles.containerStyle}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholder='Where your location'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Address) => changeHandler({Address})}
                        value={form.Address}
                    />
                    <Input
                        label="Decription (Optional)"
                        containerStyle={styles.containerStyle}
                        multiline={true}
                        numberOfLines={4}
                        inputStyle={{...styles.inputStyle, textAlignVertical: 'top'}}
                        labelStyle={styles.labelStyle}
                        placeholder='Describe Here'
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8fa4ad"
                        inputContainerStyle={{borderBottomWidth: 0}}
                        errorStyle={{display: 'none'}}
                        onChangeText={(Description) => changeHandler({Description})}
                        value={form.Description}
                    />
                    <TouchableOpacity style={styles.appButtonContainer1} 
                        onPress={requestHandler} >
                        <Text style={styles.appButtonText1}>Request</Text>
                    </TouchableOpacity>
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
    appButtonVery: {
        backgroundColor: '#fff',
        borderColor: Colors.primaryColor,
        borderRadius: 50,
        borderWidth: 2,
        width: '70%',
        alignSelf: "center",
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginTop: 50
    },
    appButtonTextVery: {
        color: Colors.primaryColor,
        textTransform: 'uppercase',
        fontFamily: 'Proxima_Nova-Semibold',
        fontSize: 20,
        textAlign: "center"
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
    }
});