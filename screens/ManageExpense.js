import { Text, StyleSheet, View } from "react-native";
import { useLayoutEffect, useState } from "react";
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
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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
    setIsLoading(true);
    try {
      await deleteExpense(expenseId);
      dispatch(removeExpense({ id: expenseId }));
      navigation.goBack();
    } catch (error) {
      setError("Could Not Delete The Expense");
      setIsLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    try {
      if (isEditing) {
        //update
        setIsLoading(true);
        await modifyExpense(expenseId, {
          amount: expenseData.amount,
          description: expenseData.description,
          date: expenseData.date,
        });
        dispatch(
          updateExpense({
            id: expenseId,
            ...expenseData,
          })
        );
      } else {
        //add
        setIsLoading(true);
        const addedId = await storeExpense(expenseData);
        dispatch(addExpense({ ...expenseData, id: addedId }));
        navigation.goBack();
        setError("Could Not Add The Expense");

      }
    } catch (error) {
      setError("Could Not Save Data Please Try Again");
    }
    setIsLoading(false);
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay size={"large"} color={"white"} />;
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
