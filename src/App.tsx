import React from 'react';
import Router from './routes/Router';
import AppHeader from './components/layout/AppHeader/AppHeader';
import { Sidebar } from './components/common/Sidebar/Sidebar';
import { MainContent } from './components/common/MainContent/MainContent';
import { useAuthStore } from './store/authStore';
import { AppContainer, ContentWrapper } from './App.styles';
import ThemeToggle from './components/common/ThemeToggle/ThemeToggle';

// Define minimal type for auth store state
type AuthStoreState = {
  isAuthenticated: boolean;
};

function App() {
  // Apply type to the state parameter
  const isAuthenticated = useAuthStore((state: AuthStoreState) => state.isAuthenticated);
  
    return (
    <AppContainer>
      <AppHeader />
      <ContentWrapper>
        {isAuthenticated && <Sidebar />}
        <MainContent>
          <Router />
        </MainContent>
      </ContentWrapper>
      <ThemeToggle />
    </AppContainer>
  );
}

export default App;