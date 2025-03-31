export const getTodos = async (readContract) => {
  const countBN = await readContract.todoCount();
  const count = Number(countBN);

  const todosTemporaryArray = [];
  for (let i = 1; i <= count; i++) {
    const todo = await readContract.todos(i);

    if (todo && todo.id > 0) {
      todosTemporaryArray.push(todo);
    }
  }

  return todosTemporaryArray;
};

export const addTodo = async (text, writeContract) => {
  try {
    const response = await writeContract.createTodo(text);
    await response.wait();

    return true;
  } catch {
    return false;
  }
};

export const removeTodo = async (id, writeContract) => {
  try {
    const response = await writeContract.removeTodo(id);
    await response.wait();

    return true;
  } catch {
    return false;
  }
};

export const toggleTodo = async (id, writeContract) => {
  try {
    const response = await writeContract.toggleTodo(id);
    await response.wait();

    return true;
  } catch {
    return false;
  }
};
