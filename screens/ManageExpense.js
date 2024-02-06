import { Text } from "react-native";
const ManageExpense = ({route,navigation}) => {
  const expenseId = route.params.expenseId;
  
  // if(expenseId){

  // }

  return <Text>Manage Expense {expenseId}</Text>;
};
export default ManageExpense;
