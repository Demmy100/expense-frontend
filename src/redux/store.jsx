import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import incomeReducer from "./income/incomeSlice";
import expenseReducer from "./expense/expenseSlice";
import transactionReducer from "./transaction/transactionSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    income: incomeReducer,
    expense: expenseReducer,
    transactions: transactionReducer,
  },
});
