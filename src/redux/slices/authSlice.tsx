import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  refreshToken?: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    // setTokens(
    //   state,
    //   action: PayloadAction<{authToken: string; refreshToken: string}>,
    // ) {
    //   state.authToken = action.payload.authToken;
    //   state.refreshToken = action.payload.refreshToken;
    // },
    // clearAuthToken(state) {
    //   state.authToken = null;
    // },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setAccessToken, setRefreshToken, clearTokens } =
  authSlice.actions;
export default authSlice.reducer;
