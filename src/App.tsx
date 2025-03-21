import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodosProvider } from './store/TodoContext';

export const App: React.FC = () => {
  return (
    <TodosProvider>
      <header className='header'></header>
      <main className='main'>
        <TodoApp />
      </main>
    </TodosProvider>
  );
};