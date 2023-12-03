import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import calculator from '../assets/Calculator.png';
import water from '../assets/water.png';
import step from '../assets/step.png';
import mood from '../assets/mood.png';
import next from '../assets/next.png';

  const TrackerScreen = () => {
    const navigation = useNavigation();

    const goToBMITracker = () => {
      navigation.navigate('BMITrackerScreen');
    };
    const goToWaterReminder = () => {
      navigation.navigate('WaterReminderScreen');
    };
    const goToStepCounter = () => {
      navigation.navigate('StepCounterScreen');
    };
    const goToMoodTracker= () => {
      navigation.navigate('MoodTrackerScreen');
    };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent} />
        <Text style={[styles.accentText, styles.boldText, styles.biggerText]}>Select Tracker</Text>
        <Text style={[styles.accentText, styles.boldText]}>Select the health data that you want to monitor</Text>
      </View>
      <View style={styles.fillOut}>
        <View style={styles.trackerButtons}>
          
          <Pressable style={styles.sleepButton} onPress={goToBMITracker}>
            <Image source={calculator} style={styles.image} />
              <Text style={[styles.boldText, styles.biggerText]}> BMI Calculator</Text>
            <Image source={next} style={styles.next} />
          </Pressable>

          <Pressable style={styles.waterButton} onPress={goToWaterReminder}>
            <Image source={water} style={styles.image} />
              <Text style={[styles.boldText, styles.biggerText]}> Water Reminder</Text>
            <Image source={next} style={styles.next} />
          </Pressable>

          <Pressable style={styles.stepButton} onPress={goToStepCounter}>
            <Image source={step} style={styles.image} />
              <Text style={[styles.boldText, styles.biggerText]}> Step Counter</Text>
            <Image source={next} style={styles.next} />
          </Pressable>

          <Pressable style={styles.heartButton} onPress={goToMoodTracker}> 
            <Image source={mood} style={styles.image} />
              <Text style={[styles.boldText, styles.biggerText]}> Mood Tracker</Text>
            <Image source={next} style={styles.next} />
          </Pressable>
          
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  accentText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  biggerText: {
    fontSize: 20,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 20,
    marginRight: 20,
  },
  next: {
    width: 25,
    height: 25,
    marginLeft: 'auto',

  },
  fillOut: {
    flex: 1,
    position: 'absolute', 
    top: '21%', 
    bottom: '7%',
    left: '7%',
    right: '7%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  trackerButtons: {
    marginTop: 20,
  },
  sleepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDEDFD',
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderColor: '#0B3954',
    elevation: 5,
  },
  waterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A9F8FB',
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderColor: '#0B3954',
    elevation: 5,
  },
  stepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B6DCFE',
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderColor: '#0B3954',
    elevation: 5,
  },
  heartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22FFEF',
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderColor: '#0B3954',
    elevation: 5,
  },
});

export default TrackerScreen;
 