import '../styles/CreateTodo.css';

import React, { useState } from 'react';
import { addTodo } from '../services/todoServices';

export const CreateTodo = ({ writeContract, getTodos }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await addTodo(text, writeContract);

    if (success) {
      console.log('Todo created successfully');
      getTodos();
    } else {
      console.error('Failed to create todo :(');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='todo-input'
        type='text'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button type='submit'>Create mission</button>
    </form>
  );
};
