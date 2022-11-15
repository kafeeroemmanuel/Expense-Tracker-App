//import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverLay from "../components/UI/LoadingOverlay";
import ErrorLoadingOverLay from "../components/UI/ErrorLoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    //don't turn useEffect into async fn cz it will return a promise so here is the work around
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        //instead of fetching expenses from the db, we can set them and work with that
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverLay />;
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorLoadingOverLay message={error} onConfirm={errorHandler} />;
  }

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
