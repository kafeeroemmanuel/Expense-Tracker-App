import ExpenseForm from "../components/ExpenseForm";
import { StyleSheet, View } from "react-native";
import ExpenseContextProvider from "../components/contexts/ExpenseContext";
import Modals from "../components/Modals";

const AddExpenses = () => {
  return (
    <View>
      <Modals />
      <View style={styles.container}>
        <ExpenseContextProvider>
          <ExpenseForm />
        </ExpenseContextProvider>
      </View>
    </View>
  );
};

export default AddExpenses;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
