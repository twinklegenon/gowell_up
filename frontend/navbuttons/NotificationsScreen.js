import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent} />
      </View>
      <View style={styles.fillOut}>
        <Text style={styles.notification}>
          NOTIFICATIONS
        </Text>
      <View style={styles.Notif1}>
        <Text>You slept 7 hours and 45 minutes last night</Text>
      </View>
      <View style={styles.Notif2}>
        <Text>It's time to hydrate! Take a sip of water.</Text>
      </View>
      <View style={styles.Notif3}>
        <Text>You consumed 4 out of 8 glasses today.</Text>
      </View>
      <View style={styles.Notif4}>
        <Text>You have achieve 5,908 steps today!</Text>
      </View>
      <View style={styles.Notif4}>
        <Text>You slept 5 hours and 32 minutes last night</Text>
      </View>     
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
    bottom: '08%',
    left: '7%',
    right: '7%',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 30,
    elevation: 5,
  },
  notification: {
    fontWeight: 'bold',
    fontSize: 29,
    position: 'absolute',
    color: 'white',
    marginTop: -100,

  },
  Notif1: {
    backgroundColor: 'lightgrey',
    paddingVertical: 19,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    bottom:'3%'
  },
  Notif2: {
    backgroundColor: 'lightgrey',
    paddingVertical: 19,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    bottom:'3%'
  },
  Notif3: {
    backgroundColor: 'lightgrey',
    paddingVertical: 19,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    bottom:'3%'
  },
  Notif4: {
    backgroundColor: 'light grey',
    paddingVertical: 19,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    bottom:'3%'
  },

});

export default NotificationsScreen;
