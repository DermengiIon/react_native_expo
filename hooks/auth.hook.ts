import { useCallback, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const storeKey = 'store-key-token';

export const useAuth = () => {
    const [token, setToken] = useState('');

    const login = useCallback(async (secureToken: string) => {
        setToken(secureToken);
        await SecureStore.setItemAsync(storeKey, secureToken)
    }, []);

    const logout = useCallback(async () => {
        setToken('');
        await SecureStore.deleteItemAsync(storeKey);
    }, [])

    useEffect(() => {
        (async () => {
            const token = await SecureStore.getItemAsync(storeKey);

            if (token) {
                await login(token);
            }
        })()
    }, [login]);

    return {login, token, logout};
}