import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { loginApi } from "../../apis/LoginApi";
import { TodoApi } from "../../apis/TodoApi";
export const TodoSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }), // Required
  description: z.string().optional(),
  status: z.number().optional(),
  priority: z.number().optional(),
  startDate: z.string().optional(), // Assuming ISO string format
  endDate: z.string().optional(), // Assuming ISO string format
  star: z.boolean().optional(),
  isActive: z.boolean().optional(),
  userId: z.string().optional(),
});
export const todoStatus = {
  0: "Draft",
  1: "Todo",
  2: "InProgress",
  3: "Done",
  4: "Bug",
};
export const formatDate = (date) => date.toISOString().split("T")[0];
const TodoForm = ({ openDialog, closeDialog, onSuccess, isEdit }) => {
  const { id } = loginApi.getUser();

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
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date()),
      star: false,
      isActive: true,
      userId: id,
    },
  });

  const handleOnSubmit = (data) => {
    TodoApi.createTodo(data).then((response) => {
      const { success, message } = response.data;
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      onSuccess();
      closeDialog();
      console.log("User Id after add success: ", id)
      reset({
        title: "",
        description: "",
        status: 0,
        priority: 0,
        startDate: formatDate(new Date()),
        endDate: formatDate(new Date()),
        star: false,
        isActive: true,
        userId: id,
      });
    });
  };

  return (
    <Dialog open={openDialog} onClose={closeDialog}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogTitle>{"Add New Todo"}</DialogTitle>
        <DialogContent>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
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
            render={({ field }) => <TextField {...field} margin="dense" label="Description" fullWidth multiline rows={4} />}
            name="description"
            control={control}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Status">
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
                <Select {...field} label="Priority">
                  <MenuItem value={0}>Low</MenuItem>
                  <MenuItem value={1}>Medium</MenuItem>
                  <MenuItem value={2}>High</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            )}
            name="startDate"
            control={control}
          />
          <Controller
            render={({ field }) => <TextField {...field} margin="dense" label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />}
            name="endDate"
            control={control}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TodoForm;
