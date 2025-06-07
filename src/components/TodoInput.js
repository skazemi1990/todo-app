export default function TodoInput({
  todos,
  newTodos,
  setNewTodos,
  children,
  onTotalComplete,
}) {
  const totalComplete = onTotalComplete();
  const percentage = Math.round((totalComplete.length / todos.length) * 100);

  return (
    <>
      <div className='input-box'>
        <h2>Keep it UP!</h2>
        <div className='progress-box'>
          <div className='progress-bar'>
            <div className='progress' style={{ width: `${percentage}%` }}></div>
          </div>
          <div className='task__count'>
            {totalComplete.length} / {todos.length}
          </div>
        </div>
      </div>
      <div className='input'>
        <input
          type='text'
          placeholder='Add a new task...'
          value={newTodos}
          onChange={(e) => setNewTodos(e.target.value)}
        />

        {children}
      </div>
    </>
  );
}
