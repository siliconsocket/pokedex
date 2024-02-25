import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCoach } from "../../types";

const initialState = {
  list: [] as TCoach[],
  current: null as TCoach | null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null as string | null,
};

export const fetchAllCoaches = createAsyncThunk(
  "coaches/fetchAll",
  async () => {
    const response = await axios.get<TCoach[]>(
      `${import.meta.env.VITE_API_URL}coaches`,
    );
    return response.data;
  },
);

export const addCoach = createAsyncThunk(
  "coaches/add",
  async (coachData: Omit<TCoach, "_id">) => {
    const url = `${import.meta.env.VITE_API_URL}coaches`;
    const response = await axios.post<TCoach>(url, coachData);
    return response.data;
  },
);

export const updateCoach = createAsyncThunk(
  "coaches/update",
  async ({ _id, ...coachData }: TCoach) => {
    const response = await axios.patch<TCoach>(
      `${import.meta.env.VITE_API_URL}coaches/${_id}`,
      coachData,
    );
    return response.data;
  },
);

export const deleteCoach = createAsyncThunk(
  "coaches/delete",
  async ({ _id }: { _id: string }) => {
    const response = await axios.delete<TCoach>(
      `${import.meta.env.VITE_API_URL}coaches/${_id}`,
    );
    return response.data;
  },
);

const coachesSlice = createSlice({
  name: "coaches",
  initialState,
  reducers: {
    setCurrentCoach: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoaches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCoaches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAllCoaches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch coaches";
      })
      .addCase(addCoach.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCoach.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(addCoach.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add coach";
      })
      .addCase(updateCoach.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCoach.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
        state.error = null;
        const index = state.list.findIndex(
          (coach) => coach._id === action.payload._id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateCoach.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update coach";
      })
      .addCase(deleteCoach.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCoach.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.list = state.list.filter(
          (coach) => coach._id !== action.payload._id,
        );
      })
      .addCase(deleteCoach.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete coach";
      });
  },
});

export const { setCurrentCoach } = coachesSlice.actions;
export default coachesSlice.reducer;
