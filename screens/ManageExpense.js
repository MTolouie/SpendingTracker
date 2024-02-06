import { Text } from "react-native";
import { useLayoutEffect } from "react";
const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;

  // if(expenseId){

  // }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? "Edit Expense" : "Add Expense",
    });
  }, [expenseId, navigation]);

  return <Text>Manage Expense {expenseId}</Text>;
};
export default ManageExpense;
