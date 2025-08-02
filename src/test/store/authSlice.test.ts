// test/store/authSlice.test.ts
import authReducer, { login, logout, fetchCurrentUser } from '@/store/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { waitFor } from '@testing-library/react';

const server = setupServer(
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' },
        token: 'test-token'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('authSlice', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      token: null
    });
  });

  it('should handle login success', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    await store.dispatch(login({ email: 'test@example.com', password: 'password' }));
    
    const state = store.getState().auth;
    expect(state.user).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    });
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe('test-token');
    expect(localStorage.getItem('authToken')).toBe('test-token');
  });

  it('should handle login failure', async () => {
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'Invalid credentials' }));
      })
    );

    const store = configureStore({ reducer: { auth: authReducer } });
    await store.dispatch(login({ email: 'wrong@example.com', password: 'wrong' }));
    
    const state = store.getState().auth;
    expect(state.error).toBe('Invalid credentials');
    expect(state.isAuthenticated).toBe(false);
  });

  it('should handle logout', () => {
    const initialState = {
      user: { id: '1', name: 'Test User' },
      isAuthenticated: true,
      token: 'test-token',
      loading: false,
      error: null
    };

    const state = authReducer(initialState, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should fetch current user', async () => {
    localStorage.setItem('authToken', 'test-token');
    
    const store = configureStore({ reducer: { auth: authReducer } });
    await store.dispatch(fetchCurrentUser());
    
    const state = store.getState().auth;
    expect(state.user).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    });
    expect(state.isAuthenticated).toBe(true);
  });
});