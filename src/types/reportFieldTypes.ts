// types/reportFieldTypes.ts
export type FieldType = 
  | 'string' 
  | 'number' 
  | 'date' 
  | 'boolean' 
  | 'array' 
  | 'object'
  | 'calculated';

export type DataSource = 
  | 'tickets' 
  | 'users' 
  | 'comments' 
  | 'systems'
  | 'custom';

export interface ReportField {
  id: string;
  name: string;
  displayName: string;
  type: FieldType;
  dataSource: DataSource;
  sourceField?: string; // Для полей, основанных на существующих данных
  formula?: string; // Для вычисляемых полей
  description?: string;
  dependencies: string[]; // ID зависимых полей
  createdAt: Date;
  updatedAt: Date;
}

export interface FieldRelationship {
  sourceFieldId: string;
  targetFieldId: string;
  relationshipType: 'direct' | 'indirect' | 'calculated';
}

export interface FieldDependencyGraph {
  nodes: {
    id: string;
    name: string;
    type: FieldType;
  }[];
  links: {
    source: string;
    target: string;
    type: string;
  }[];
}