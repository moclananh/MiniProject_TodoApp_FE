import React, { useState } from "react";
import { Popover, TextField, Select, MenuItem, Button, Checkbox, FormControlLabel, Grid, IconButton, Box, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { todoStatus } from "./forms/TodoForm";

const FilterBox = ({ onFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for Popover
  const [filter, setFilter] = useState({
    title: "",
    priority: null,
    status: 0,
    star: false,
    isActive: true,
    startDate: "",
    endDate: "",
  });

  // Handle opening the Popover
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClearFilter = () => {
    setFilter({
      title: "",
      priority: null,
      status: 0,
      star: false,
      isActive: true,
      startDate: "",
      endDate: "",
    });
    onFilter({});
  };

  // Handle closing the Popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Apply filters
  const handleApplyFilter = () => {
    onFilter(filter); // Pass filter data to the parent
    handleClose(); // Close the filter popover
  };

  return (
    <Box>
      {/* Filter Button */}
      <IconButton onClick={handleOpen} color="primary">
        <FilterListIcon />
      </IconButton>

      {/* Popover Component */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {/* Filter Form */}
        <Box sx={{ padding: "16px", width: "350px" }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Grid container spacing={2}>
            {/* Title Filter */}
            <Grid item xs={12}>
              <TextField fullWidth label="Title" name="title" value={filter.title} onChange={handleChange} />
            </Grid>

            {/* Priority Filter */}
            <Grid item xs={12}>
              <Select fullWidth name="priority" value={filter.priority} onChange={handleChange} displayEmpty>
                <MenuItem value={null}>Select Priority</MenuItem>
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>High</MenuItem>
              </Select>
            </Grid>

            {/* Status Filter */}
            <Grid item xs={12}>
              <Select fullWidth name="status" value={filter.status} onChange={handleChange} displayEmpty>
                {Object.entries(todoStatus).map(([key, value]) => (
                  <MenuItem key={key} value={Number(key)}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Starred Checkbox */}
            <Grid item xs={6}>
              <FormControlLabel control={<Checkbox name="star" checked={filter.star} onChange={handleChange} />} label="Starred" />
            </Grid>

            {/* Is Active Checkbox */}
            <Grid item xs={6}>
              <FormControlLabel control={<Checkbox name="isActive" checked={filter.isActive} onChange={handleChange} />} label="Is Active" />
            </Grid>

            {/* Created Date */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="startDate"
                label="Start Date"
                type="date"
                value={filter.startDate}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="endDate"
                label="End Date"
                type="date"
                value={filter.endDate}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>

            {/* Apply Button */}
            <Grid item xs={12} textAlign="right">
              <Button variant="contained" color="primary" onClick={handleApplyFilter}>
                Apply Filters
              </Button>
              <Button sx={{ marginLeft: "8px" }} variant="contained" color="secondary" onClick={handleClearFilter}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
};

export default FilterBox;
