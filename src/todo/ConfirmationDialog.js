import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoItemNo, deleteTodoItemYes } from './todoSlice';

export default function AlertDialog() {
  const { isDeleteConfirmationDialogOpen, deleteId, todos } = useSelector(
    (state) => state.todoList
  );

  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        open={isDeleteConfirmationDialogOpen}
        onClose={() => {
          dispatch(deleteTodoItemNo());
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Are you sure want to delete following Todo?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {todos.find((todo) => todo.id === deleteId)?.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(deleteTodoItemNo());
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteTodoItemYes(deleteId));
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
