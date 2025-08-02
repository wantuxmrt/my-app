// src/components/common/Loader/Loader.tsx
import React from 'react';
import './Loader.css';

const Loader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'full-screen' : ''}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;