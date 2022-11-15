import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  //const [amountValue, setAmountValue] = useState('') initial state should always be a string even if we dealing we nums
  // instead of using 3 individual useStates for the inputs for amount,date and description
  //and their respective functions, we can use a generic way as taught by Max
  // function amountChangeHandler(enteredAmount) {
  //   setAmountValue(enteredAmount)}

  const [inputValue, setInputValue] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((currInputValue) => {
      return { ...currInputValue, [inputIdentifier]: enteredValue };
      //setting a property dynamically
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount, //change initial strin amount value into a number
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim() > 0;

    if (!amountIsValid || !dateIsValid || descriptionIsValid) {
      Alert.alert("Invalid input", "Please check and try again");
      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowinput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount,
          }}
        />
        <Input
          style={styles.rowinput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true, // many props e.g autoCorrect: false, default is true, check out Docs
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: -10,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowinput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
