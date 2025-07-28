import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Создаем пустой корневой редьюсер (можно добавить реальные редьюсеры позже)
const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Экспортируем типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;