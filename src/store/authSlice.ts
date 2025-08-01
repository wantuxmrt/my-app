import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, Role } from '@/types/zzzOLD_types';
import userAPI from '@/services/api_old_test/usersAPI';
import type { RootState } from '@/store/index';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isInitialized: boolean; // Флаг инициализации
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isInitialized: false,
};

// Асинхронные действия
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    return await userAPI.getCurrentUser();
  } catch (error) {
    localStorage.removeItem('authToken');
    throw error;
  }
});

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { user, token } = await userAPI.login(credentials);
      localStorage.setItem('authToken', token);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка входа');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: {
    name: string;
    email: string;
    password: string;
    role: Role;
    organization: string;
    department: string;
  }, { rejectWithValue }) => {
    try {
      const user = await userAPI.register(data);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await userAPI.logout();
    localStorage.removeItem('authToken');
    return null;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка выхода');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    resetAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
        state.isInitialized = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isInitialized = true;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Селекторы
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;

export const { updateUser, resetAuthError } = authSlice.actions;
export default authSlice.reducer;