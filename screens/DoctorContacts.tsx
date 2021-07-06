import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground } from 'react-native';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Rating } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons'; 
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default function DoctorContactsScreen({navigation, route}: any) {
    const {token, logout} = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [doctor, setDoctor] = useState({
        DocId: '',
        FullName: '',
        Specs: '',
        Address: '',
        About: '',
        Stars: 0,
        Photo: ''
    });
    const message = useMessage();

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const onPressRequest = () => {
        navigation.navigate('Home', {docId: doctor.DocId});
    }

    const getDoctor = useCallback(
        async () => {
            try {
                const data = await request('/api/Doctor/GetDoctor/' + route.params.docId, 'GET', null, {'token': token});
                if (data.DocId) {
                    setDoctor(data);
                }
            } catch (err) {}
        },
        [token, request],
    );

    useEffect(() => {
        getDoctor();
    }, [getDoctor]);

    return (
        <ScrollView>
            <View style={{...styles.container, paddingHorizontal: Layout.viewPadding-15}}>
                    <View style={styles.doctorCard}>
                        <View style={styles.doctorCardLeft}>
                            <Image style={styles.avatar} source={{uri: `data:image/gif;base64,${doctor.Photo}`}}/>
                        </View>
                        <View style={styles.doctorCardRight}>
                            <Text style={styles.doctorName}>
                                {doctor.FullName}
                            </Text>
                            <Text style={styles.doctorJob}>
                                {doctor.Specs}
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Rating 
                                    fractions={1} 
                                    startingValue={doctor.Stars}
                                    imageSize={20}
                                    style={{alignSelf: 'flex-start'}}
                                />
                                <Text style={{
                                    fontSize: 15,
                                    fontFamily: 'ProximaNova-Regular',
                                    color: '#8fa4ae',
                                    marginLeft: 10
                                }}>{doctor.Stars}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.shortDescTitle}>Short Description</Text>
                    <Text style={styles.shortDescText}>{doctor.About}</Text>

                    <Text style={{...styles.shortDescTitle, marginTop: 50}}>Location</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <EvilIcons name="location" size={24} color="#8fa4ae" style={{marginLeft: -5}}/>
                        <Text style={styles.locationText}>{doctor.Address}</Text>
                    </View>
                    <ImageBackground source={require('../assets/images/map.png')} style={styles.image}>
                    </ImageBackground>

                    <TouchableOpacity style={styles.appButtonContainer1} 
                        onPress={onPressRequest} >
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
      backgroundColor: '#fff',
    },
    appButtonContainer1: {
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        marginTop: 40,
        marginBottom: 40
      },
    appButtonText1: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        fontFamily: "Proxima_Nova-Semibold",
    },
    doctorCard: {
        borderBottomWidth: 2,
        borderColor: '#eceff1',
        paddingVertical: 20,
        marginTop: 20,
        flexDirection: 'row',
    },
    avatar: {
        borderRadius: 50,
        height: 80,
        width: 80,
    },
    doctorCardLeft: {
        marginRight: 20,
    },
    doctorCardRight: {
        flex: 1,
        justifyContent: 'space-between'
    },
    doctorName: {
        color: '#37474e',
        fontFamily: 'Proxima_Nova-Semibold',
        fontSize: 15
    },
    doctorJob: {
        fontFamily: 'ProximaNova-RegularIt',
        color: Colors.primaryColor,
        fontSize: 14
    },
    shortDescTitle: {
        color: '#38474f',
        fontFamily: 'Proxima_Nova-Semibold',
        fontSize: 15,
        marginTop: 30
    },
    shortDescText: {
        color: '#607c8a',
        fontSize: 14,
        fontFamily: 'ProximaNova-Regular',
        marginTop: 10,
    },
    locationText: {
        color: '#8fa4ae',
        fontSize: 14,
        fontFamily: 'ProximaNova-Regular'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        height: 200,
        marginTop: 15
    },
});