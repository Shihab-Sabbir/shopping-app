import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  email: null | string;
  name?: null | string;
  accessToken: null | {
    token: string;
    expires: number;
  };
}

const initialState: IAuthState = {
  email: null,
  name: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IAuthState>) => {
      const email = action.payload.email;
      const name = action.payload.name;
      const accessToken = action.payload.accessToken;
      localStorage.setItem(
        "arraytics-auth",
        JSON.stringify({ email, accessToken, name })
      );
      state.email = email;
      state.name = name;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      localStorage.removeItem("arraytics-auth");
      state.email = null;
      state.accessToken = null;
    },
  },
});

export const { addUser, logout } = authSlice.actions;



export default authSlice.reducer;
