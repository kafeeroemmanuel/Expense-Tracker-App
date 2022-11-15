import { createContext, useReducer } from "react";
//import { v1 as uuid } from "uuid";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { descripion, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    //added expense comes on top of the array
    case "ADD_EXPENSE":
      //since firebase comes with its own id
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updateExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

function ExpensesContextProvider(props) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD_EXPENSE", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "REMOVE_EXPENSE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        dispatch,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpense,
      }}
    >
      {props.children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
