import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import { getDateMinusDays } from "../util/date";
import { useEffect } from "react";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/redux/expense";
const RecentExpenses = () => {
  const expensesList = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      dispatch(setExpenses(expenses));
    }

    getExpenses();
  }, []);

  const recentExpenses = expensesList.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  console.log("recent Expenses :" + recentExpenses);
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText={"No Expenses Registered For The Last 7 Days"}
    />
  );
};

export default RecentExpenses;
