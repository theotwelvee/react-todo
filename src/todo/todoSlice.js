import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filteredTodos: [],
  isDeleteConfirmationDialogOpen: false,
  deleteId: 0,
  isEditDialogOpen: false,
  editId: 0,
};

export const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodoItem: (state, action) => {
      state.todos = [
        ...state.todos,
        { ...action.payload, id: state.todos.length + 1 },
      ];
    },
    updateTodoStatus: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, status: !todo.status };
        }
        return todo;
      });
    },
    deleteTodoItem: (state, action) => {
      state.isDeleteConfirmationDialogOpen = true;
      state.deleteId = action.payload;
    },
    deleteTodoItemYes: (state, action) => {
      state.isDeleteConfirmationDialogOpen = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    deleteTodoItemNo: (state, action) => {
      state.isDeleteConfirmationDialogOpen = false;
      state.deleteId = 0;
    },
    editTodoItem: (state, action) => {
      state.isEditDialogOpen = true;
      state.editId = action.payload;
    },
    editTodoItemYes: (state, action) => {
      state.isEditDialogOpen = false;
      state.editId = 0;
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name };
        }
        return todo;
      });
    },
    editTodoItemNo: (state, action) => {
      state.isEditDialogOpen = false;
      state.editId = 0;
    },
    filterTodo: (state, action) => {
      state.filteredTodos = state.todos.filter((todo) =>
        todo.name.includes(action.payload)
      );
    },
  },
});

export const {
  addTodoItem,
  editTodoItem,
  deleteTodoItem,
  deleteTodoItemYes,
  deleteTodoItemNo,
  filterTodo,
  updateTodoStatus,
  editTodoItemNo,
  editTodoItemYes,
} = todoSlice.actions;

export default todoSlice.reducer;
