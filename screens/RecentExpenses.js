import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import { getDateMinusDays } from "../util/date";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/redux/expense";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
const RecentExpenses = () => {
  const expensesList = useSelector((state) => state.expense.expenses);
  const [isfetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError("Could Not Fetch The Expenses");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  
  if(error && !isfetching){
    return <ErrorOverlay message={error}/>;
  }
  
  if(isfetching){
    return <LoadingOverlay size="large" color="white"/>;
  }

  const recentExpenses = expensesList.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  // console.log("recent Expenses :" + recentExpenses);
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText={"No Expenses Registered For The Last 7 Days"}
    />
  );
};

export default RecentExpenses;
