import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [
      // {
      //   id: "e1",
      //   description: "A pair of shoes",
      //   amount: 59.99,
      //   date: new Date("2021-12-19"),
      // },
      // {
      //   id: "e2",
      //   description: "A pair of trousers",
      //   amount: 89.29,
      //   date: new Date("2022-01-05"),
      // },
      // {
      //   id: "e3",
      //   description: "Some bananas",
      //   amount: 5.99,
      //   date: new Date("2021-12-01"),
      // },
      // {
      //   id: "e4",
      //   description: "A book",
      //   amount: 14.99,
      //   date: new Date("2022-02-19"),
      // },
      // {
      //   id: "e5",
      //   description: "Another book",
      //   amount: 18.59,
      //   date: new Date("2022-02-18"),
      // },
    ],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter((expense) => {
        expense.date = expense.date;
        return expense.id !== action.payload.id;
      });
    },
    updateExpenses: (state, action) => {
      const updateableExpenseIndex = state.expenses.findIndex((expense) => {
        return expense.id === action.payload.id;
      });

      const updateableExpense = state.expenses[updateableExpenseIndex];

      const updatedItem = { ...updateableExpense, ...action.payload };

      const updatedExpenses = [...state.expenses];

      updatedExpenses[updateableExpenseIndex] = updatedItem;
      state.expenses = updatedExpenses;
    },
    setExpenses: (state, action) => {
      const inverted = action.payload.reverse();
      state.expenses.push(...inverted);
      // console.log(state.expenses);
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const removeExpense = expensesSlice.actions.removeExpense;
export const updateExpense = expensesSlice.actions.updateExpenses;
export const setExpenses = expensesSlice.actions.setExpenses;
export default expensesSlice.reducer;
