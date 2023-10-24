import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import incomeService from "../../services/incomeService";
import expenseService from "../../services/expenseService";

const initialState = {
  history: [],
  isLoading: false,
  isError: false,
  message: "",
};

//Async thunk to fetch transaction history
export const fetchTransactionHistory = createAsyncThunk(
  "transactions/fetchHistory",
  async (_, { getState, rejectWithValue }) => {
    try {
      const user = await getState().auth.user;
      //console.log('User:', user);

      const incomeResponse = await incomeService.getAllIncomes(user);
      //console.log("Income Response:", incomeResponse);

      // Ensure incomeResponse.data is an array with valid elements
      const incomeData = incomeResponse ? (Array.isArray(incomeResponse) ? incomeResponse : []) : [];
        console.log('Income Response:', incomeResponse);
      //console.log("Income Data:", incomeData);

      const expenseResponse = await expenseService.getAllExpenses(user);
      console.log("Expense Response:", expenseResponse);

      // Ensure expenseResponse.data is an array with valid elements
      const expenseData = expenseResponse ? (Array.isArray(expenseResponse) ? expenseResponse : []) : [];
        console.log('Expense Response:', expenseResponse);
      //console.log("Expense Data:", expenseData);

      const history = [...incomeData, ...expenseData];
      //console.log("Merged History:", history);

      history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return history;
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        return rejectWithValue(
          error.message || "Failed to fetch transaction history"
        );
      }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.history = action.payload;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch transaction history";
      });
  },
});

export default transactionSlice.reducer;
