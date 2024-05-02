import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import axios from "axios";
import { UserCredentials } from "../../types/userCredientials";

interface AuthState {
  accessToken: string | null;
  refreshToken?: string | null;
  message: string;
  isLoading?: boolean;
  error?: any;
}

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
  message: "",
  isLoading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData: UserCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://backend-practice.euriskomobility.me/signup",
        {
          email: userData.email,
          password: userData.password,
        }
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (userData: UserCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://backend-practice.euriskomobility.me/login",
        {
          email: userData.email,
          password: userData.password,
        }
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.message = action.payload.message;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || true;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.message = action.payload.message;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export default authSlice.reducer;
export const { setAccessToken, setRefreshToken } = authSlice.actions;
