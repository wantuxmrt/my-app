import React from 'react';
import styles from './TabsNavigation.module.css';
import Tab, { TabProps } from './Tab';

interface TabsNavigationProps {
  tabs: TabProps[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`${styles.tabsContainer} ${className}`}>
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          label={tab.label}
          icon={tab.icon}
          active={activeTab === tab.label}
          onClick={() => onTabChange(tab.label)}
          disabled={tab.disabled}
        />
      ))}
    </div>
  );
};

export default TabsNavigation;