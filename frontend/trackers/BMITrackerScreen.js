import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Edit from '../assets/Edit_Button.png';
import colors from '../assets/colors.png';
import BackButton3 from '../assets/BackButton3.png';
import pointer from '../assets/pointer.png';


const BMITrackerScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent} />
        <Image source={BackButton3} style={styles.BackButton3} />
        <Text style={styles.BackButton_Label}> BMI Calculator </Text>
      </View>
      <View style={styles.fillOut}>
      <Text style={styles.fillOut_text1}> Weight </Text>
      <Text style={styles.fillOut_text2}> Height </Text>
      <Text style={styles.fillOut_text1_1}> (Kg) </Text>
      <Text style={styles.fillOut_text2_2}> (Cm) </Text>
      <Text style={styles.Results}> Overweight </Text>
      <Text style={styles.BMI_Label}> BMI: 25.0 - 29.9 </Text>
      <Image source={colors} style={styles.colors} />
      <Text style={styles.Results2}> BMI: 26.1 </Text>
      <Image source={pointer} style={styles.pointer} />
      </View>
      <View style={styles.fillOut2}>
        <Text style={styles.fillOut2_text}> 72.0 </Text>
        <Image source={Edit} style={styles.Edit1} />
      </View>
      <View style={styles.fillOut3}>
        <Text style={styles.fillOut3_text}> 166.0 </Text>
        <Image source={Edit} style={styles.Edit2} />
      </View>
      <View style={styles.fillOut4}>
        <Text style={styles.fillOut4_text}> RECORD BMI </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: "0%",
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
    bottom: 450,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#0B3954",
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "20%",
    bottom: "24%",
    left: "7%",
    right: "7%",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  fillOut2: {
    flex: 1,
    position: "absolute",
    top: "22.5%",
    bottom: "62%",
    left: "10.8%",
    right: "52%",
    backgroundColor: "#EEEEEE",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 40,
    paddingTop: 30,
    elevation: 5,
  },
  fillOut3: {
    flex: 1,
    position: "absolute",
    top: "22.5%",
    bottom: "62%",
    left: "50%",
    right: "10%",
    backgroundColor: "#EEEEEE",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 40,
    paddingTop: 30,
    elevation: 5,
  },
  fillOut4: {
    flex: 1,
    position: "absolute",
    top: "78%",
    bottom: "15%",
    left: "7%",
    right: "7%",
    backgroundColor: "#0B3954",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  fillOut_text1: {
    color: "black",
    top: 105,
    bottom: 0,
    left: 8,
    fontWeight: "bold",
    fontSize: 20,
  },
  fillOut_text1_1: {
    color: "black",
    top: 49.5,
    bottom: 0,
    left: 75,
    fontSize: 20,
  },
  fillOut_text2: {
    color: "black",
    top: 80,
    left: 195,
    fontWeight: "bold",
    fontSize: 20,
  },
  fillOut_text2_2: {
    color: "black",
    top: 24,
    bottom: 0,
    left: 259,
    fontSize: 20,
  },
  fillOut2_text: {
    color: "black",
    bottom: 0,
    left: -10,
    fontWeight: "bold",
    fontSize: 35,
  },
  fillOut3_text: {
    color: "black",
    bottom: 0,
    left: -15,
    right: 0,
    fontWeight: "bold",
    fontSize: 35,
  },
  fillOut4_text: {
    color: "#FFFFFF",
    bottom: 15,
    left: 105,
    fontWeight: "bold",
    fontSize: 14,
  },
  Edit1: {
    height: 25,
    width: 25,
    left: 78,
    bottom: 33
  },
  Edit2: {
    height: 25,
    width: 25,
    left: 95,
    bottom: 33
  },
  Results: {
    color: "black",
    top: 70,
    bottom: 0,
    left: 90,
    fontWeight: "bold",
    fontSize: 20,
  },
  BMI_Label: {
    color: "black",
    top: 90,
    bottom: 0,
    left: 75,
    fontSize: 20,
  },
  colors: {
    height: 10,
    width: 280,
    top: 115,
  },
  Results2: {
    color: "black",
    top: 155,
    bottom: 0,
    left: 100,
    fontWeight: "bold",
    fontSize: 20,
  },
  BackButton3: {
    width: 22.5,
    height: 20,
  },
  BackButton_Label: {
    color: "#FFFFFF",
    bottom: 22,
    left: 23,
    fontWeight: "bold",
    fontSize: 17,
  },
  pointer: {
    height: 20,
    width: 20,
    top: 93,
    left: 148,
  }
});

export default BMITrackerScreen;
