import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const newUser: User = {
        email: action.payload.email,
        firstName: action.payload.firstName ?? "",
        lastName: action.payload.lastName ?? "",
      };
      localStorage.setItem("user", JSON.stringify(newUser));

      state.user = newUser;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;




