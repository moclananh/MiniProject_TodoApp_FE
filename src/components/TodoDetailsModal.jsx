import React, { useEffect } from "react";
import { Box, Typography, Grid, Chip, Stack, Modal, Backdrop, Fade } from "@mui/material";
import { TodoApi } from "../apis/TodoApi";

export const todoStatus = {
  0: "Draft",
  1: "Todo",
  2: "In Progress",
  3: "Done",
  4: "Bug",
};

export const todoPriority = {
  0: "Low",
  1: "Medium",
  2: "High",
};

const TodoDetailsModal = ({ open, onClose, todoId }) => {
  const [todo, setTodo] = React.useState(null);

  useEffect(() => {
    if (todoId !== null) {
      TodoApi.getById(todoId)
        .then((response) => {
          const { data } = response.data;
          setTodo(data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [todoId]);

  if (!todo) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {todo.title}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Stack direction="row" justifyItems={"center"} alignItems={"center"} gap={2}>
                <Typography variant="body1" color="textSecondary">
                  Status:
                </Typography>
                <Chip label={todoStatus[todo.status] || "Unknown"} color="info" />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyItems={"center"} alignItems={"center"} gap={2}>
                <Typography variant="body1" color="textSecondary">
                  Priority:
                </Typography>
                <Chip label={todoPriority[todo.priority] || "Unknown"} color={todo.priority === 2 ? "error" : "primary"} />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyItems={"center"} alignItems={"center"} gap={2}>
                <Typography variant="body1" color="textSecondary">
                  Start Date:
                </Typography>
                <Typography variant="body2">{new Date(todo.startDate).toLocaleDateString()}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyItems={"center"} alignItems={"center"} gap={2}>
                <Typography variant="body1" color="textSecondary">
                  End Date:
                </Typography>
                <Typography variant="body2">{new Date(todo.endDate).toLocaleDateString()}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyItems={"center"} alignItems={"center"} gap={2}>
                <Typography variant="body1" color="textSecondary">
                  Created Date:
                </Typography>
                <Typography variant="body2">{new Date(todo.createdDate).toLocaleDateString()}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyItems={"center"} alignItems={"center"} gap={2}>
                <Typography variant="body1" color="textSecondary">
                  Starred:
                </Typography>
                <Chip label={todo.star ? "Yes" : "No"} color={todo.star ? "warning" : "default"} />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" justifyItems={"center"} alignItems={"center"} gap={2}>
                <Typography variant="body1" color="textSecondary">
                  Active:
                </Typography>
                <Chip label={todo.isActive ? "Active" : "Inactive"} color={todo.isActive ? "success" : "error"} />
              </Stack>
            </Grid>
          </Grid>

          {todo.description && (
            <Box marginTop={2}>
              <Typography variant="body1" color="textSecondary">
                Description:
              </Typography>
              <Box
                sx={{
                  maxHeight: 250,
                  overflowY: "auto",
                  paddingRight: 1,
                }}
              >
                <Typography variant="body2">{todo.description}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default TodoDetailsModal;