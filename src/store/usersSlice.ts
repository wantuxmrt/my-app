// src/store/usersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { usersAPI } from '@/services/api/usersAPI';
import { User, Role, UpdateUserPayload } from '@/types/userTypes';
import { showTimedNotification } from './uiSlice';

interface UsersState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  roles: Role[];
  organizations: string[];
  departments: string[];
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  roles: ['admin', 'manager', 'user', 'guest'],
  organizations: [],
  departments: []
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const users = await usersAPI.getUsers();
      return users;
    } catch (error: any) {
      dispatch(showTimedNotification({
        message: 'Ошибка загрузки пользователей',
        type: 'error'
      }));
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: string, { rejectWithValue, dispatch }) => {
    try {
      const user = await usersAPI.getUserById(userId);
      return user;
    } catch (error: any) {
      dispatch(showTimedNotification({
        message: 'Ошибка загрузки пользователя',
        type: 'error'
      }));
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, updates }: { 
    userId: string; 
    updates: UpdateUserPayload 
  }, { rejectWithValue, dispatch }) => {
    try {
      const user = await usersAPI.updateUser(userId, updates);
      dispatch(showTimedNotification({
        message: 'Данные пользователя обновлены',
        type: 'success'
      }));
      return user;
    } catch (error: any) {
      dispatch(showTimedNotification({
        message: 'Ошибка обновления пользователя',
        type: 'error'
      }));
      return rejectWithValue(error.message);
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'users/toggleUserStatus',
  async ({ userId, active }: { 
    userId: string; 
    active: boolean 
  }, { rejectWithValue, dispatch }) => {
    try {
      const user = await usersAPI.toggleUserStatus(userId, active);
      dispatch(showTimedNotification({
        message: `Пользователь ${active ? 'активирован' : 'деактивирован'}`,
        type: 'success'
      }));
      return user;
    } catch (error: any) {
      dispatch(showTimedNotification({
        message: 'Ошибка изменения статуса',
        type: 'error'
      }));
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        
        // Extract unique organizations and departments
        const orgs = new Set<string>();
        const depts = new Set<string>();
        
        action.payload.forEach(user => {
          if (user.organization) orgs.add(user.organization);
          if (user.department) depts.add(user.department);
        });
        
        state.organizations = Array.from(orgs);
        state.departments = Array.from(depts);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        );
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        );
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;