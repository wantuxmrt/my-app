import { useState, useCallback, useMemo } from 'react';

export type FilterType = {
  system: string;
  status: string;
  priority: string;
  search: string;
  author: string;
};

export const useFilters = (initialFilters: FilterType) => {
  const [filters, setFilters] = useState<FilterType>(initialFilters);

  const updateFilter = useCallback(
    (key: keyof FilterType, value: string) => {
      setFilters(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const hasActiveFilters = useMemo(() => {
    return Object.keys(initialFilters).some(
      key => filters[key as keyof FilterType] !== initialFilters[key as keyof FilterType]
    );
  }, [filters, initialFilters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
};