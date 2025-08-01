import { ReportField, FieldRelationship, FieldDependencyGraph } from '@/types/reportFieldTypes';

export const generateFieldDependencies = (fields: ReportField[]): FieldRelationship[] => {
  const relationships: FieldRelationship[] = [];
  
  fields.forEach(field => {
    field.dependencies.forEach(depId => {
      relationships.push({
        sourceFieldId: depId,
        targetFieldId: field.id,
        relationshipType: field.formula ? 'calculated' : 'direct'
      });
    });
  });
  
  return relationships;
};

export const buildDependencyGraph = (fields: ReportField[]): FieldDependencyGraph => {
  const nodes = fields.map(field => ({
    id: field.id,
    name: field.displayName,
    type: field.type
  }));
  
  const links = fields.flatMap(field => 
    field.dependencies.map(depId => ({
      source: depId,
      target: field.id,
      type: field.formula ? 'calculated' : 'direct'
    }))
  );
  
  return { nodes, links };
};

export const validateField = (field: Partial<ReportField>): string[] => {
  const errors: string[] = [];
  
  if (!field.name || !/^[a-z_][a-z0-9_]*$/.test(field.name)) {
    errors.push('Invalid field name. Use lowercase letters, numbers and underscores');
  }
  
  if (!field.displayName?.trim()) {
    errors.push('Display name is required');
  }
  
  if (field.type === 'calculated' && !field.formula?.trim()) {
    errors.push('Formula is required for calculated fields');
  }
  
  if (field.type !== 'calculated' && !field.dataSource) {
    errors.push('Data source is required for non-calculated fields');
  }
  
  return errors;
};