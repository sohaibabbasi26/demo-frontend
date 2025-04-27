import { createSlice } from "@reduxjs/toolkit";

interface InsightsDataState {
  totalLikes: 0;
  totalVideos: 0;
  totalUsers: 0;
}

const initialState : InsightsDataState = {
  totalLikes: 0,
  totalVideos: 0,
  totalUsers: 0,
};

const insightsDataSlice = createSlice({
  name: "insightsData",
  initialState,
  reducers: {
    setInsights: (state, action) => {
        const { totalLikes, totalUsers, totalVideos} = action.payload;
        state.totalLikes = totalLikes
        state.totalVideos = totalUsers;
        state.totalUsers = totalVideos;
    },
    setTotalLikes: (state, action) => {
      state.totalLikes = action.payload;
    },
    setTotalVideos: (state, action) => {
      state.totalVideos = action.payload;
    },
    setTotalUsers: (state, action) => {
      state.totalUsers = action.payload;
    },
  },
});

export const { setTotalLikes, setTotalUsers , setTotalVideos, setInsights} = insightsDataSlice.actions;
export default insightsDataSlice.reducer;
