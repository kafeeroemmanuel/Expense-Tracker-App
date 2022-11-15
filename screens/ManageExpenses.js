import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorLoadingOverLay from "../components/UI/ErrorLoadingOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverLay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

function ManageExpenses({ route, navigation }) {
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false); //initially we haven't yet gathered data. no request
  const expenseCtx = useContext(ExpensesContext);
  const edittedExpenseId = route.params?.expenseId;
  {
    /* we can use the id to check if an item exists therefore should be
    rendered on the edit page or incase the id doesn't exist we add it as an expense on the Add page */
  }
  // to make the Id(item) accessible here in this screen
  // if const above is undefined it means no retrived id so no item hence it goes on add
  //if const above is defined, has an object hence item exists therefore it goes on edit
  const isEditting = !!edittedExpenseId; // change a value into a boolean, true or false

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === edittedExpenseId
  );

  //to set more options inside a screen, use navigation and setOptions
  // Also to avoid flickering on loading wrap it around useLayoutEffect(()=>{},[]) function that re-renders title prop using
  //and uses dependencies
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditting]);

  async function deleteHandler() {
    setIsSubmitting(!false);
    try {
      await deleteExpense(edittedExpenseId);
      expenseCtx.deleteExpense(edittedExpenseId);
    } catch (error) {
      setError("Could not delete expense! - Please try again later");
      setIsSubmitting(false); // we don't want to show loading spinner incase there's an error.
    }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditting) {
        expenseCtx.updateExpense(edittedExpenseId, expenseData);
        //setIsFetching(false);
        //updating locally and also on the firebase
        await updateExpense(edittedExpenseId, expenseData);
      } else {
        //send http request to backend and also keep a copy of our data incse we working offline
        const id = await storeExpense(expenseData);
        //adding an id(from db) to any new expense we send to the context
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - Please try again later");
      setIsSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error) {
    return <ErrorLoadingOverLay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverLay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditting ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      <View style={styles.deleteContainer}>
        {isEditting && (
          <IconButton
            icon="trash"
            size={34}
            color={GlobalStyles.colors.error500}
            onPress={deleteHandler}
          />
        )}
      </View>
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
