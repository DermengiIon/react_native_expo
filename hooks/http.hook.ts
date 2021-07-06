import {useCallback, useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { useAuth } from './auth.hook';

const endPoint = 'http://81.180.72.17';
const defaultHeaders = {
    'Content-Type': 'application/json'
};

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);

    const request = useCallback(async (path: string, method = 'GET', body = null, headers= {}) => {
        setLoading(true);

        try {
            if (body) {
                body = JSON.stringify(body);
            }

            const url = endPoint + path;
            const response = await fetch(url, {method, body, headers: {...defaultHeaders, ...headers}});
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    await auth.logout();
                }

                throw new Error(data.Message || 'Something is wrong!');
            }

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(
        () => setError(null),
        [],
    );

    return {loading, request, error, clearError};
}