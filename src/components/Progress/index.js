import React, { memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircularIndeterminate = () => {
  return (
    <Box sx={{ display: "flex", color: "rgb(234,33,25)" }}>
      <CircularProgress />
    </Box>
  );
};
export default memo(CircularIndeterminate);
