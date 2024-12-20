import React, { useEffect } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import { TodoApi } from "../../apis/TodoApi";
import toast from "react-hot-toast";
import { loginApi } from "../../apis/LoginApi";
import { formatDate, TodoSchema, todoStatus } from "./TodoForm";
import { findKey } from "lodash";

const EditTodoForm = ({ openDialog, closeDialog, onSuccess, todoId, isEdit }) => {
  const { id } = loginApi.getUser();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (todoId !== null || !id) {
      TodoApi.getById(todoId)
        .then((response) => {
          const { data } = response.data;
          const statusKey = findKey(todoStatus, (val) => val === data.status);
          reset({
            ...data,
            startDate: formatDate(new Date(data.startDate)),
            endDate: formatDate(new Date(data.endDate)),
            status: Number(statusKey),
          });
        })
        .catch((e) => {
          toast.error("Error getting todo. Please try again.");
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [todoId]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      description: "",
      status: 0,
      priority: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      star: false,
      isActive: true,
      userId: id,
    },
  });

  const handleOnSubmit = (data) => {
    TodoApi.updateTodo(todoId, data)
      .then((response) => {
        const { success, message } = response.data;
        if (!success) {
          toast.error(message);
          return;
        }
        toast.success(message);
        onSuccess();
        closeDialog();
      })
      .catch((error) => {
        toast.error("Error updating todo. Please try again.");
      });
  };

  return (
    <Dialog open={openDialog} onClose={closeDialog}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogTitle>{isEdit ? "Edit Todo" : "Todo detail"}</DialogTitle>
        <DialogContent>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                disabled={!isEdit}
                margin="dense"
                label="Title"
                fullWidth
                error={!!errors.title} // Highlights the field in red if there's an error
                helperText={errors.title?.message} // Displays the validation message
              />
            )}
            name="title"
            control={control}
          />
          <Controller
            render={({ field }) => <TextField disabled={!isEdit} {...field} margin="dense" label="Description" fullWidth multiline rows={4} />}
            name="description"
            control={control}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select disabled={!isEdit} {...field} label="Status">
                  {Object.entries(todoStatus).map(([key, value]) => (
                    <MenuItem key={key} value={Number(key)}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select disabled={!isEdit} {...field} label="Priority">
                  <MenuItem value={0}>Low</MenuItem>
                  <MenuItem value={1}>Medium</MenuItem>
                  <MenuItem value={2}>High</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            render={({ field }) => (
              <TextField disabled={!isEdit} {...field} margin="dense" label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            )}
            name="startDate"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField disabled={!isEdit} {...field} margin="dense" label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            )}
            name="endDate"
            control={control}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          {isEdit && (
            <Button type="submit" color="primary">
              Edit
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTodoForm;
