import { StyleSheet, View, Text, Alert } from "react-native";
import Button from "../UI/Button";
import Input from "./Input";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0,10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      //Alert.alert("Invalid Input", "Invalid");
      setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: isAmountValid },
          date: { value: currInputs.date.value, isValid: isDateValid },
          description: {
            value: currInputs.description.value,
            isValid: isDescriptionValid,
          },
        };
      });

      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
  !inputs.amount.isValid ||
  !inputs.date.isValid ||
  !inputs.description.isValid;


  return (
    <View>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          invalid={!inputs.amount.isValid}
        />
        <Input
          label="Date"
          style={styles.inputRow}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid Input Values - Please Check Your Data</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  rowInput: {
    flex: 1,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
