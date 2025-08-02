import React from 'react';
import { FieldRelationship, ReportField } from '@/types/reportFieldTypes';
import styles from './FieldRelationsTable.module.css';

interface FieldRelationsTableProps {
  fields: ReportField[];
  relationships: FieldRelationship[];
  onSelectField: (id: string) => void;
}

const FieldRelationsTable: React.FC<FieldRelationsTableProps> = ({
  fields,
  relationships,
  onSelectField
}) => {
  const getFieldName = (id: string) => 
    fields.find(f => f.id === id)?.displayName || id;

  return (
    <div className={styles.container}>
      <h3>Field Relationships</h3>
      
      <div className={styles.jsonViewer}>
        <pre>{JSON.stringify(relationships, null, 2)}</pre>
      </div>
      
      <table className={styles.relationsTable}>
        <thead>
          <tr>
            <th>Source Field</th>
            <th>Target Field</th>
            <th>Relationship Type</th>
          </tr>
        </thead>
        <tbody>
          {relationships.map((rel, index) => (
            <tr key={index} onClick={() => onSelectField(rel.targetFieldId)}>
              <td>
                <span className={styles.fieldLink} 
                  onClick={(e) => { e.stopPropagation(); onSelectField(rel.sourceFieldId); }}>
                  {getFieldName(rel.sourceFieldId)}
                </span>
              </td>
              <td>{getFieldName(rel.targetFieldId)}</td>
              <td>
                <span className={`${styles.typeBadge} ${styles[rel.relationshipType]}`}>
                  {rel.relationshipType}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FieldRelationsTable;