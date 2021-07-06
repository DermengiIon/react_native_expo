import { useCallback, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";

export const useNotif = () => {
    const [hasNotification, setHas] = useState(false);
    const [data, setData] = useState(
        {
            ConsId: '',
            Name: '',
            Disease: '',
            Address: '',
            Description: '',
            DocId: '',
            IsConfirmed: false
        }
    );

    const setNotif = useCallback(
        async (notif: any) => {
            try {
                await AsyncStorage.setItem('notif', JSON.stringify(notif));
                setHas(true);
                setData(notif);
                } catch (error) {
                    console.log('setitemErr', error);
                }
            },
        [],
    );

    const getNotif = useCallback(
        async () => {
            try {
                const value = await AsyncStorage.getItem('notif');
                if (value !== null) {
                    setHas(true);
                    setData(JSON.parse(value));
                    console.log('getNotif',value);
                } else {
                    setHas(false);
                }
                } catch (error) {
                    console.log('getNotifErr',error);
                }
            },
        []
    );

    const cancelNotif = useCallback(
        async () => {
            try {
                await AsyncStorage.removeItem('notif');
                setHas(false);
                } catch (error) {
                    console.log('cancel', error);
                }
            },
        [],
    );

    useEffect(() => {
        getNotif();
    }, [getNotif]);

    return {setNotif, getNotif, cancelNotif, hasNotification, data};
}