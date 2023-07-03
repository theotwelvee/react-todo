import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoItem } from './todoSlice';

export default function TodoInput() {
  const defaultTodoState = {
    name: '',
    status: false,
  };

  const dispatch = useDispatch();
  const [todoItem, setTodoItem] = useState(defaultTodoState);

  function submitTodo(e) {
    e?.preventDefault();
    dispatch(addTodoItem(todoItem));
    setTodoItem(defaultTodoState);
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      <form onSubmit={submitTodo}>
        <h4>Create Todo List</h4>
        <TextField
          label='Task Name'
          variant='standard'
          value={todoItem.name}
          onChange={(e) => setTodoItem({ ...todoItem, name: e.target.value })}
        />
        <IconButton
          aria-label='delete'
          size='medium'
          sx={{ marginTop: '12px' }}
          onClick={submitTodo}
        >
          <AddCircleIcon fontSize='medium' color='primary' />
        </IconButton>
      </form>
    </Box>
  );
}
