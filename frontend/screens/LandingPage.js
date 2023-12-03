import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import Home from '../navbuttons/HomeScreen';
import TrackerScreen from '../navbuttons/TrackerScreen';
import GoWell from '../navbuttons/GoWellScreen';
import Notifications from '../navbuttons/NotificationsScreen';
import Profile from '../navbuttons/ProfileScreen';

import HomeIcon from '../assets/HomeIcon.png';
import TrackerIcon from '../assets/TrackerIcon.png';
import GowellIcon from '../assets/GowellIcon.png';
import NotificationIcon from '../assets/NotificationIcon.png';
import ProfileIcon from '../assets/ProfileIcon.png';

import BMITrackerScreen from '../trackers/BMITrackerScreen';
import WaterReminderScreen from '../trackers/WaterReminder';
import StepCounterScreen from '../trackers/StepCounter';
import MoodTrackerScreen from '../trackers/MoodTrackerScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TrackerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TrackerScreen" component={TrackerScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BMITrackerScreen" component={BMITrackerScreen} options={{ headerShown: false }} />
    <Stack.Screen name="WaterReminderScreen" component={WaterReminderScreen} options={{ headerShown: false }} />
    <Stack.Screen name="StepCounterScreen" component={StepCounterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MoodTrackerScreen" component={MoodTrackerScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const LandingPage = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 50,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          elevation: 50,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={HomeIcon} style={{ tintColor: color, width: size, height: size }} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracker"
        component={TrackerStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={TrackerIcon} style={{ tintColor: color, width: size, height: size }} />
          ),
        }}
      />
      <Tab.Screen
        name=" "
        component={GoWell}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <Image
              source={GowellIcon}
              style={{
                width: focused ? size + 20 : size,
                height: focused ? size + 20 : size,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={NotificationIcon} style={{ tintColor: color, width: size, height: size }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={ProfileIcon} style={{ tintColor: color, width: size, height: size }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LandingPage;
