import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
const RecentExpenses = () => {
    
  const expensesList = useSelector((state) => state.expense.expenses);
    return <ExpensesOutput expenses={expensesList} expensesPeriod="Last 7 days"/>
};

export default RecentExpenses;
