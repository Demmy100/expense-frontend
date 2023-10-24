import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseService from "../../services/expenseService";
import { toast } from "react-toastify";
import { getUser } from "../../services/authService";

const initialState = {
  expense: null,
  expenses: [],
  totalExpense: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  category: [],
};

const TOTAL_EXPENSE_KEY = "totalExpense";
const storedTotalExpense = localStorage.getItem(TOTAL_EXPENSE_KEY);
console.log("Stored Total Expense on Initialization:", storedTotalExpense);

if (storedTotalExpense) {
  initialState.totalExpense = parseFloat(storedTotalExpense);
} else {
  // If totalExpense is not in localStorage, set it to 0 or any default value
  initialState.totalExpense = 0;
}

//create new expense async function
export const createExpense = createAsyncThunk(
  "expenses/create",
  async (expData, thunkAPI) => {
    try {
      return await expenseService.createExpense(expData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all expenses async function
export const getAllExpenses = createAsyncThunk(
  "expenses/getAll",
  async (_, thunkAPI) => {
    try {
      const user = await getUser()
      //console.log(user)
      return await expenseService.getAllExpenses(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete expense async function
export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async ({ id, amount }, thunkAPI) => {
    try {
      const response = await expenseService.deleteExpense(id);
      return { id, amount, message: response.message };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get expense async function
export const getExpense = createAsyncThunk(
  "expenses/getExpense",
  async (id, thunkAPI) => {
    try {
      return await expenseService.getExpense(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const selectTotalExpense = (state, user) => {
  const userExpenses = state.expense.expenses.filter((expense) => {
    console.log("Expense Item", expense)
    return expense.user
  });
  console.log("User expenses:", userExpenses)
  return userExpenses.reduce((total, expense) => total + expense.amount, 0);
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const expenses = action.payload; // Assuming action.payload is an array of expense items
      const array = [];

      expenses.forEach((item) => {
        const { amount } = item;
        const expenseValue = parseFloat(amount); // Parse amount to ensure it's a valid number
        if (!isNaN(expenseValue)) {
          array.push(expenseValue);
        }
      });

      const totalValue = array.reduce((a, b) => a + b, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_CATEGORY(state, action) {
      const expenses = action.payload;
      const array = [];
      expenses.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
    updateTotalExpense: (state, action) => {
      state.totalExpense = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.expenses.push(action.payload);
        const totalExpense = state.expenses.reduce(
          (total, expense) => total + expense.amount,
          0
        );
        state.totalExpense = totalExpense;
        localStorage.setItem(TOTAL_EXPENSE_KEY, totalExpense.toString());
        toast.success("Expense added successfully");
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.expenses = [...action.payload];
      })
      .addCase(getAllExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Expense deleted successfully");

        const deletedExpenseId = action.payload.id
        const deletedAmount = parseFloat(action.payload.amount)

        console.log("Deleted Expense ID:", deletedExpenseId);
        console.log("Deleted Amount:", deletedAmount);
        console.log("Current State:", state.expenses);

        const deletedExpenseIndex = state.expenses.findIndex((expense) => expense._id === deletedExpenseId)

        console.log("Deleted Expense Index.", deletedExpenseIndex)

        if (deletedExpenseIndex !== -1) {
          state.totalExpense = Math.max(0, state.totalExpense - deletedAmount)

          //splice the deleted income from the array
          state.expenses.splice(deletedExpenseIndex, 1)
          console.log("Updated State:", state.expenses)

          localStorage.setItem(TOTAL_EXPENSE_KEY, state.totalExpense.toString());
        }  else {
          console.warn("Deleted expense not found in state.expenses");
        }

       /*  const totalExpense = state.expenses.reduce(
          (total, expense) => total + expense.amount,
          0
        );
        state.totalExpense = totalExpense; */
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.expense = action.payload;
      })
      .addCase(getExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_CATEGORY, updateTotalExpense } =
  expenseSlice.actions;

export const expenseIsLoading = (state) => state.expense.isLoading;
export const selectExpense = (state) => state.expense.expense;
export const expenseCategory = (state) => state.expense.category;
//export const selectTotalExpense = (state) => state.expense.totalExpense;

export default expenseSlice.reducer;
