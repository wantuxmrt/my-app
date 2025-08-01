import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportField, FieldRelationship } from '@/types/reportFieldTypes';
import { AppThunk } from '@/store';
import * as reportFieldsService from '@/services/reportFieldsService';

interface ReportFieldsState {
  fields: ReportField[];
  relationships: FieldRelationship[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportFieldsState = {
  fields: [],
  relationships: [],
  loading: false,
  error: null
};

const reportFieldsSlice = createSlice({
  name: 'reportFields',
  initialState,
  reducers: {
    fetchFieldsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFieldsSuccess(state, action: PayloadAction<ReportField[]>) {
      state.fields = action.payload;
      state.loading = false;
    },
    fetchFieldsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    saveFieldSuccess(state, action: PayloadAction<ReportField>) {
      const index = state.fields.findIndex(f => f.id === action.payload.id);
      if (index >= 0) {
        state.fields[index] = action.payload;
      } else {
        state.fields.push(action.payload);
      }
    },
    deleteFieldSuccess(state, action: PayloadAction<string>) {
      state.fields = state.fields.filter(f => f.id !== action.payload);
    },
    setRelationships(state, action: PayloadAction<FieldRelationship[]>) {
      state.relationships = action.payload;
    }
  }
});

export const {
  fetchFieldsStart,
  fetchFieldsSuccess,
  fetchFieldsFailure,
  saveFieldSuccess,
  deleteFieldSuccess,
  setRelationships
} = reportFieldsSlice.actions;

export default reportFieldsSlice.reducer;

// Асинхронные действия
export const loadFields = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchFieldsStart());
    const fields = await reportFieldsService.fetchFields();
    dispatch(fetchFieldsSuccess(fields));
    
    const relationships = await reportFieldsService.getFieldRelationships();
    dispatch(setRelationships(relationships));
  } catch (err) {
    dispatch(fetchFieldsFailure(err.message));
  }
};

export const createField = (field: ReportField): AppThunk => async dispatch => {
  try {
    const savedField = await reportFieldsService.saveField(field);
    dispatch(saveFieldSuccess(savedField));
    
    const relationships = await reportFieldsService.getFieldRelationships();
    dispatch(setRelationships(relationships));
  } catch (err) {
    console.error('Failed to save field:', err);
  }
};

export const removeField = (id: string): AppThunk => async dispatch => {
  try {
    await reportFieldsService.deleteField(id);
    dispatch(deleteFieldSuccess(id));
    
    const relationships = await reportFieldsService.getFieldRelationships();
    dispatch(setRelationships(relationships));
  } catch (err) {
    console.error('Failed to delete field:', err);
  }
};