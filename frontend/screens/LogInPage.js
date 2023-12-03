import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import user1 from '../assets/user1.png';

const localIP = '127.0.0.1'; // Replace with your actual local IP address
const serverPort = '4000'; // Replace with the port your server is running on
const serverUrl = `http://${localIP}:${serverPort}/login`; // Make sure this is your login endpoint

const LogInPage = ({ navigation }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailOrUsername, // Make sure this key matches what your server expects
          password: password,
        }),
      });
  
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const json = await response.json();
        
        if (response.ok) {
          navigation.navigate('LandingPage');
        } else {
          Alert.alert('Login Error', json.message || 'An error occurred during login.');
        }
      } else {
        const textResponse = await response.text();
        Alert.alert('Server Response', textResponse);
      }
    } catch (error) {
      Alert.alert('Network Error', error.message || 'An error occurred during login.');
    }
  };
  

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent} />
      </View>
      <View style={styles.fillOut}>

        <Image source={user1} style={styles.user} />
        <Text style={styles.subTitles}>Username or Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Username or Email" 
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
        />

        <Text style={styles.subTitles}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your Password" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.logInButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.horizontalLine}></View>

        <View style={styles.logInWithContainer}>
          <Text style={styles.logInWithText}>or</Text>
        </View>

        <View style={styles.socialMediaIcons}>
          {/* Ensure you have the correct path to your social media icons */}
          <Image source={require('../assets/SocMedIcons.png')} style={styles.icon} />
        </View>

        <TouchableOpacity onPress={goToSignUp}>
          <View style={styles.loginLinkContainer}>
            <Text style={styles.SignupLinkText}>Don't have an account? </Text>
            <Text style={styles.SignupLink}>Sign up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: '0%'
  },
  frame: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white', 
    paddingHorizontal: 10,
  },
  user: {
    width: 70,
    height: 70,
    left: '37%'
  },
  accent: {
    flex: 1,
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: '70%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#0B3954', 
  },
  fillOut: {
    flex: 1,
    position: 'absolute', 
    top: '20%', 
    bottom: '24%',
    left: '7%',
    right: '7%',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0B3954'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#0B3954',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitles: {
    color: '#0B3954',
    fontWeight: "bold"

  },
    logInButton: {
    backgroundColor: '#0B3954',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    bottom: '0.9%'
  },
  horizontalLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginVertical: 20,
  },
  logInWithText: {
    color: '#0B3954',
    top: '-20%'
  },
  socialMediaIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '10%'
  },
  logInWithContainer: {
    alignItems: 'center',
    paddingBottom: 40, 
  },
  SignupLink: {
    fontSize: 16,
    color: '#0B3954',
    fontWeight: 'bold',
  },
  
  icon: {
    width: 200,
    height: 36.5,
    alignItems: 'center',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    bottom: '10%'
  }
});

export default LogInPage;