import { Add as AddIcon, Search } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Container, InputAdornment, Pagination, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../components/forms/AuthContext";
import Grid from "@mui/material/Grid2";
import { isEmpty, set } from "lodash";
import toast from "react-hot-toast";
import { TodoApi } from "../apis/TodoApi";
import { TodoCard } from "../components/card/todo-card";
import TodoForm from "../components/forms/TodoForm";
import EditForm from "../components/forms/EditForm";
import FilterBox from "../components/FilterBox";
import { loginApi } from "../apis/LoginApi";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const { id } = loginApi.getUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { logout } = useAuth();
  const [filter, setFilter] = useState({});
  const [totalPage, setTotalPage] = useState();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setIsEdit(false);
    setSelectedTodoId(null);
  };

  const handleFilter = (filter) => {
    const cleanedFilter = Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );
    setFilter(cleanedFilter);
    setCurrentPageNumber(1); // Reset to the first page when applying a new filter
  };

  const handleOnView = (todoId) => {
    setSelectedTodoId(todoId);
    setIsEdit(false);
    setOpenEditDialog(true);
  };

  useEffect(() => {
    TodoApi.getByUserId(id, { ...filter, pageNumber: currentPageNumber }).then((response) => {
      const { success, message, data } = response.data;
      if (!success) {
        toast.error(message);
        return;
      }

      setTodos(data.items);
      console.log(data)
      // Calculate the total number of pages based on the total count
      const calculatedTotalPage = Math.ceil(data.totalCount / 12);
      setTotalPage(calculatedTotalPage);

      // If the current page exceeds the total pages (e.g., after switching users), reset it to 1
      if (currentPageNumber > calculatedTotalPage) {
        setCurrentPageNumber(1);
      }
    });
  }, [filter, id, currentPageNumber]);

  const handleOnEdit = (todoId) => {
    setSelectedTodoId(todoId);
    setIsEdit(true);
    setOpenEditDialog(true);
  };

  const handleOnSuccess = () => {
    TodoApi.getByUserId(id, { ...filter, pageNumber: currentPageNumber }).then((response) => {
      const { success, message, data } = response.data;

      if (!success) {
        toast.error(message);
        return;
      }

      setTodos(data.items);
      const calculatedTotalPage = Math.ceil(data.totalCount / 12);
      setTotalPage(calculatedTotalPage);

      if (currentPageNumber > calculatedTotalPage) {
        setCurrentPageNumber(calculatedTotalPage > 0 ? calculatedTotalPage : 1);
      }
    });
  };

  const handleOnDelete = (todoId) => {
    TodoApi.deleteTodo(todoId)
      .then((response) => {
        const { success, message } = response.data;
        if (!success) {
          toast.error(message);
          return;
        }

        toast.success(message);

        const remainingItemsOnPage = todos.filter((todo) => todo.id !== todoId);

        // If no items remain on the current page and there are more pages, adjust the page number
        if (remainingItemsOnPage.length === 0 && currentPageNumber > 1) {
          const newPage = currentPageNumber - 1;
          setCurrentPageNumber(newPage);
          setFilter((prev) => ({ ...prev, pageNumber: newPage }));
        } else {
          setTodos(remainingItemsOnPage);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.detail);
      });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
        <Stack alignItems={"center"} gap={4} variant="standard" flexDirection={"row"}>
          <Typography variant="h4">Todo List</Typography>
          <FilterBox onFilter={handleFilter} />
        </Stack>
        <Stack flexDirection={"row"} gap={2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Add Todo
          </Button>
          <Button variant="contained" color="secondary" startIcon={<LogoutIcon />} onClick={() => logout()}>
            Logout
          </Button>
        </Stack>
      </Box>

      {isEmpty(todos) && <Typography variant="h6">No todo found</Typography>}

      <Grid container spacing={3}>
        {todos.map((todo) => (
          <Grid key={todo.id} size={3}>
            <TodoCard todo={todo} onEdit={handleOnEdit} onView={handleOnView} onDelete={handleOnDelete} />
          </Grid>
        ))}
      </Grid>

      <Stack flexDirection={"row"} justifyContent={"center"} my="20px">
        <Pagination
          count={totalPage}
          page={currentPageNumber}
          onChange={(e, page) => {
            setCurrentPageNumber(page);
            setFilter({ ...filter, pageNumber: page });
          }}
        />
      </Stack>

      <EditForm isEdit={isEdit} todoId={selectedTodoId} openDialog={openEditDialog} closeDialog={handleCloseEditDialog} onSuccess={handleOnSuccess} />

      <TodoForm openDialog={openDialog} closeDialog={handleCloseDialog} onSuccess={handleOnSuccess} />
    </Container>
  );
}
