import axios from "axios";
import { getFormattedDate } from "./date";
const BACKEND_URL =
  "https://expensetrackerapp-a44ea-default-rtdb.firebaseio.com/";

export const storeExpense = async (expenseData) => {
  const respone = await axios.post(BACKEND_URL + "expenses.json", expenseData);
  const id = respone.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const modifyExpense = (expenseId,expenseData) => {
  return axios.put(BACKEND_URL + `expenses/${expenseId}.json`, expenseData);
};
export const deleteExpense = (expenseId) => {
return axios.delete(BACKEND_URL + `expenses/${expenseId}.json`);
};

