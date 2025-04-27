import { configureStore } from "@reduxjs/toolkit";
import { authBaseSlice } from "./thunks/authThunk";
import insightsSlice from "../store/slices/InsightsSlice";
import AuthSlice from "./slices/AuthSlice";
import { insightsReducer } from "../store/thunks/insightsThunk";
import { videosReducer } from "./thunks/videoManagementThunk";
import { categoriesManagementReducer } from "./thunks/categoryManagementThunks";
import { userManagementReducer } from "./thunks/userManagementThunk";

// Create a Redux store
const store = configureStore({
  reducer: {
    [authBaseSlice.reducerPath]: authBaseSlice.reducer,
    [insightsReducer.reducerPath]: insightsReducer.reducer,
    [videosReducer.reducerPath]: videosReducer.reducer,
    [categoriesManagementReducer.reducerPath]: categoriesManagementReducer.reducer,
    [userManagementReducer.reducerPath]: userManagementReducer.reducer,
    insights: insightsSlice,
    auth: AuthSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authBaseSlice.middleware)
      .concat(insightsReducer.middleware)
      .concat(videosReducer.middleware)
      .concat(categoriesManagementReducer.middleware)
      .concat(userManagementReducer.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;