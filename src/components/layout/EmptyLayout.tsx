// Файл: src/components/layout/EmptyLayout.tsx
import React from 'react';

interface EmptyLayoutProps {
  children: React.ReactNode;
}

const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => {
  return <div className="empty-layout">{children}</div>;
};

export default EmptyLayout;