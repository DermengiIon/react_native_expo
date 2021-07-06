import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Colors from './constants/Colors';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useNotif } from './hooks/notif.hook';
import { NotifContext } from './context/NotifContext';

export default function App() {
  const {login, token, logout} = useAuth();
  const {data, hasNotification, setNotif, getNotif, cancelNotif} = useNotif();
  const isAuthenticated = !!token;
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{
          token, login, isAuthenticated, logout
        }}>
          <NotifContext.Provider value={{
            data, hasNotification, setNotif, getNotif, cancelNotif
          }}>
            <Navigation colorScheme={colorScheme}/>
            <StatusBar backgroundColor={Colors.primaryColor} style="light"/>
          </NotifContext.Provider>
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
