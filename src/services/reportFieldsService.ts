import { ReportField, FieldRelationship } from '@/types/reportFieldTypes';
import { generateFieldDependencies } from '@/utils/fieldUtils';

const API_URL = '/api/report-fields';
const LOCAL_STORAGE_KEY = 'reportFields';

// Инициализация демо-данных
const DEMO_FIELDS: ReportField[] = [
  {
    id: 'f1',
    name: 'ticket_count',
    displayName: 'Total Tickets',
    type: 'number',
    dataSource: 'tickets',
    dependencies: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'f2',
    name: 'avg_resolution_time',
    displayName: 'Avg. Resolution Time',
    type: 'number',
    dataSource: 'tickets',
    formula: 'resolution_time / ticket_count',
    dependencies: ['f1', 'f3'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'f3',
    name: 'resolution_time',
    displayName: 'Total Resolution Time',
    type: 'number',
    dataSource: 'tickets',
    dependencies: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const fetchFields = async (): Promise<ReportField[]> => {
  if (process.env.NODE_ENV === 'development') {
    // В режиме разработки используем localStorage
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEMO_FIELDS;
  }
  
  const response = await fetch(API_URL);
  return response.json();
};

export const saveField = async (field: ReportField): Promise<ReportField> => {
  if (process.env.NODE_ENV === 'development') {
    const fields = await fetchFields();
    const existingIndex = fields.findIndex(f => f.id === field.id);
    
    if (existingIndex >= 0) {
      fields[existingIndex] = field;
    } else {
      fields.push(field);
    }
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fields));
    return field;
  }
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(field)
  });
  
  return response.json();
};

export const deleteField = async (id: string): Promise<void> => {
  if (process.env.NODE_ENV === 'development') {
    const fields = await fetchFields();
    const updated = fields.filter(f => f.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return;
  }
  
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};

export const getFieldRelationships = async (): Promise<FieldRelationship[]> => {
  const fields = await fetchFields();
  return generateFieldDependencies(fields);
};