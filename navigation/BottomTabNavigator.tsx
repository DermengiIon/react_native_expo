import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Badge, Button, Icon, withBadge } from 'react-native-elements';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import HomeScreen from '../screens/Home';
import AprovedRequestScreen from '../screens/AprovedRequest';
import DoctorContactsScreen from '../screens/DoctorContacts';
import DoctorListScreen from '../screens/DoctorList';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import { Entypo, AntDesign, Ionicons, Feather } from '@expo/vector-icons'; 
import { View } from 'react-native';
import SignupScreen from '../screens/Signup';
import { NotifContext } from '../context/NotifContext';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const {hasNotification} = React.useContext(NotifContext);

  return (
    <BottomTab.Navigator
      initialRouteName="home"
      tabBarOptions={{ 
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: '#757e99',
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={NotificationNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="ios-notifications-outline" size={24} color={color} />
              {hasNotification && <Badge status="error" badgeStyle={{marginLeft: -8, marginTop: 3}}/>}
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="AddConsultation"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <View style={{width: 60, height: 60, backgroundColor: Colors.primaryColor, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
              <Entypo name="plus" size={24} color="#fff" />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="DoctorList"
        component={DoctorListNavigator}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color }) => <AntDesign name="calendar" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.primaryColor},
          headerTitle: 'Home',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#fff'},
          headerLeft: () =>  null,
          headerRightContainerStyle: {marginRight: 20},
          headerRight: () => (
            <Entypo name="dots-three-horizontal" size={24} color="white" />)
        }}
      />
    </HomeStack.Navigator>
  );
}

const NotificationStack = createStackNavigator();

function NotificationNavigator() {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="Notification"
        component={AprovedRequestScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.primaryColor},
          headerTitle: 'Notification',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#fff'},
          headerTintColor: '#fff',
          headerRightContainerStyle: {marginRight: 20},
          headerRight: () => (
            <Entypo name="dots-three-horizontal" size={24} color="white" />)
        }}
      />
    </NotificationStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={SignupScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.primaryColor},
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#fff'},
          headerTintColor: '#fff',
          headerRightContainerStyle: {marginRight: 20},
          headerRight: () => (
            <Entypo name="dots-three-horizontal" size={24} color="white" />)
        }}
      />
    </ProfileStack.Navigator>
  );
}

const DoctorListStack = createStackNavigator();

function DoctorListNavigator() {
  return (
    <DoctorListStack.Navigator>
      <DoctorListStack.Screen
        name="DoctorList"
        component={DoctorListScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.primaryColor},
          headerTitle: 'Doctor List',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#fff'},
          headerTintColor: '#fff',
          headerRightContainerStyle: {marginRight: 20},
          headerRight: () => (
            <Entypo name="dots-three-horizontal" size={24} color="white" />)
        }}
      />
      <DoctorListStack.Screen name="DoctorContacts" component={DoctorContactsScreen} 
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.primaryColor},
          headerTitle: 'Doctor Details',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: '#fff'},
          headerTintColor: '#fff'
        }}/>
    </DoctorListStack.Navigator>
  );
}
