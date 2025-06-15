// becomeSellerSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "@/lib/axiosClient";

interface BecomeSellerState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: BecomeSellerState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const sendBecomeSellerRequest = createAsyncThunk(
  "seller/sendRequest",
  async (formData: any, { rejectWithValue }) => {
    try {
      const api = await axiosClient();
      const response = await api.post("/become-seller", formData);
      return response.data.message || "Request under review";
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const becomeSellerSlice = createSlice({
  name: "becomeSeller",
  initialState,
  reducers: {
    clearSellerState: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendBecomeSellerRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendBecomeSellerRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(sendBecomeSellerRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSellerState } = becomeSellerSlice.actions;
export default becomeSellerSlice.reducer;
