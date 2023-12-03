import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MoodTrackerScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          <View style={styles.GreetContainer}>
            <Text style={styles.MoodGreet}>
              How are you feeling today?
            </Text>
            <Text style={styles.subGreet}>Select your mood</Text>
          </View>
        </View>
      </View>
      <View style={styles.fillOut}>
        <View style={styles.innerContainer}>

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
    position: "absolute",
    top: "20%",
    bottom: "5%",
    left: "7%",
    right: "7%",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 410,
    width: 300,
    backgroundColor: '#0B3954',
    borderRadius: 30,
  },
  GreetContainer: {
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MoodGreet: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  subGreet: {
    color: 'white',
    fontWeight: '300',
    fontSize: 14,
  }
});

export default MoodTrackerScreen;
