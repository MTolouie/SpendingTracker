import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { getDateMinusDays } from "../util/date";
const RecentExpenses = () => {
  const expensesList = useSelector((state) => state.expense.expenses);

  const recentExpenses = expensesList.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return (expense.date > date7DaysAgo) && (expense.date <= today);
  });
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" />
  );
};

export default RecentExpenses;
