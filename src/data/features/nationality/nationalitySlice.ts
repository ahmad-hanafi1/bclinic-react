import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosTokenInstance from "../../../api/axiosInstance";

export interface Nationality {
  id: number;
  name: string;
}

interface NationalityState {
  nationalities: Nationality[];
  loading: boolean;
  error: string | null;
}

const initialState: NationalityState = {
  nationalities: [],
  loading: false,
  error: null,
};

// 🔄 Async thunk to fetch nationalities
export const fetchNationalities = createAsyncThunk<Nationality[]>(
  "nationality/fetchNationalities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosTokenInstance.get(
        `/api/search_read?model=res.country&db=network&fields=["name","id"]&domain=[]`
      );
      return response.data;
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch nationalities"
      );
    }
  }
);

const nationalitySlice = createSlice({
  name: "nationality",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNationalities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchNationalities.fulfilled,
        (state, action: PayloadAction<Nationality[]>) => {
          state.loading = false;
          state.nationalities = action.payload;
        }
      )
      .addCase(fetchNationalities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default nationalitySlice.reducer;
