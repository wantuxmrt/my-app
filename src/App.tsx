// src/App.tsx
import React, { useEffect } from 'react';
import Router from '@/routes/Router';
import AppHeader from '@/components/layout/AppHeader/AppHeader';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import MainContent from '@/components/layout/MainContent/MainContent';
import { AppContainer, ContentWrapper } from '@/assets/styles/AppLayout';
import ThemeToggle from '@/components/common/ThemeToggle/ThemeToggle';
import { useAppDispatch, useAppSelector } from '@/store';
import { checkAuth } from '@/store/authSlice';
import { fetchTickets } from '@/store/requestsSlice';

function App() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const { stats } = useAppSelector(state => state.requests);
  
  useEffect(() => {
    dispatch(checkAuth());
    if (isAuthenticated) {
      dispatch(fetchTickets());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <AppContainer>
      <AppHeader user={user} />
      <ContentWrapper>
        {isAuthenticated && (
          <Sidebar stats={stats} />
        )}
        <MainContent>
          <Router />
        </MainContent>
      </ContentWrapper>
      <ThemeToggle />
    </AppContainer>
  );
}

export default App;