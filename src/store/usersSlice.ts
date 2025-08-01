// src/store/slices/usersSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userAPI from '@/services/api/userAPI';
import type { User, Role, UpdateUserPayload, Organization, Department } from '@/types/zzzOLD_types';
import type { RootState } from '@/store/store';

interface UsersState {
  users: User[];
  currentUserDetail: User | null;
  organizations: Organization[];
  departments: Department[];
  loading: boolean;
  error: string | null;
  filters: {
    role: Role | 'all';
    organization: string | 'all';
    department: string | 'all';
    search: string;
  };
}

const initialState: UsersState = {
  users: [],
  currentUserDetail: null,
  organizations: [],
  departments: [],
  loading: false,
  error: null,
  filters: {
    role: 'all',
    organization: 'all',
    department: 'all',
    search: '',
  },
};

// Асинхронные действия
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await userAPI.getUsers();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await userAPI.getUserById(userId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrganizations = createAsyncThunk(
  'users/fetchOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      return await userAPI.getOrganizations();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDepartments = createAsyncThunk(
  'users/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      return await userAPI.getDepartments();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewOrganization = createAsyncThunk(
  'users/createOrganization',
  async (orgData: Omit<Organization, 'id'>, { rejectWithValue }) => {
    try {
      return await userAPI.createOrganization(orgData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewDepartment = createAsyncThunk(
  'users/createDepartment',
  async (deptData: Omit<Department, 'id'>, { rejectWithValue }) => {
    try {
      return await userAPI.createDepartment(deptData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, updates }: { userId: number; updates: UpdateUserPayload }, { rejectWithValue }) => {
    try {
      return await userAPI.updateUser(userId, updates);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'users/toggleUserStatus',
  async ({ userId, active }: { userId: number; active: boolean }, { rejectWithValue }) => {
    try {
      return await userAPI.toggleUserStatus(userId, active);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersFilters: (state, action: PayloadAction<Partial<UsersState['filters']>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetUsersFilters: (state) => {
      state.filters = initialState.filters;
    },
    setCurrentUserDetail: (state, action: PayloadAction<User | null>) => {
      state.currentUserDetail = action.payload;
    },
    resetUsersState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Обработка загрузки пользователей
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Обработка загрузки пользователя по ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.currentUserDetail = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Обработка загрузки организаций
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.organizations = action.payload;
      })
      
      // Обработка загрузки отделов
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      
      // Обработка создания организации
      .addCase(createNewOrganization.fulfilled, (state, action) => {
        state.organizations.push(action.payload);
      })
      
      // Обработка создания отдела
      .addCase(createNewDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload);
      })
      
      // Обработка обновления пользователя
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.currentUserDetail?.id === action.payload.id) {
          state.currentUserDetail = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Обработка изменения статуса пользователя
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Селекторы
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectFilteredUsers = (state: RootState) => {
  const { role, organization, department, search } = state.users.filters;
  
  return state.users.users.filter(user => {
    const matchesRole = role === 'all' || user.role === role;
    const matchesOrg = organization === 'all' || user.organization === organization;
    const matchesDept = department === 'all' || user.department === department;
    
    const searchLower = search.toLowerCase();
    const matchesSearch = search === '' || 
      user.name.toLowerCase().includes(searchLower) || 
      user.email.toLowerCase().includes(searchLower);
    
    return matchesRole && matchesOrg && matchesDept && matchesSearch;
  });
};
export const selectCurrentUserDetail = (state: RootState) => state.users.currentUserDetail;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectUsersFilters = (state: RootState) => state.users.filters;
export const selectOrganizations = (state: RootState) => state.users.organizations;
export const selectDepartments = (state: RootState) => state.users.departments;

export const { 
  setUsersFilters, 
  resetUsersFilters, 
  setCurrentUserDetail,
  resetUsersState
} = usersSlice.actions;

export default usersSlice.reducer;