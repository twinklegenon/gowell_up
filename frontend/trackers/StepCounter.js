import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Button } from "react-native";
import { Accelerometer } from "expo-sensors";

const StepCounter = () => {
  const [stepCount, setStepCount] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [editingGoal, setEditingGoal] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(5000); 
  const [newGoal, setNewGoal] = useState(""); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    const startAccelerometer = async () => {
      try {
        await Accelerometer.setUpdateInterval(1000); // Update every 0.5 second
        const accelSubscription = Accelerometer.addListener(accelerometerData => {
          // Check for a significant movement to simulate a step
          const { x, y, z } = accelerometerData;
          const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
          if (magnitude > 1.2) {
            if (!isWalking) {
              setStartTime(Date.now());
              setIsWalking(true);
            }
            setStepCount(prevCount => prevCount + 1);
          } else {
            if (isWalking) {
              setIsWalking(false);
              const endTime = Date.now();
              const duration = endTime - startTime;
              const timeInSeconds = duration / 1000;
              setTime(prevTime => prevTime + timeInSeconds);

              // Assuming average walking speed of 5 km/h
              const walkedDistance = (timeInSeconds / 3600) * 5;
              setDistance(prevDistance => prevDistance + walkedDistance);
            }
          }
        });
        setSubscription(accelSubscription);
      } catch (error) {
        console.error(error);
      }
    };

    startAccelerometer();

    return () => {
      if (subscription) {
        subscription.remove();
        setSubscription(null);
      }
    };
  }, [isWalking, startTime]);

  const handleEditGoal = () => {
    setModalVisible(true); // Open modal for goal editing
    setEditingGoal(true); // Enable editing mode
  };

  const updateGoal = () => {
    setDailyGoal(parseInt(newGoal) || 0); // Update dailyGoal with the entered value
    setModalVisible(false); // Close the modal after updating
    setEditingGoal(false); // Disable editing mode
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          <Text style={styles.dailyGoalHeader}>Daily Goal</Text>
          <View style={styles.goalContainer}>
            <Text style={styles.goalSteps}>{dailyGoal}</Text>
            {!editingGoal && (
              <TouchableOpacity onPress={handleEditGoal}>
                <Image
                  source={require("../assets/edit-button.png")}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={styles.fillOut}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepCountText}>{stepCount}</Text>
          <View style={styles.bottomIndicators}>
            <View style={styles.timeIndicator}>
              <Image source={require('../assets/time.png')} style={styles.indicatorIcon} />
              <Text style={styles.indicatorText}>{formatTime(time)}</Text>
            </View>
            <View style={styles.distanceIndicator}>
              <Image source={require('../assets/distance.png')} style={styles.indicatorIcon} />
              <Text style={styles.indicatorText}>{distance.toFixed(2)} km</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Modal for goal editing */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set New Goal</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter new goal"
              placeholderTextColor="#999"
              onChangeText={text => setNewGoal(text)}
            />
            <Button title="Set Goal" onPress={updateGoal} color="#0B3954" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frame: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  accent: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "70%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#0B3954",
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "20%",
    bottom: "8%",
    left: "7%",
    right: "7%",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 30,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  dailyGoalHeader: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginTop: 60,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  goalSteps: {
    fontSize: 18,
    color: "white",
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 5,
    marginRight: 5,
  },
  editIcon: {
    width: 14,
    height: 14,
  },
  stepContainer: {
    border: 'none',
    marginBottom: '100%',
    alignItems: 'center',
  },
  stepCountText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomIndicators: {
    marginTop: 40,
    flexDirection: 'row',
    width: '100%',
  },
  timeIndicator: {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    elevation: 5,
  },
  distanceIndicator: {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 20,
    elevation: 5,
  },
  indicatorIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  indicatorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#0B3954',
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#0B3954",
    color: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default StepCounter;
