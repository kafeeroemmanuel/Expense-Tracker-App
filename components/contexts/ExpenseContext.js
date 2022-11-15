import { createContext, useState } from "react";
import { v1 as uuid } from "uuid";

export const ExpenseContext = createContext();

const ExpenseContextProvider = (props) => {
  const [expense, setExpense] = useState([
    { id: 1, todo: "read books", time: "22/12/1993", cost: 34 },
    { id: 2, todo: "listen to sizza ", time: "2/10/1993", cost: 12 },
    { id: 4, todo: "build house", time: "3/11/2022", cost: 4 },
  ]);

  const addExpense = (todo, cost) => {
    setExpense((prevExpenses) => {
      return [...prevExpenses, { cost: cost, todo, id: uuid() }];
    });
  };

  return (
    <ExpenseContext.Provider value={{ expense, addExpense }}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
