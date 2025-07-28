import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
  gap: 20px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;