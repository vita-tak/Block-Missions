import React from 'react';
import { toggleTodo, removeTodo } from '../services/todoServices';
import '../styles/TodoItem.css';

export const TodoItem = ({ todo, getTodos, writeContract }) => {
  const handleToggle = async () => {
    const success = await toggleTodo(todo.id, writeContract);
    if (success) {
      console.log(`Todo ${todo.id} is toggled!`);
      getTodos();
    } else {
      console.error('Failed to toggle todo with this id: ', todo.id, ' :(');
    }
  };

  const handleRemove = async (e) => {
    e.stopPropagation();
    const success = await removeTodo(todo.id, writeContract);
    if (success) {
      console.log(`Todo ${todo.id} borttagen!`);
      getTodos();
    } else {
      console.error('Failed to remove todo with this id: ', todo.id, ' :(');
    }
  };

  return (
    <div className='todo-item'>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={handleToggle}
        className='todo-checkbox'
        title='Mark as done/undone'
      />
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>
      <button
        className='todo-remove'
        onClick={handleRemove}
        title='Remove todo'>
        ❌
      </button>
    </div>
  );
};
