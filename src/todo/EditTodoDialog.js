import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTodoItemNo, editTodoItemYes } from './todoSlice';

export default function EditTodoDialog() {
  const { isEditDialogOpen, editId, todos } = useSelector(
    (state) => state.todoList
  );
  const editTodoItem = todos.find((todo) => todo.id === editId);

  const [editItemText, setEditItemText] = useState('');

  useEffect(() => {
    setEditItemText(editTodoItem?.name);
  }, [editTodoItem]);

  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        open={isEditDialogOpen}
        onClose={() => {
          dispatch(editTodoItemNo());
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Edit Todo'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <TextField
              label='Task Name'
              style={{ marginTop: '12px' }}
              value={editItemText}
              error={editItemText ? false : true}
              helperText={editItemText ? '' : 'Enter Task Name'}
              variant='outlined'
              onChange={(e) => setEditItemText(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(editTodoItemNo());
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              editItemText &&
                dispatch(
                  editTodoItemYes({ name: editItemText, id: editTodoItem.id })
                );
            }}
            color='error'
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
