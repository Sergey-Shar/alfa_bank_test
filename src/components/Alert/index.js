import React, { memo } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const DescriptionAlerts = ({ textAlert }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Ошибка</AlertTitle>
        Это предупреждение об ошибке — <strong>{textAlert}!</strong>
      </Alert>
    </Stack>
  );
};

export default memo(DescriptionAlerts);
