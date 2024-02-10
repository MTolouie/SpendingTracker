import { Text, StyleSheet, View } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  removeExpense,
  updateExpense,
} from "../store/redux/expense";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, modifyExpense, deleteExpense } from "../util/http";
const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const existingExpense = useSelector((state) =>
    state.expense.expenses.find((expense) => expense.id === expenseId)
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  async function deleteExpenseHandler() {
    await deleteExpense(expenseId);
    dispatch(removeExpense({ id: expenseId }));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (isEditing) {
      //update
      dispatch(
        updateExpense({
          id: expenseId,
          ...expenseData,
        })
      );
      await modifyExpense(expenseId, {
        amount: expenseData.amount,
        description: expenseData.description,
        date: expenseData.date,
      });
    } else {
      //add
      const addedId = await storeExpense(expenseData);
      dispatch(addExpense({ ...expenseData, id: addedId }));
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={existingExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};
export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
