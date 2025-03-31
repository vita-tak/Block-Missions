import '../styles/Todos.css';
import { TodoItem } from './TodoItem';

export const Todos = ({ todos, getTodos, writeContract }) => {
  return (
    <ul id='todo-list'>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            getTodos={getTodos}
            writeContract={writeContract}
          />
        </li>
      ))}
    </ul>
  );
};
