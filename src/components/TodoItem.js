import Button from './Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function TodoItem({ todos, onToggleDone, onClick, onEditTask }) {
  const textStyle = {
    textDecoration: todos.done ? 'line-through' : 'none',
    color: todos.done ? '#000' : '#fff',
  };

  return (
    <li className='list-item'>
      <input
        id={`${todos.id}`}
        type='checkbox'
        className={`check ${todos.done ? 'checked' : ''} `}
        checked={todos.done}
        onChange={() => onToggleDone(todos.id)}
      />
      <label htmlFor={`${todos.id}`} className='input-test'>
        <span className='tick'>✔</span>
      </label>
      <p className={`list-item__task `} style={textStyle}>
        {todos.text}
      </p>
      <small>{todos.createdAt}</small>
      <div className='list-item__buttons'>
        <Button cName='buttons__edit' onClick={() => onEditTask(todos.id)}>
          <EditIcon />
        </Button>
        <Button cName='buttons__delete' onClick={() => onClick(todos.id)}>
          <DeleteIcon />
        </Button>
      </div>
    </li>
  );
}
