import React, { useState, useEffect } from "react";
import { StyledCard, StyledCardContent, TitleBox, DescriptionTypography, StatusPriorityBox, DateBox, FooterBox } from "./todo-card-styled";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Delete, Edit } from "@mui/icons-material";
import { Chip, IconButton, Button, Stack, Box, Typography } from "@mui/material";

export const TodoCard = ({ todo, onEdit, onDelete, onView, onStar }) => {
  const { title, description, status, priority, startDate, endDate, star, isActive } = todo;

  const PriorityChip = ({ priority }) => {
    const colors = ["success", "warning", "error", "error", "error", "error"];
    const labels = ["Low", "Medium", "High", "Urgent", "Critical", "Immediate"];
    return <Chip label={labels[priority]} color={colors[priority]} size="small" />;
  };

  const COLORS = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFE082", "#D1C4E9", "#FFAB91", "#B3E5FC"];
  const getRandomBackgroundColor = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  };

  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    // Generate and set the random background color when the component mounts
    setBackgroundColor(getRandomBackgroundColor());
  }, []);

  const StatusChip = ({ status }) => {
    const statusLabels = ["draft", "todo", "in progress", "done", "bug"];
    return <Chip label={statusLabels[status]} color="primary" size="small" />;
  };

  return (
    <StyledCard onClick={() => onView(todo.id)} color={backgroundColor}>
      <StyledCardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TitleBox>
            <Typography variant="h5" fontWeight="bold">
              {title}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onStar(todo.id);
              }}
            >
              {star ? <StarIcon color="primary" /> : <StarBorderIcon />}
            </IconButton>
          </TitleBox>
          <DescriptionTypography variant="body2" color="text.secondary">
            {description}
          </DescriptionTypography>
          <StatusPriorityBox>
            <Chip label={isActive ? "Active" : "Inactive"} color={isActive ? "success" : "default"} size="small" />
            <Stack direction="row" gap={1}>
              <PriorityChip priority={priority} />
              <StatusChip status={status} />
            </Stack>
          </StatusPriorityBox>
          <DateBox>
            <Typography variant="caption" display="block">
              Start: {new Date(startDate).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" display="block">
              Due: {new Date(endDate).toLocaleDateString()}
            </Typography>
          </DateBox>
        </Box>
        <FooterBox>
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
        </FooterBox>
      </StyledCardContent>
    </StyledCard>
  );
};
