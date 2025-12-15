import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  name?: string;
  email?: string;
};

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
};

const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      isLoggedIn: false,
      user: null,
    };
  }

  try {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      return JSON.parse(savedAuth);
    }
  } catch (error) {
    console.error("Failed to parse auth from localStorage:", error);
  }

  return {
    isLoggedIn: false,
    user: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state));
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
    hydrate(state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
  },
});

export const { login, logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
