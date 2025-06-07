import TodoItem from './TodoItem';
export default function TodoList({
  todos,
  filter,
  onFilter,
  onToggleDone,
  onClick,
  onEditTask,
}) {
  const numTasks = todos.length;

  return (
    <>
      {numTasks > 0 && (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              todos={todo}
              onToggleDone={onToggleDone}
              onClick={onClick}
              onEditTask={onEditTask}
              key={todo.id}
            />
          ))}
        </ul>
      )}

      <div className='filter'>
        <span>Filter : </span>
        <select
          value={filter}
          onChange={(e) => onFilter(e.target.value)}
          className='task-filter'
        >
          <option value='all'>All</option>
          <option value='active'>Not Done</option>
          <option value='completed'>Done</option>
        </select>
      </div>
    </>
  );
}
