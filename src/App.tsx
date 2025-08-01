import React, { useEffect } from 'react';
import Router from './routes/Router';
import AppHeader from './components/layout/AppHeader/AppHeader';
import Sidebar from './components/layout/Sidebar/Sidebar';
import MainContent from './components/layout/MainContent/MainContent';
import { AppContainer, ContentWrapper } from './assets/styles/global';
import ThemeToggle from './components/common/ThemeToggle/ThemeToggle';
import { useAppDispatch, useAuth, useRequests } from './hooks';
import { checkAuth } from './store/slices/authSlice';
import { fetchTickets } from './store/slices/requestsSlice';

function App() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuth();
  const { stats } = useRequests();
  
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