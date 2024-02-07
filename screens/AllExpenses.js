import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
const AllExpenses = () => {
  const expensesList = useSelector((state) => state.expense.expenses);
  return <ExpensesOutput expenses={expensesList} expensesPeriod="total" fallBackText={"No Expenses Registered"} />;
};

export default AllExpenses;
