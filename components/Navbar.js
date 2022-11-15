import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class Navbar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Context App</Text>
        <View style={styles.navbar}>
          <Text style={styles.text}>Home</Text>
          <Text style={styles.text}>About Us</Text>
          <Text style={styles.text}>Contact</Text>
        </View>
      </View>
    );
  }
}

export default Navbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#03ef00",
    alignItems: "center",
    justifyContent: "center",
  },
  navbar: {
    padding: 20,
    flexDirection: "row",
    marginLeft: 10,
  },
  text: {
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
  },
});
