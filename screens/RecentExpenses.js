//import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    //don't turn useEffect into async fn cz it will return a promise so here is the work around
    async function getExpenses() {
      const expenses = await fetchExpenses();
      //instead of fetching expenses from the db, we can set them and work with that
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);

    return expense.date > date7daysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No registered Expenses for the last 7days"
    />
  );
}

export default RecentExpenses;

//const styles = StyleSheet.create({});
