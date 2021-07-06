import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image, AsyncStorage } from 'react-native';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Avatar, Input, ListItem, Rating } from 'react-native-elements';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { NotifContext } from '../context/NotifContext';

export default function AprovedRequestScreen({navigation, route}: any) {
    const {token, logout} = useContext(AuthContext);
    const {data, getNotif, hasNotification, cancelNotif} = useContext(NotifContext);
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

    const onPressConfirm = async () => {
        await cancelNotif();
        message('Confirmed');
        navigation.navigate('Home');
    }

    const onPressCancel = async () => {
        await cancelNotif();
    }

    
    const getDoctor = useCallback(
        async () => {
            try {
                const resp = await request('/api/Doctor/GetDoctor/' + data.DocId, 'GET', null, {'token': token});
                if (resp.DocId) {
                    setDoctor(resp);
                }
            } catch (err) {}
        },
        [token, request],
    );
    
    useEffect(() => {console.log('useeffect2');
        if (data.DocId) {
            getDoctor();
        }
    }, [getDoctor, data]);
    
    if (!hasNotification) {
        return (
            <Text style={styles.appButtonTextVery}>No notifications.</Text>
        )
    }

    return (
        <ScrollView>
            <View style={{...styles.container, paddingHorizontal: Layout.viewPadding-15}}>
                    <View style={styles.checkCircle}>
                        <MaterialCommunityIcons style={styles.icon} name="check-outline" size={24} color={Colors.primaryColor} />
                    </View>
                    <Text style={styles.headerText}>Your Request Has Been Approved</Text>
                    <Text style={styles.subHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, t. Ut enim ad minim veniam, quis nostrud exercitation ullamco</Text>
                    
                    <Text style={styles.sectionText}>Request Details</Text>

                    <View style={styles.detailView}>
                        <Text style={styles.detailTitle}>
                            Name
                        </Text>
                        <Text style={styles.detailText}>
                            {data.Name}
                        </Text>
                    </View>
                    <View style={styles.detailView}>
                        <Text style={styles.detailTitle}>
                            Desease
                        </Text>
                        <Text style={styles.detailText}>
                            {data.Disease}
                        </Text>
                    </View>
                    <View style={styles.detailView}>
                        <Text style={styles.detailTitle}>
                            Location
                        </Text>
                        <Text style={styles.detailText}>
                            {data.Address}
                        </Text>
                    </View>
                    <View style={styles.detailView}>
                        <Text style={styles.detailTitle}>
                            Description
                        </Text>
                        <Text style={styles.detailText}>
                            {data.Description}
                        </Text>
                    </View>

                    <Text style={styles.sectionText}>Doctor</Text>

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

                    <TouchableOpacity style={styles.appButtonContainer1} 
                        onPress={onPressConfirm} >
                        <Text style={styles.appButtonText1}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.appButtonCancel} 
                        onPress={onPressCancel} >
                        <Text style={styles.appButtonCancelText}>Cancel Request</Text>
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
    headerText: {
        color: '#37474e',
        fontSize: 24,
        fontFamily: 'Proxima_Nova-Semibold',
        textAlign: 'center',
        marginTop: 50
    },
    appButtonContainer1: {
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        marginTop: 50,
        marginBottom: 40
      },
    appButtonText1: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        fontFamily: "Proxima_Nova-Semibold",
    },
    checkCircle: {
        height: 150,
        borderWidth: 4,
        borderColor: Colors.primaryColor,
        borderRadius: 100,
        width: 150,
        alignSelf: "center",
        marginTop: 60,
        justifyContent: 'center',
    },
    icon: {
        alignSelf: "center",
        fontSize: 60,
    },
    subHeader: {
        textAlign: 'center',
        color: '#607c8a',
        fontFamily: 'ProximaNova-Regular',
        marginTop: 40,
        fontSize: 14,
    },
    sectionText: {
        color: Colors.primaryColor,
        fontSize: 18,
        marginTop: 60
    },
    detailView: {
        marginTop: 30,
    },
    detailTitle: {
        color: '#38474f',
        fontFamily: 'Proxima_Nova-Semibold',
        fontSize: 16,
    },
    detailText: {
        color: '#90a4ae',
        fontFamily: 'ProximaNova-Regular',
        fontSize: 18,
        marginTop: 10
    },
    doctorCard: {
        borderWidth: 2,
        borderColor: '#eceff1',
        padding: 20,
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
    appButtonCancel: {
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderColor: '#8fa4ad',
        borderWidth: 3,
        backgroundColor: "rgba(0, 0, 0, 0)",
        marginBottom: 40
    },
    appButtonCancelText: {
        fontSize: 18,
        textAlign: 'center',
        color: "#8fa4ad",
        fontFamily: "ProximaNova-Regular",
    },
    appButtonTextVery: {
        color: Colors.primaryColor,
        textTransform: 'uppercase',
        fontFamily: 'Proxima_Nova-Semibold',
        fontSize: 20,
        marginTop: 60,
        textAlign: "center"
    },
});