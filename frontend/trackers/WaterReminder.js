import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, 
  Animated, Pressable, Image } from 'react-native';

  const serverUrl = 'http://127.0.0.1:4000/waterintake';  

const WaterReminder = () => {
  const [bottleSize, setBottleSize] = useState(250);
  const [amountDrank, setAmountDrank] = useState(0);
  const [numGlasses, setNumGlasses] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [waveAnim] = useState(new Animated.Value(0));
  const [customGoal, setCustomGoal] = useState(bottleSize * 8);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [drinkRecorded, setDrinkRecorded] = useState(false);

  const handleGoalEdit = () => {
    setIsEditingGoal(!isEditingGoal);
  };
  const getCurrentUserId = () => {
    // For example, fetching user ID from AsyncStorage, Redux store, Context, etc.
    return 'exampleUserId'; // Replace with actual user ID retrieval logic
  };

  const waveAnimation = () => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 15,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    );
  };

  useEffect(() => {
    waveAnimation().start();
  }, []);

  const recordDrink = () => {
    handleRecordDrink(bottleSize);
    const newAmount = amountDrank + bottleSize;
    setAmountDrank(newAmount);
    const newGlasses = Math.floor(newAmount / 250); // Use 250 as the base amount for 1 glass
    setNumGlasses(newGlasses);
    setDrinkRecorded(true);

    Animated.timing(waveAnim, {
      toValue: (newAmount / customGoal) * 700,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const minusDrink = () => {
    if (amountDrank >= bottleSize) {
      const newAmount = amountDrank - bottleSize;
      setAmountDrank(newAmount);
      const newGlasses = Math.floor(newAmount / 250); // Use 250 as the base amount for 1 glass
      setNumGlasses(newGlasses);

      Animated.timing(waveAnim, {
        toValue: (newAmount / customGoal) * 700,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const selectBottleSize = (size) => {
    setBottleSize(size);
    setModalVisible(false);
  };

  // Function to handle recording drink
  const handleRecordDrink = async (selectedAmount) => {
    try {
      const userId = getCurrentUserId(); // You should implement getCurrentUserId based on your authentication logic
      if (!userId) {
        console.error('User ID not found. The user might not be logged in.');
        return;
      }

      const response = await fetch(`${serverUrl}/water/intake`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,  // Use the retrieved user ID
          amount: selectedAmount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update your state or UI with the new amount
        setAmountDrank((prevAmount) => prevAmount + selectedAmount);
        setNumGlasses((prevGlasses) => prevGlasses + selectedAmount / 250);
        setDrinkRecorded(true);
      } else {
        console.error('Response not OK. Status:', response.status);
        const textResponse = await response.text();
        console.error('Raw response:', textResponse);
      }
    } catch (error) {
      console.error('Error recording drink:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.waterContainer}>
          <Animated.View style={[styles.water, { height: waveAnim }]} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.goalContainer}>
            {isEditingGoal ? (
              <View style={styles.editGoalContainer}>
                <TextInput
                  style={styles.editGoalInput}
                  keyboardType="numeric"
                  value={String(customGoal)}
                  onChangeText={(text) => setCustomGoal(parseInt(text) || 0)}
                  onBlur={() => setIsEditingGoal(false)}
                />
              </View>
            ) : (
              <View style={styles.goalTextContainer}>
                <Text style={styles.goalText}>Daily Goal: {customGoal} mL</Text>
              </View>
            )}
            <TouchableOpacity onPress={handleGoalEdit}>
              <Image source={require('../assets/edit-icon.png')} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
          <Text>Amount Drank: {amountDrank} mL</Text>
          <Text>Number of Glasses: {numGlasses}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={minusDrink}>
            <Image source={require('../assets/minus-icon.png')} style={styles.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.recordButton]} onPress={recordDrink}>
          {(amountDrank === 0 || !drinkRecorded) && (
            <View style={styles.arrowNote}>
              <View style={styles.arrowBase}>
                <Text style={styles.arrowText}>Tap Here to Record your Drink!</Text>
              </View>
              <View style={styles.arrow} />
            </View>
          )}
            <Image source={require('../assets/record-icon.png')} style={[styles.recordIcon]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, styles.middleButton]}
            onPress={() => setModalVisible(true)}
          >
            <Image source={require('../assets/bottle-icon.png')} style={styles.icon} />
            <View style={styles.indicator}>
              <Text style={styles.indicatorText}>{bottleSize} mL</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={styles.closeModal}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
                <Text style={styles.textSelect}>Select Bottle Size</Text>
              </Pressable>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => selectBottleSize(250)}
              >
                <Text>250 mL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => selectBottleSize(500)}
              >
                <Text>500 mL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => selectBottleSize(750)}
              >
                <Text>750 mL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: '0%',
  },
  frame: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  waterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  water: {
    width: '100%',
    backgroundColor: '#0B3954',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  infoContainer: {
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    position: 'absolute',
    width: 300,
    top: 150,
    left: 45,
    right: 10,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 10,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  goalTextContainer: {

  },
  goalText: {
    fontSize: 14,
  },
  editGoalContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editGoalInput: {
    flex: 1,
    fontSize: 14,
  },
  editIcon: {
    width: 15,
    height: 15,
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#0B3954',
    paddingTop: 10,
    paddingBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 40,
    height: 40,
  },
  recordButton: {
    alignItems: 'center',
  },
  recordIcon: {
    width: 70,
    height: 70,
  },
  arrowNote: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 90,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#22FFEF',
  },
  arrowBase: {
    width: 100,
    height: 80,
    backgroundColor: '#22FFEF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#0B3954',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  indicator: {
    height: 10,
    width: 40,
    borderRadius: 10,
    position: 'absolute',
    bottom: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    alignItems: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    color: 'white',
  },
  middleButton: {
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#0B3954',
    borderRadius: 30,
    padding: 35,
    alignItems: 'center',
    elevation: 10,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
    elevation: 5,
  },
  closeModal: {
    alignSelf: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSelect: {
    color: 'white',
    paddingTop: 10,
  },
});

export default WaterReminder;
