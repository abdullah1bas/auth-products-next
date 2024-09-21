import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../_config/firebase';

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    role: 'user'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;