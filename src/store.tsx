import { configureStore } from '@reduxjs/toolkit';
import applicantReducer from './slices/applicantSlice';
import { combineReducers } from '@reduxjs/toolkit';
import applicationReducer from './slices/applicantSlice';

type RootState = ReturnType<typeof store.getState>;

// Combine your reducers
const rootReducer = combineReducers({
  applicant: applicantReducer,
});

// Create the Redux store
export const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type { RootState };

