import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { ExpenseContext } from "./contexts/ExpenseContext";
import ExpenseList from "./ExpenseList";

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);

  const [todo, setTodo] = useState("");
  const [cost, setCost] = useState(0);

  const changeHandler = (value) => {
    setTodo(value);
    //setCost(value);
  };

  const submitHandler = () => {
    addExpense(todo);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={changeHandler}
          placeholder="put your expense here"
        />
        {/* <TextInput
          style={styles.input}
          onChangeText={changeCostHandler}
          placeholder="put your cost here"
        /> */}
        <TouchableWithoutFeedback onPress={submitHandler}>
          <View style={styles.button}>
            <Text>Add Expense</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ExpenseList />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
  },
  input: {
    height: 40,
    width: 300,
    margin: 5,
    padding: 10,
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
  },
});
