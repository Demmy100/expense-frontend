import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import incomeService from "../../services/incomeService";
import { toast } from "react-toastify";
import { getUser } from "../../services/authService";

const initialState = {
  income: null,
  incomes: [],
  totalIncome: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  category: [],
};

const TOTAL_INCOME_KEY = "totalIncome";
const storedTotalIncome = localStorage.getItem(TOTAL_INCOME_KEY);
console.log("Stored Total Income on Initialization:", storedTotalIncome);

if (storedTotalIncome) {
  initialState.totalIncome = parseFloat(storedTotalIncome);
} else {
  // If totalIncome is not in localStorage, set it to 0 or any default value
  initialState.totalIncome = 0;
}
//create new income
export const createIncome = createAsyncThunk(
  "incomes/create",
  async (incomeData, thunkAPI) => {
    try {
      return await incomeService.createIncome(incomeData);
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

//get all incomes
export const getAllIncomes = createAsyncThunk(
  "incomes/getAll",
  async (_, thunkAPI) => {
    try {
      const user = await getUser();  // Wait for the Promise to resolve
      console.log(user);
      return await incomeService.getAllIncomes(user);
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


// Delete a income
export const deleteIncome = createAsyncThunk(
  "incomes/delete",
  async ({ id, amount }, thunkAPI) => {
    try {
      const response = await incomeService.deleteIncome(id);
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

// Get income
export const getIncome = createAsyncThunk(
  "incomes/getIncome",
  async (id, thunkAPI) => {
    try {
      return await incomeService.getIncome(id);
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


export const selectTotalIncome = (state, user) => {
  const userIncomes = state.income.incomes.filter((income) => {
    console.log("Income Item:", income);
    return income.user
  });
  console.log("User Incomes:", userIncomes);
  return userIncomes.reduce((total, income) => total + income.amount, 0);
};


const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const incomes = action.payload; // Assuming action.payload is an array of income items
      const array = [];

      incomes.forEach((item) => {
        const { amount } = item;
        const incomeValue = parseFloat(amount); // Parse amount to ensure it's a valid number
        if (!isNaN(incomeValue)) {
          array.push(incomeValue);
        }
      });

      const totalValue = array.reduce((a, b) => a + b, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_CATEGORY(state, action) {
      const incomes = action.payload;
      const array = [];
      incomes.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
    updateTotalIncome: (state, action) => {
      state.totalIncome = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        // Update the state and localStorage with the new totalIncome
        state.incomes.push(action.payload);
        const totalIncome = state.incomes.reduce(
          (total, income) => total + income.amount,
          0
        );
        state.totalIncome = totalIncome;
        localStorage.setItem(TOTAL_INCOME_KEY, totalIncome.toString());

        toast.success("Income added successfully");
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllIncomes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log("Redux State:", state);
        console.log("Fetched Incomes:", action.payload);
        state.incomes = [...action.payload];
      })
      .addCase(getAllIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      
        toast.success("Income deleted successfully");
      
        const deletedIncomeId = action.payload.id;
        const deletedAmount = parseFloat(action.payload.amount);
      
        console.log("Deleted Income ID:", deletedIncomeId);
        console.log("Deleted Amount:", deletedAmount);
        console.log("Current State:", state.incomes);
      
        // Use findIndex to get the index of the deleted income
        const deletedIncomeIndex = state.incomes.findIndex(
          (income) => income._id === deletedIncomeId
        );
      
        console.log("Deleted Income Index:", deletedIncomeIndex);
      
        if (deletedIncomeIndex !== -1) {
          state.totalIncome = Math.max(0, state.totalIncome - deletedAmount);
      
          // Splice the deleted income from the array
          state.incomes.splice(deletedIncomeIndex, 1);
      
          console.log("Updated State:", state.incomes);
      
          localStorage.setItem(TOTAL_INCOME_KEY, state.totalIncome.toString());
        } else {
          console.warn("Deleted income not found in state.incomes");
        }
      })
      

      .addCase(deleteIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.income = action.payload;
      })
      .addCase(getIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_CATEGORY, updateTotalIncome } =
  incomeSlice.actions;

export const selectIsLoading = (state) => state.income.isLoading;
export const selectIncome = (state) => state.income.income;
export const selectCategory = (state) => state.income.category;
//export const selectTotalIncome = (state) => state.income.totalIncome;

export default incomeSlice.reducer;
