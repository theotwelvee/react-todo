import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodoItem,
  editTodoItem,
  filterTodo,
  updateTodoStatus,
} from './todoSlice';

const DEFAULT_PAGE_SIZE = 5;
export default function Todos() {
  const dispatch = useDispatch();
  const isPaginationOn = true;

  const [isSorted, setIsSorted] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [sortedTodos, setSortedTodos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);

  const todoList = useSelector((state) => state.todoList.todos);
  const filteredTodos = useSelector((state) => state.todoList.filteredTodos);

  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  useEffect(() => {
    setTotalPages(Math.ceil(todoList.length / DEFAULT_PAGE_SIZE));
    setPaginatedTodos(paginate(todoList, DEFAULT_PAGE_SIZE, currentPage));
  }, [todoList, currentPage]);

  const handleSorting = () => {
    if (isSorted) {
      setIsSorted(false);
    } else {
      const updatedTodos = [...todoList].sort((p1, p2) =>
        p1.id < p2.id ? 1 : p1.id > p2.id ? -1 : 0
      );

      setSortedTodos(updatedTodos);
      setIsSorted(true);
    }
  };

  function handleSearch(value) {
    dispatch(filterTodo(value));
    setSearchText(value);
  }

  const renderTableBody = (todos) => {
    return (
      <TableBody>
        {todos &&
          todos.map((todo) => {
            return (
              <TableRow key={todo.id}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.name}</TableCell>
                <TableCell>
                  <FormControlLabel
                    key={todo.id}
                    label={todo.status ? 'Done' : 'Pending'}
                    control={
                      <Checkbox
                        checked={todo.status}
                        style={{ color: todo.status ? 'green' : 'red' }}
                        onClick={() => dispatch(updateTodoStatus(todo.id))}
                      />
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => dispatch(deleteTodoItem(todo.id))}>
                    <DeleteIcon
                      style={{ color: 'red' }}
                      sx={{ cursor: 'pointer' }}
                    />
                  </IconButton>
                  <IconButton onClick={() => dispatch(editTodoItem(todo.id))}>
                    <EditIcon color='primary' sx={{ cursor: 'pointer' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    );
  };

  function renderSortingArrows() {
    return (
      <Box sx={{ verticalAlign: 'sub', display: 'inline' }}>
        {isSorted ? (
          <ArrowDownwardIcon fontSize='small' />
        ) : (
          <ArrowUpwardIcon fontSize='small' />
        )}
      </Box>
    );
  }

  const getTodos = () => {
    if (searchText) {
      return filteredTodos;
    }
    if (isSorted) {
      return sortedTodos;
    }

    if (isPaginationOn) {
      return paginatedTodos;
    }

    return todoList;
  };

  return (
    <>
      {todoList.length > 0 && (
        <>
          <TextField
            sx={{ marginLeft: '20px' }}
            label='Search'
            variant='standard'
            placeholder='Search..'
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Table sx={{ margin: '20px' }}>
            <TableHead>
              <TableRow>
                <TableCell onClick={handleSorting}>
                  Id {renderSortingArrows()}
                </TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {(todoList || sortedTodos || filterTodo) &&
              renderTableBody(getTodos())}
          </Table>
          <Box sx={{ margin: '20px' }}>
            <Button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            {currentPage + '/' + totalPages}
            <Button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              disabled={totalPages === currentPage || totalPages <= 1}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
