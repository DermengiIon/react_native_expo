import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, FlatList } from 'react-native';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Rating } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { List } from '../constants/DoctorList';
import { FontAwesome } from '@expo/vector-icons';  
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useMessage } from '../hooks/message.hook';

const Item = ({item, navigation}: any) => {
    return (
        <TouchableOpacity style={styles.doctorCard} onPress={() => navigation.navigate('DoctorContacts', {
            docId: item.DocId,
          })}>
            <View style={styles.doctorCardLeft}>
                <Image style={styles.avatar} source={{uri: `data:image/gif;base64,${item.Photo}`}}/>
            </View>
            <View style={styles.doctorCardRight}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.doctorName}>
                        {item.FullName}
                    </Text>
                    <FontAwesome name="star" size={16} color="#ffd500" 
                        style={{marginLeft: 10}}
                    />
                    <Text style={{
                        fontSize: 15,
                        fontFamily: 'ProximaNova-Regular',
                        color: '#8fa4ae',
                        marginLeft: 10
                    }}>{item.Stars}</Text>
                </View>
                <Text style={styles.doctorJob}>
                    {item.Specs}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <EvilIcons name="location" size={24} color="#8fa4ae" style={{marginLeft: -5}}/>
                        <Text style={styles.locationText}>{item.Address}</Text>
                 </View>
            </View>
        </TouchableOpacity>
    );
}

export default function DoctorListScreen({navigation}: any) {
    const {loading, request, error, clearError} = useHttp();
    const {token} = useContext(AuthContext);
    const message = useMessage();

    const [list, setList] = useState([])

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const getList = useCallback(
        async () => {
            try {
                const data: [] = await request('/api/Doctor/GetDoctorList', 'GET', null, {'token': token});
                if (Array.isArray(data)) {
                    setList(data);
                }
            } catch (err) {}
        },
        [token, request],
    );

    useEffect(() => {
        getList();
    }, [getList]);

    const renderItem = ({item} : any) => (
            <Item item={item} navigation={navigation}/>
    );

    return (
            <View style={{...styles.container, paddingHorizontal: Layout.viewPadding-15}}>
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => `${item.DocId}`}
                    contentContainerStyle={{paddingTop: 10, paddingBottom: 20}}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f6f7f7',
    },
    doctorCard: {
        paddingVertical: 20,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 2,
        paddingHorizontal: 10
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
    locationText: {
        color: '#8fa4ae',
        fontSize: 14,
        fontFamily: 'ProximaNova-Regular'
    },
});