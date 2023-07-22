import { JobApply } from "../types/reducersTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: JobApply = {
  jobPosition: "",
  yearsExperience: 0,
  language: "",
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJob(state, action) {
      const { jobPosition, yearsExperience, language } = action.payload;
      state.jobPosition = jobPosition;
      state.yearsExperience = yearsExperience;
      state.language = language;
    },
  },
});

export const { setJob } = jobSlice.actions;
export default jobSlice.reducer;
