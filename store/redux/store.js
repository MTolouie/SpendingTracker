import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import expensesReducer from "./expense";

const ignoreDate = (key, value) => (key === "date" ? undefined : value);

export const store = configureStore({
  reducer: {
    expense: expensesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["expense.expenses"],
        ignoredActionPaths: ["payload"],
        ignoredActionMatchers: [/.*Date.*/],
        ignoredPathsFilter: (action, basePath) => basePath.endsWith(".date"),
        // Custom function to ignore date field when serializing
        ignoredSerializables: [ignoreDate],
      },
    }),
});
