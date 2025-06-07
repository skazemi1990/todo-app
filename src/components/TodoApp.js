import { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import Button from './Button';
import AddIcon from '@mui/icons-material/Add';

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleAddTodos() {
    if (newTodo.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: newTodo,
      done: false,
      createdAt: new Date().toLocaleString(),
    };
    setTodos((todo) => [...todo, newTask]);
    setNewTodo('');
  }
  function handleToggleDone(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleTotalComplete() {
    return todos.filter((todo) => todo.done).map((el) => el);
  }
  function handleEditTask(id) {
    const todo = todos.find((todo) => todo.id === id);
    setNewTodo(todo.text);
    setEditingId(id);
  }
  function handleUpdateTask() {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: newTodo } : todo
      )
    );
    setNewTodo('');
    setEditingId(null);
  }
  useEffect(
    function () {
      function callback(e) {
        if (e.code === 'Enter')
          editingId ? handleUpdateTask() : handleAddTodos();
      }
      document.addEventListener('keydown', callback);
      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [handleAddTodos]
  );
  const filteredTodo = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });
  return (
    <>
      <TodoInput
        todos={todos}
        newTodos={newTodo}
        setNewTodos={setNewTodo}
        onTotalComplete={handleTotalComplete}
      >
        <Button
          cName='add-task'
          onClick={editingId ? handleUpdateTask : handleAddTodos}
        >
          <AddIcon />
        </Button>
      </TodoInput>
      <TodoList
        todos={filteredTodo}
        onToggleDone={handleToggleDone}
        onClick={handleDeleteTodo}
        onEditTask={handleEditTask}
        filter={filter}
        onFilter={setFilter}
      />
    </>
  );
}
