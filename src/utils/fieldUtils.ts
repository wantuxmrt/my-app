// fieldUtils.ts
import { ReportField, FieldDependencyGraph } from '@/types/reportFieldTypes';

/**
 * Генерирует зависимости полей
 * @param fields - Массив полей отчета
 * @returns Массив зависимостей
 */
export const generateFieldDependencies = (fields: ReportField[]) => {
  return fields.flatMap(field => 
    field.dependencies.map(depId => ({
      sourceFieldId: depId,
      targetFieldId: field.id,
      relationshipType: field.formula ? 'calculated' : 'direct'
    }))
  );
};

/**
 * Строит граф зависимостей
 * @param fields - Массив полей отчета
 * @returns Граф зависимостей
 */
export const buildDependencyGraph = (fields: ReportField[]): FieldDependencyGraph => {
  const nodes = fields.map(field => ({
    id: field.id,
    name: field.displayName,
    type: field.type
  }));
  
  const links = generateFieldDependencies(fields).map(rel => ({
    source: rel.sourceFieldId,
    target: rel.targetFieldId,
    type: rel.relationshipType
  }));
  
  return { nodes, links };
};

/**
 * Валидирует поле отчета
 * @param field - Поле для валидации
 * @returns Массив ошибок
 */
export const validateField = (field: Partial<ReportField>): string[] => {
  const errors: string[] = [];
  
  if (!field.name || !/^[a-z_][a-z0-9_]*$/.test(field.name)) {
    errors.push('Некорректное имя поля. Используйте латинские буквы, цифры и подчеркивания');
  }
  
  if (!field.displayName?.trim()) {
    errors.push('Отображаемое имя обязательно');
  }
  
  if (field.type === 'calculated' && !field.formula?.trim()) {
    errors.push('Для вычисляемых полей обязательна формула');
  }
  
  if (field.type !== 'calculated' && !field.dataSource) {
    errors.push('Источник данных обязателен для невычисляемых полей');
  }
  
  return errors;
};

/**
 * Находит корневые поля (без зависимостей)
 * @param fields - Массив полей
 * @returns Корневые поля
 */
export const findRootFields = (fields: ReportField[]): ReportField[] => {
  const allDependencies = new Set(
    fields.flatMap(field => field.dependencies)
  );
  
  return fields.filter(field => !allDependencies.has(field.id));
};