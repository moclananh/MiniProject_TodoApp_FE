import React from "react";
import { Box, Card, CardContent, Typography, Chip, IconButton, Button, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Delete, Edit, Archive } from "@mui/icons-material";

const getRandomBackgroundColor = () => {
  const colors = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFE082", "#D1C4E9", "#FFAB91", "#B3E5FC"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const TodoCard = ({ todo, onEdit, onDelete, onView }) => {
  const { title, description, status, priority, startDate, endDate, star, isActive } = todo;

  const PriorityChip = ({ priority }) => {
    const colors = ["success", "warning", "error", "error", "error", "error"];
    const labels = ["Low", "Medium", "High", "Urgent", "Critical", "Immediate"];
    return <Chip label={labels[priority]} color={colors[priority]} size="small" />;
  };

  const colorRef = React.useRef(getRandomBackgroundColor());

  const StatusChip = ({ status }) => {
    return <Chip label={status} color="primary" size="small" />;
  };

  return (
    <Card
      onClick={() => onView(todo.id)}
      sx={{
        backgroundColor: colorRef.current,
        color: "black",
        borderRadius: 2,
        cursor: "pointer",
        boxShadow: 3,
        overflow: "hidden",
        height: "100%", // Make card fill the height
        display: "flex", // Enable flexbox
        flexDirection: "column", // Stack content vertically
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%", // Take full height
          padding: 2,
          "&:last-child": { paddingBottom: 2 }, // Override MUI's default padding
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Title and Star Icon */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              {title}
            </Typography>
            <IconButton>{star ? <StarIcon color="primary" /> : <StarBorderIcon />}</IconButton>
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>

          {/* Status and Priority */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Chip label={isActive ? "Active" : "Inactive"} color={isActive ? "success" : "default"} size="small" />
            <Stack direction="row" gap={1}>
              <PriorityChip priority={priority} />
              <StatusChip status={status} />
            </Stack>
          </Box>

          {/* Dates */}
          <Box>
            <Typography variant="caption" display="block">
              Start: {new Date(startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" display="block">
              Due: {new Date(endDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Footer: Edit and Delete Buttons */}
        <Box gap={2} display="flex" alignItems="center" mt={2}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(todo.id);
            }}
            size="small"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }}
            size="small"
          >
            Delete
          </Button>
          <IconButton size="small">
            <Archive color="inherit" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
