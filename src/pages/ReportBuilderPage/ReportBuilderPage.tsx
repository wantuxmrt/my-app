import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFields, removeField, createField } from '@/store/reportFieldsSlice';
import { AppDispatch, RootState } from '@/store';
import FieldCreator from '@/components/reportFields/FieldCreator';
import FieldRelationsTable from '@/components/reportFields/FieldRelationsTable';
import FieldDependencyGraph from '@/components/reportFields/FieldDependencyGraph';
import { buildDependencyGraph } from '@/utils/fieldUtils';
import styles from './ReportFieldsManagerPage.module.css';

const ReportFieldsManagerPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { fields, relationships, loading, error } = useSelector(
    (state: RootState) => state.reportFields
  );
  
  const [selectedField, setSelectedField] = useState<ReportField | null>(null);
  const [dependencyGraph, setDependencyGraph] = useState<FieldDependencyGraph>({
    nodes: [],
    links: []
  });
  
  useEffect(() => {
    dispatch(loadFields());
  }, [dispatch]);
  
  useEffect(() => {
    if (fields.length > 0) {
      const graph = buildDependencyGraph(fields);
      setDependencyGraph(graph);
    }
  }, [fields]);
  
  const handleFieldSubmit = (field: ReportField) => {
    dispatch(createField(field));
    setSelectedField(null);
  };
  
  const handleDeleteField = (id: string) => {
    if (window.confirm('Are you sure you want to delete this field?')) {
      dispatch(removeField(id));
    }
  };
  
  if (loading) return <div>Loading fields...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className={styles.container}>
      <h1>Report Fields Manager</h1>
      
      <div className={styles.layout}>
        <div className={styles.leftPanel}>
          <FieldCreator 
            field={selectedField} 
            onSubmit={handleFieldSubmit} 
            fields={fields}
          />
          
          <div className={styles.existingFields}>
            <h3>Existing Fields</h3>
            <ul className={styles.fieldsList}>
              {fields.map(field => (
                <li key={field.id} className={styles.fieldItem}>
                  <div className={styles.fieldInfo}>
                    <div className={styles.fieldName}>{field.displayName}</div>
                    <div className={styles.fieldMeta}>
                      <span className={styles.fieldType}>{field.type}</span>
                      {field.dataSource && (
                        <span className={styles.dataSource}>{field.dataSource}</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.fieldActions}>
                    <button 
                      className={styles.editButton}
                      onClick={() => setSelectedField(field)}
                    >
                      Edit
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDeleteField(field.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className={styles.rightPanel}>
          <FieldDependencyGraph 
            graph={dependencyGraph} 
            onNodeClick={id => {
              const field = fields.find(f => f.id === id);
              if (field) setSelectedField(field);
            }}
          />
          
          <FieldRelationsTable 
            fields={fields} 
            relationships={relationships} 
            onSelectField={id => {
              const field = fields.find(f => f.id === id);
              if (field) setSelectedField(field);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportFieldsManagerPage;