import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, TouchableHighlight } from 'react-native';
import { CheckBox } from 'react-native-elements';
import user1 from '../assets/user1.png';

const SignUpPage = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Replace '192.168.x.x' with the actual local IP address of your computer
  const serverUrl = `http://127.0.0.1:4000/signup`;

  const goToLogIn = () => {
    navigation.navigate('LogIn');
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          username: username,
          password: password,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        setShowModal(true);
      } else {
        // Handle errors
        alert('Signup failed: ' + json.message);
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      alert('An error occurred during signup.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    goToLogIn();
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent} />
      </View>

      <View style={styles.fillOut}>
        <Image source={user1} style={styles.user} />
        <Text style={styles.title}>Create an Account</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="ex. Aaron Jan Inlayo"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput 
          style={styles.input} 
          placeholder="ex. aaronjaninlayo@gmail.com"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput 
          style={styles.input} 
          placeholder="ex. aaronjaninlayo123"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Type your Password" 
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Confirm your password" 
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <CheckBox
          title="By signing up you accept the Terms of service and Privacy Policy"
          checked={isChecked}
          onPress={() => setChecked(!isChecked)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
        />

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>

          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>You're all set!</Text>
              <TouchableHighlight underlayColor="#fff" onPress={closeModal}>
                <Text style={styles.modalLinkText}>Proceed to <Text style={styles.logInLink}>Log In</Text></Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={goToLogIn}>
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>Already have an account? </Text>
            <Text style={styles.loginLink}>Log in</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frame: {
    flex: 1,
    position: 'relative', 
    backgroundColor: 'white', 
  },
  user: {
    width: 70,
    height: 70,
    left: '36.5%',
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
    top: '15%', 
    bottom: '9%',
    left: '7%',
    right: '7%',
    backgroundColor: '#F5F5F5', 
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0B3954',
    left: '15%',
    top: '2%',
  },
  label: {
    fontSize: 12,
    color: '#0B3954',
    paddingTop: 5,
    fontWeight: 'bold',
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
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 20,
    alignItems: 'center',
    bottom:'3%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
    paddingHorizontal: 10,
  },
  checkboxText: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    bottom: '15%'
  },
  loginLinkText: {
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    fontSize: 16,
    color: '#0B3954',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B3954',
    marginBottom: 20,
  },
  modalLinkText: {
    fontSize: 16,
    color: '#0B3954',
    fontWeight: 'bold',
  },
  logInLink: {
    fontSize: 16,
    color: '#0B3954',
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
  },
});

export default SignUpPage;
