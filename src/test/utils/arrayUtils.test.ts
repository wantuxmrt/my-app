// test/utils/arrayUtils.test.ts
import { groupBy, removeDuplicates, sortByDate } from '@/utils/arrayUtils';

describe('arrayUtils', () => {
  const data = [
    { id: 1, category: 'A', date: '2023-01-15' },
    { id: 2, category: 'B', date: '2023-01-10' },
    { id: 3, category: 'A', date: '2023-01-20' },
    { id: 4, category: 'C', date: '2023-01-05' },
  ];

  it('groups array by key', () => {
    const grouped = groupBy(data, 'category');
    expect(grouped).toEqual({
      A: [data[0], data[2]],
      B: [data[1]],
      C: [data[3]],
    });
  });

  it('removes duplicates by key', () => {
    const withDuplicates = [
      ...data,
      { id: 1, category: 'A', date: '2023-01-25' },
      { id: 4, category: 'C', date: '2023-01-30' },
    ];
    
    const unique = removeDuplicates(withDuplicates, 'id');
    expect(unique).toHaveLength(4);
    expect(unique.map(item => item.id)).toEqual([1, 2, 3, 4]);
  });

  it('sorts by date ascending', () => {
    const sorted = sortByDate([...data], 'date');
    expect(sorted.map(item => item.id)).toEqual([4, 2, 1, 3]);
  });

  it('sorts by date descending', () => {
    const sorted = sortByDate([...data], 'date', false);
    expect(sorted.map(item => item.id)).toEqual([3, 1, 2, 4]);
  });
});