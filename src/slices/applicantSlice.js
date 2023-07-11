import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchApplicantData = createAsyncThunk(
  'applicant/fetchData',
  async () => {
    const response = await fetch('http://localhost:3001/awesome/applicant');
    const data = await response.json();
    return data;
  }
);

const applicantSlice = createSlice({
  name: 'applicant',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicantData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicantData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApplicantData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default applicantSlice.reducer;
