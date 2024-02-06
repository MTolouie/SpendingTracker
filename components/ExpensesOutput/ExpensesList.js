import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";
const renderExpenseItem = (itemData) => {
  return (
    <ExpenseItem
      amount={itemData.item.amount}
      date={itemData.item.date}
      description={itemData.item.description}
      expenseId={itemData.item.id}
    />
  );
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
