import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import LogoImage1 from '../assets/gowell_logo1.png';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
      const splashTimer = setTimeout(() => {
        navigation.navigate('LogInSignUp');
      }, 3000);
  
      return () => clearTimeout(splashTimer);
    }, [navigation]);
  
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#0B3954" barStyle="light-content" />
        <Image source={LogoImage1} style={styles.logo1} resizeMode="contain" />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0B3954',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo1: {
      width: 500, 
      height: 500,
    },
});

export default SplashScreen;