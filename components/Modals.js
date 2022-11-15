import { StyleSheet, Text, View, Modal, Button } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

function Modals() {
  const [modalOpen, setModalOpen] = useState(false);

  const PressHandler = () => {
    setModalOpen(true);
  };

  return (
    <View>
      <Modal visible={modalOpen}>
        <View style={styles.modalinfo}>
          <Text style={styles.word}>Add Expense</Text>
          <Ionicons
            name="close"
            size={28}
            onPress={() => setModalOpen(false)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <Button title="Add" />
          </View>
          <View style={styles.buttons}>
            <Button title="Cancel" onPress={() => setModalOpen(false)} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity>
        <View>
          <Ionicons
            name="add"
            size={28}
            style={styles.button}
            onPress={PressHandler}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Modals;

const styles = StyleSheet.create({
  button: {
    marginLeft: 300,
    marginTop: -5,
  },
  modalinfo: {
    backgroundColor: "#ddd",
  },
  word: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    //backgroundColor: "black",
    marginLeft: 40,
  },
  buttons: {
    //display: "flex",
    padding: 10,
    width: "40%",
  },
});
