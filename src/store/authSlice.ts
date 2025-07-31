import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Role } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  updateUser,
} = authSlice.actions;

export const login = (email: string, password: string) => 
  async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());
      
      // Имитация запроса к API
      const mockUsers: User[] = [
        {
          id: 1,
          name: "Иван Петров",
          email: "admin@mrtexpert.ru",
          role: "admin",
          avatar: "ИП",
          organization: "org1",
          department: "dep1",
          active: true
        },
        {
          id: 2,
          name: "Мария Сидорова",
          email: "support@mrtexpert.ru",
          role: "support",
          avatar: "МС",
          organization: "org1",
          department: "dep1",
          active: true
        }
      ];
      
      const user = mockUsers.find(u => u.email === email);
      if (!user) throw new Error("Неверные учетные данные");
      
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

export const register = (
  email: string, 
  password: string, 
  name: string, 
  role: Role, 
  organization: string, 
  department: string
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(registerStart());
    
    // Имитация создания пользователя
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      role,
      avatar: name.slice(0, 2).toUpperCase(),
      organization,
      department,
      active: true
    };
    
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    
    dispatch(registerSuccess(newUser));
  } catch (error: any) {
    dispatch(registerFailure(error.message));
  }
};

export default authSlice.reducer;