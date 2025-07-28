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
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const hasActiveFilters = useMemo(
    () =>
      Object.entries(filters).some(
        ([key, value]) =>
          key !== 'search' && value !== initialFilters[key as keyof FilterType]
      ),
    [filters, initialFilters]
  );

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
};