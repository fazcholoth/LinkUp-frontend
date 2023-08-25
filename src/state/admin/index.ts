import { createSlice } from "@reduxjs/toolkit";
import { User,Post } from "../user";
export interface adminAuthState {
  admin: User | null;
  adminToken: string | null;
  users: User[];
  reports: Report[];
}

export interface Report {
  _id:string
  postId: Post;
  reason: string;
  reportedBy: string;
}

const initialState: adminAuthState = {
  admin: null,
  adminToken: null,
  users: [],
  reports: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.adminToken = action.payload.adminToken;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setReport: (state, action) => {
      state.reports = action.payload;
    },
  },
});

export const { setAdLogin, setUsers, setReport } = adminSlice.actions;
export default adminSlice.reducer;