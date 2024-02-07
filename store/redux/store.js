import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expense";
export const store = configureStore({
  reducer: {
    expense: expensesReducer,
  },
});
